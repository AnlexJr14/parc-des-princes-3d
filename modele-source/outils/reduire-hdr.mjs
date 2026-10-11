// Réduit de moitié une image Radiance .hdr (RGBE, RLE) : node hdr-half.mjs entrée.hdr sortie.hdr
import fs from 'node:fs';

const [input, output] = process.argv.slice(2);
const buf = fs.readFileSync(input);

// En-tête : lignes de texte jusqu'à la ligne vide, puis la ligne de résolution
let pos = buf.indexOf('\n\n') + 2;
const header = buf.subarray(0, pos).toString('latin1');
const endRes = buf.indexOf('\n', pos);
const res = buf.subarray(pos, endRes).toString('latin1').trim();
const m = res.match(/^-Y (\d+) \+X (\d+)$/);
if (!header.startsWith('#?RADIANCE') || !m) throw new Error('Format non géré : ' + res);
const H = +m[1], W = +m[2];
pos = endRes + 1;

// Décodage des lignes compressées vers du RGB linéaire flottant
const rgb = new Float32Array(W * H * 3);
const line = new Uint8Array(W * 4);
for (let y = 0; y < H; y++) {
    if (buf[pos] !== 2 || buf[pos + 1] !== 2 || ((buf[pos + 2] << 8) | buf[pos + 3]) !== W) throw new Error('Ligne non RLE à y=' + y);
    pos += 4;
    for (let c = 0; c < 4; c++) {
        let x = 0;
        while (x < W) {
            let n = buf[pos++];
            if (n > 128) { n -= 128; const v = buf[pos++]; while (n--) line[(x++) * 4 + c] = v; }
            else { while (n--) line[(x++) * 4 + c] = buf[pos++]; }
        }
    }
    for (let x = 0; x < W; x++) {
        const e = line[x * 4 + 3];
        const f = e ? Math.pow(2, e - 136) : 0;
        const o = (y * W + x) * 3;
        rgb[o] = line[x * 4] * f; rgb[o + 1] = line[x * 4 + 1] * f; rgb[o + 2] = line[x * 4 + 2] * f;
    }
}

// Moyenne 2 × 2 en linéaire, puis ré-encodage RGBE + RLE
const w = W >> 1, h = H >> 1;
const out = [Buffer.from(header + `-Y ${h} +X ${w}\n`, 'latin1')];
const enc = new Uint8Array(w * 4);
for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        const px = [0, 0, 0];
        for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
            const o = ((y * 2 + dy) * W + x * 2 + dx) * 3;
            px[0] += rgb[o] / 4; px[1] += rgb[o + 1] / 4; px[2] += rgb[o + 2] / 4;
        }
        const max = Math.max(...px);
        if (max < 1e-32) { enc.fill(0, x * 4, x * 4 + 4); continue; }
        let e = Math.ceil(Math.log2(max));
        if (max / Math.pow(2, e) * 256 >= 256) e++;
        const s = 256 / Math.pow(2, e);
        enc[x * 4] = Math.min(255, px[0] * s); enc[x * 4 + 1] = Math.min(255, px[1] * s); enc[x * 4 + 2] = Math.min(255, px[2] * s); enc[x * 4 + 3] = e + 128;
    }
    const bytes = [2, 2, w >> 8, w & 255];
    for (let c = 0; c < 4; c++) {
        let x = 0;
        while (x < w) {
            let run = 1;
            while (x + run < w && run < 127 && enc[(x + run) * 4 + c] === enc[x * 4 + c]) run++;
            if (run >= 3) { bytes.push(128 + run, enc[x * 4 + c]); x += run; continue; }
            // Suite de valeurs différentes, jusqu'à la prochaine répétition d'au moins 3
            const start = x; let len = 0;
            while (x < w && len < 128) {
                if (x + 2 < w && enc[x * 4 + c] === enc[(x + 1) * 4 + c] && enc[x * 4 + c] === enc[(x + 2) * 4 + c]) break;
                x++; len++;
            }
            bytes.push(len);
            for (let i = start; i < start + len; i++) bytes.push(enc[i * 4 + c]);
        }
    }
    out.push(Buffer.from(bytes));
}
fs.writeFileSync(output, Buffer.concat(out));
console.log(`${W}x${H} → ${w}x${h}, ${(buf.length / 1e6).toFixed(1)} Mo → ${(Buffer.concat(out).length / 1e6).toFixed(1)} Mo`);
