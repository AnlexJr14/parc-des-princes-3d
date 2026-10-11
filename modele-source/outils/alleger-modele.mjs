// Allège l'export Blender pour le web : node alleger-modele.mjs <entrée.glb> <sortie.glb>
// - géométrie : sommets soudés puis compression Draco (la forme ne change pas)
// - textures converties en WebP ; seules les textures de matière (route, tissu, métal…)
//   sont réduites, les visuels lisibles de près (banderole, pelouse, logo) gardent leur définition
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, weld, prune, draco } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import sharp from 'sharp';

// Textures de matière : leur nom dans Blender commence par l'un de ces préfixes
const MATIERES = /^(plastic07|Fabric001|Metal01|Patched road|Concrete_seamles)/;
const TAILLE_MATIERE = 1024;
// La banderole du toit fait 54 140 px de large : aucune carte graphique ne l'accepte telle quelle
const BANDEROLE = /^PSG_BANNER_PARC/;
const TAILLE_BANDEROLE = [8192, 256];

const [input, output] = process.argv.slice(2);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
});
const doc = await io.read(input);
const root = doc.getRoot();
const triangles = () => root.listMeshes().reduce((s, m) => s + m.listPrimitives().reduce((t, p) => t + (p.getIndices()?.getCount() ?? p.getAttribute('POSITION').getCount()) / 3, 0), 0);
const poidsTextures = () => root.listTextures().reduce((s, t) => s + t.getImage().byteLength, 0);
const avant = poidsTextures();

for (const texture of root.listTextures()) {
    const nom = texture.getName();
    const [w, h] = texture.getSize();
    let image = sharp(texture.getImage(), { limitInputPixels: false });
    if (BANDEROLE.test(nom)) image = image.resize(...TAILLE_BANDEROLE, { fit: 'fill' });
    else if (MATIERES.test(nom) && Math.max(w, h) > TAILLE_MATIERE) image = image.resize(TAILLE_MATIERE, TAILLE_MATIERE, { fit: 'inside' });
    const estNormale = texture.listParents().some((p) => p.propertyType === 'Material' && p.getNormalTexture() === texture);
    texture.setImage(await image.webp({ quality: estNormale ? 92 : 88 }).toBuffer()).setMimeType('image/webp');
}

await doc.transform(dedup(), weld(), prune(), draco());
await io.write(output, doc);
console.log(`${triangles()} triangles | textures ${(avant / 1e6).toFixed(1)} Mo → ${(poidsTextures() / 1e6).toFixed(1)} Mo`);
