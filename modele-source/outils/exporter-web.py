# Export web du Parc des Princes depuis le fichier Blender, sans jamais l'enregistrer :
#   blender -b parc-des-princes.blend --python exporter-web.py -- <dossier textures béton> <sortie.glb>
#
# 1. fusionne les faces coplanaires des pièces en béton (moins de triangles, même forme)
# 2. remplace le béton procédural « betonparc », que le glTF ne sait pas exporter,
#    par des textures raccordables plaquées par projection cubique
import bpy, bmesh, math, sys

textures, sortie = sys.argv[sys.argv.index('--') + 1:][:2]

BETON = 'betonparc'
PIECES_BETON = ['Pillier', 'Murehaut_stade', 'Toit_stade', 'Murbas_stade']
ANGLE_FUSION = math.radians(2)    # deux faces sont jugées coplanaires en dessous de cet angle
ANGLE_ARETE = math.radians(30)    # au-delà, l'arête reste vive
CARREAU = 2.0                     # taille d'une répétition de la texture, en unités de la scène


def triangles(bm):
    return sum(len(f.verts) - 2 for f in bm.faces)


def projection_cubique(bm, ob, indice_materiau=None):
    uv = bm.loops.layers.uv.verify()
    monde = ob.matrix_world
    normales = monde.to_3x3().inverted().transposed()
    for face in bm.faces:
        if indice_materiau is not None and face.material_index != indice_materiau:
            continue
        n = normales @ face.normal
        axe = max(range(3), key=lambda i: abs(n[i]))
        for loop in face.loops:
            p = monde @ loop.vert.co
            u, v = ((p.y, p.z), (p.x, p.z), (p.x, p.y))[axe]
            loop[uv].uv = (u / CARREAU, v / CARREAU)


# --- Matériau béton : textures à la place des nœuds procéduraux
mat = bpy.data.materials[BETON]
arbre = mat.node_tree
arbre.nodes.clear()
sortie_mat = arbre.nodes.new('ShaderNodeOutputMaterial')
bsdf = arbre.nodes.new('ShaderNodeBsdfPrincipled')
couleur = arbre.nodes.new('ShaderNodeTexImage')
couleur.image = bpy.data.images.load(textures + '/beton_couleur.png')
relief = arbre.nodes.new('ShaderNodeTexImage')
relief.image = bpy.data.images.load(textures + '/beton_normales.png')
relief.image.colorspace_settings.name = 'Non-Color'
carte = arbre.nodes.new('ShaderNodeNormalMap')
carte.inputs['Strength'].default_value = 0.35
bsdf.inputs['Roughness'].default_value = 0.9
bsdf.inputs['Metallic'].default_value = 0.0
arbre.links.new(couleur.outputs['Color'], bsdf.inputs['Base Color'])
arbre.links.new(relief.outputs['Color'], carte.inputs['Color'])
arbre.links.new(carte.outputs['Normal'], bsdf.inputs['Normal'])
arbre.links.new(bsdf.outputs['BSDF'], sortie_mat.inputs['Surface'])

# --- Pièces entièrement en béton : fusion des faces planes, arêtes vives, UV
for nom in PIECES_BETON:
    ob = bpy.data.objects[nom]
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    avant = triangles(bm)
    bmesh.ops.dissolve_limit(bm, angle_limit=ANGLE_FUSION, verts=bm.verts, edges=bm.edges, delimit={'MATERIAL'})
    for face in bm.faces:
        face.smooth = True
    for arete in bm.edges:
        arete.smooth = len(arete.link_faces) == 2 and arete.calc_face_angle(0.0) < ANGLE_ARETE
    projection_cubique(bm, ob)
    print(f'>> {nom}: {avant} -> {triangles(bm)} triangles', flush=True)
    bm.to_mesh(ob.data)
    bm.free()

# --- Tribunes : seules les faces en béton reçoivent les nouveaux UV
for ob in bpy.data.objects:
    if ob.type != 'MESH' or ob.name in PIECES_BETON:
        continue
    indices = [i for i, slot in enumerate(ob.material_slots) if slot.material == mat]
    if not indices:
        continue
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    for indice in indices:
        projection_cubique(bm, ob, indice)
    bm.to_mesh(ob.data)
    bm.free()
    print(f'>> {ob.name}: UV béton', flush=True)

bpy.ops.export_scene.gltf(
    filepath=sortie,
    export_format='GLB',
    export_yup=True,
    export_apply=False,
    export_animations=False,
    export_cameras=False,
    export_lights=False,
)
print('>> exporté', sortie, flush=True)
