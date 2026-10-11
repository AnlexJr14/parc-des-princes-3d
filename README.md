# Parc 3D — Le Parc des Princes en 3D

Site de présentation de notre modélisation 3D du Parc des Princes, réalisé dans le cadre de la SAE 402 (BUT MMI, 2e année) par Timéo Da Costa et Axel Treffault.

En ligne : https://parc-des-princes-3d.vercel.app/

## Contenu

- **Exploration** (`/`) : chiffres clés, carte, frise chronologique, prochain match
- **Modèle 3D** (`/modele-3d`) : visionneuse interactive et plan des tribunes
- **L'Histoire** (`/histoire`) : l'article « Anatomie d'un colosse de béton »
- **Créateurs** (`/equipe`) : l'équipe du projet

## Lancer le projet

```bash
npm install
npm run dev
```

`npm run build` génère la version de production dans `dist/`.

## Technologies

React 19, Vite, Tailwind CSS 4, `@google/model-viewer` pour la 3D, Leaflet pour la carte. Les animations sont en CSS (transitions de page via l'API View Transitions).

## Organisation

- `src/pages/` : une page par vue
- `src/components/` : sections et éléments d'interface (`Logo.jsx` contient le logo)
- `src/data.jsx` : tous les textes et données du site
- `src/index.css` : couleurs, typographies et animations
- `public/parc-des-princes.glb` et `public/street-view-paris.hdr` : versions allégées servies par le site
- `modele-source/outils/` : les scripts qui fabriquent ces deux fichiers
- `modele-source/street-view-paris.original.hdr` : ciel HDR d'origine en pleine résolution, gardé en archive, non déployé

## Régénérer le modèle 3D

Le modèle du site est fabriqué à partir du fichier Blender (`parc-des-princes.blend`, hors dépôt), qui n'est jamais modifié. Il faut Blender et Node.

```bash
cd modele-source/outils
npm install
node generer-beton.mjs .
blender -b chemin/vers/parc-des-princes.blend --python exporter-web.py -- . export.glb
node alleger-modele.mjs export.glb ../../public/parc-des-princes.glb
```

- `generer-beton.mjs` crée les textures du béton. Le matériau `betonparc` est procédural dans Blender et le format glTF ne sait pas l'exporter : sans cette étape, tout le béton sort en blanc uni.
- `exporter-web.py` plaque ces textures, fusionne les faces coplanaires des pièces en béton, puis exporte en GLB.
- `alleger-modele.mjs` compresse la géométrie (Draco) et convertit les textures en WebP.

Le ciel se réduit à part : `node reduire-hdr.mjs ../street-view-paris.original.hdr ../../public/street-view-paris.hdr`.
