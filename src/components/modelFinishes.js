export const finishes = [
    { id: 'realiste', label: 'Réaliste' },
    { id: 'maquette', label: 'Maquette' },
];

const BLANC = [0.5, 0.5, 0.49, 1];
const NOIR = [0, 0, 0];

const textureSlots = (material) => [
    material.pbrMetallicRoughness.baseColorTexture,
    material.pbrMetallicRoughness.metallicRoughnessTexture,
    material.normalTexture,
    material.occlusionTexture,
    material.emissiveTexture,
];

export function snapshotMaterials(viewer) {
    return viewer.model.materials.map((material) => ({
        material,
        baseColor: [...material.pbrMetallicRoughness.baseColorFactor],
        metallic: material.pbrMetallicRoughness.metallicFactor,
        roughness: material.pbrMetallicRoughness.roughnessFactor,
        emissive: [...material.emissiveFactor],
        alphaMode: material.getAlphaMode(),
        textures: textureSlots(material).map((slot) => slot.texture),
    }));
}

export function applyFinish(originals, finish) {
    const maquette = finish === 'maquette';

    for (const original of originals) {
        const { material } = original;
        const pbr = material.pbrMetallicRoughness;

        textureSlots(material).forEach((slot, i) => slot.setTexture(maquette ? null : original.textures[i]));
        pbr.setBaseColorFactor(maquette ? BLANC : original.baseColor);
        pbr.setMetallicFactor(maquette ? 0 : original.metallic);
        pbr.setRoughnessFactor(maquette ? 1 : original.roughness);
        material.setEmissiveFactor(maquette ? NOIR : original.emissive);
        material.setAlphaMode(maquette ? 'OPAQUE' : original.alphaMode);
    }
}
