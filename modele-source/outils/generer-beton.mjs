// Génère les textures raccordables du béton : node generer-beton.mjs <dossier de sortie>
// Reprend le matériau procédural « betonparc » de Blender (bruit fBm → rampe de gris),
// que l'export glTF ne sait pas traduire.
import sharp from 'sharp';
import path from 'node:path';

const SIZE = 1024;
const out = process.argv[2] ?? '.';

// Bruit de Perlin 2D périodique : la texture se répète sans couture
const hash = (x, y, seed) => {
    let h = (x * 374761393 + y * 668265263 + seed * 1442695041) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const perlin = (x, y, px, py, seed) => {
    const x0 = Math.floor(x), y0 = Math.floor(y);
    const fx = x - x0, fy = y - y0;
    const g = (ix, iy) => {
        const a = hash(((ix % px) + px) % px, ((iy % py) + py) % py, seed) * Math.PI * 2;
        return Math.cos(a) * (x - ix) + Math.sin(a) * (y - iy);
    };
    const u = fade(fx), v = fade(fy);
    const top = g(x0, y0) + u * (g(x0 + 1, y0) - g(x0, y0));
    const bottom = g(x0, y0 + 1) + u * (g(x0 + 1, y0 + 1) - g(x0, y0 + 1));
    return top + v * (bottom - top);
};
const fbm = (u, v, fx, fy, octaves, gain, seed) => {
    let sum = 0, amp = 1;
    for (let o = 0; o < octaves; o++) {
        sum += amp * perlin(u * fx, v * fy, fx, fy, seed + o);
        amp *= gain; fx *= 2; fy *= 2;
    }
    return sum;
};
const field = (fx, fy, octaves, gain, seed) => {
    const data = new Float32Array(SIZE * SIZE);
    let mean = 0;
    for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) mean += (data[y * SIZE + x] = fbm(x / SIZE, y / SIZE, fx, fy, octaves, gain, seed));
    mean /= data.length;
    let variance = 0;
    for (const v of data) variance += (v - mean) ** 2;
    const std = Math.sqrt(variance / data.length);
    return data.map((v) => (v - mean) / std);
};
const toSRGB = (c) => Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055));

// Couleur : taches étirées à l'horizontale, comme les strates du coffrage
const tache = field(3, 9, 9, 0.72, 7);
const GRIS_A = [0.323, 0.323, 0.323], GRIS_B = [0.651, 0.651, 0.597];
const OMBRE = 0.844; // part non occultée du nœud Ambient Occlusion de Blender
const couleur = Buffer.alloc(SIZE * SIZE * 3);
for (let i = 0; i < SIZE * SIZE; i++) {
    // Variation plus douce que dans Blender : à l'écran, le plein contraste paraît marbré
    const valeur = 0.5 + 0.055 * tache[i];
    const t = Math.min(Math.max((valeur - 0.377) / (0.695 - 0.377), 0), 1);
    for (let c = 0; c < 3; c++) couleur[i * 3 + c] = toSRGB((GRIS_A[c] + t * (GRIS_B[c] - GRIS_A[c])) * OMBRE);
}
await sharp(couleur, { raw: { width: SIZE, height: SIZE, channels: 3 } }).png().toFile(path.join(out, 'beton_couleur.png'));

// Relief : grain fin, converti en carte de normales
const grain = field(24, 24, 5, 0.65, 91);
const FORCE = 1.6;
const normales = Buffer.alloc(SIZE * SIZE * 3);
const at = (x, y) => grain[((y + SIZE) % SIZE) * SIZE + ((x + SIZE) % SIZE)];
for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const dx = (at(x + 1, y) - at(x - 1, y)) * FORCE, dy = (at(x, y + 1) - at(x, y - 1)) * FORCE;
    const len = Math.hypot(dx, dy, 1), i = (y * SIZE + x) * 3;
    normales[i] = Math.round(127.5 * (1 - dx / len)); normales[i + 1] = Math.round(127.5 * (1 + dy / len)); normales[i + 2] = Math.round(127.5 * (1 + 1 / len));
}
await sharp(normales, { raw: { width: SIZE, height: SIZE, channels: 3 } }).png().toFile(path.join(out, 'beton_normales.png'));
console.log('textures béton écrites dans', out);
