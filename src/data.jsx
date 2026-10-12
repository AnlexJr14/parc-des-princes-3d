export const articleData = {
    title: "ANATOMIE D'UN COLOSSE DE BÉTON",
    subtitle: "LE PARC DES PRINCES - 1972",
    authors: "Par Axel Treffault et Timéo Da Costa",
    date: "Publié en 2026 •  1 min de lecture",
    content: [
        "Le Parc des Princes, qui a été inauguré dans sa configuration actuelle en 1972, se trouve au sud-ouest de Paris et est le fruit du travail de l'architecte français Roger Taillibert. Cet édifice sportif s'intègre parfaitement dans le courant architectural du brutalisme. Le béton exposé est le principal matériau utilisé lors de sa fabrication, ce qui le distingue esthétiquement des autres constructions. Contrairement à la plupart des architectes qui souhaitent dissimuler le béton brut, Roger Taillibert a voulu garder ce matériau sur toute la structure de l’édifice afin de mettre en évidence la robustesse et la rigueur de la construction dès le premier regard.",
        "La prouesse de ce bâtiment se trouve surtout dans sa modélisation technique détaillée. La structure du stade est constituée de 50 piliers en béton répétés et agencés en un grand anneau elliptique, formant ainsi son ossature. Chaque pilier fonctionne comme une vertèbre autonome : il maintient les gradins tout en déployant un remarquable porte-à-faux de 48 mètres. Cette structure géométrique permet à la toiture de s’avancer au-dessus des spectateurs sans l'intervention de colonnes intermédiaires, ce qui libère intégralement le champ de vision des spectateurs. Le processus de production a nécessité une industrialisation stricte. Les composantes structurelles, connues sous le nom de voussoirs, ont été fabriquées en usine afin d'assurer la qualité du béton. Sur le site de construction, leur montage a été effectué en utilisant la méthode du béton précontraint. Ces blocs sont traversés par des câbles en acier et sont mis en place.",
        "Alors que cette structure en béton demeure ineffaçable, son audience, quant à elle, est en constante évolution. Le stade fonctionne comme un véritable baromètre social: sa structure rigide est en forte opposition avec les tensions qu'il renferme. Du conflit identitaire des anciennes tribunes à la gentrification contemporaine, le Parc dévoile les fissures majeures de la société française."
    ],
    hotspots: [
        { id: 1, title: "Roger Taillibert", text: "L'architecte a choisi le brutalisme pour montrer la rigueur du béton." },
        { id: 2, title: "Piliers en béton", text: "50 piliers en anneau formant l'ossature du stade." },
    ]
};

export const creatorsData = [
    {
        id: "timeo",
        name: "Timéo Da Costa",
        role: "Modélisation 3D & Développement du site web",
        bio: "Étudiant en 2ème année de BUT MMI, j'ai co-réalisé le projet 'Parc 3D Experience' en parfaite synergie. De la recherche architecturale à la modélisation 3D du Parc des Princes sur Blender, en passant par le développement de l'interface interactive avec React et Tailwind CSS, nous avons tout pensé et conçu ensemble pour rendre hommage à l'œuvre de Roger Taillibert, le plus beau stade du monde.",
        details: {
            "Rôle Projet": "Développement & Modélisation 3D",
            "Formation": "2ème année BUT MMI",
            "Outils": "Blender, Photoshop, React, Tailwind, Vite, GitHub"
        },
        socials: [
            { icon: "linkedin", url: "https://www.linkedin.com/in/tim%C3%A9o-da-costa-078b15237/" },
            { icon: "globe", url: "https://timeo-dacosta.vercel.app/" },
            { icon: "envelope", url: "mailto:dacostatimeo@gmail.com" }
        ],
        image: "/proT.png",
    },
    {
        id: "axel",
        name: "Axel Treffault",
        role: "Modélisation 3D & Développement du site web",
        bio: "Étudiant en 2ème année de BUT MMI, j'ai co-réalisé le projet 'Parc 3D Experience' en parfaite synergie. De la recherche architecturale à la modélisation 3D du Parc des Princes sur Blender, en passant par le développement de l'interface interactive avec React et Tailwind CSS, nous avons tout pensé et conçu ensemble pour rendre hommage à l'œuvre de Roger Taillibert, le plus beau stade du monde.",
        details: {
            "Rôle Projet": "Développement & Modélisation 3D",
            "Formation": "2ème année BUT MMI",
            "Outils": "Blender, Photoshop, React, Tailwind, Vite, GitHub"
        },
        socials: [
            { icon: "linkedin", url: "https://www.linkedin.com/in/axel-treffault-389729300/" },
            { icon: "globe", url: "https://treffaultaxel.vercel.app/" },
            { icon: "envelope", url: "mailto:axel.treffault@gmail.com" }
        ],
        image: "/proA.webp",
    }
];

export const figuresData = [
    { value: 47929, label: "Places assises", detail: "Une capacité mythique" },
    { value: 1972, label: "Inauguration", detail: "L'ère Taillibert", plain: true },
    { value: 50, label: "Portiques de béton", detail: "Une structure unique au monde", accent: true },
    { value: 3, label: "Finales de C1 accueillies", detail: "Le sommet du football européen" },
];

export const tickerData = [
    "Ici c'est Paris",
    "50 portiques",
    "Béton précontraint",
    "Roger Taillibert",
    "1972",
    "Brutalisme",
    "47 929 places",
    "Porte-à-faux de 48 mètres",
];

export const timelineData = [
    {
        year: "1897",
        title: "Le Stade-Vélodrome",
        desc: "Inauguration du premier Parc des Princes. Il se distingue par sa piste en ciment rose de 333 mètres et devient un haut lieu du cyclisme."
    },
    {
        year: "1932",
        title: "La Première Rénovation",
        desc: "L'enceinte est repensée pour accueillir 40 000 places. Elle s'ouvre massivement au football et au rugby, devenant le temple du sport français."
    },
    {
        year: "1972",
        title: "L'Œuvre de Taillibert",
        desc: "Inauguration de l'arène que l'on connaît aujourd'hui. Un chef-d'œuvre de l'architecture brutaliste porté par ses 50 portiques en béton."
    },
    {
        year: "1974",
        title: "La Maison du PSG",
        desc: "Le Paris Saint-Germain s'y installe définitivement. Le stade devient le théâtre des plus grandes nuits européennes du club de la capitale."
    }
];

export const tribunesData = [
    {
        id: "auteuil",
        name: "Virage Auteuil",
        color: "#004170",
        desc: "Historiquement le cœur bouillant des supporters parisiens, situé au Nord. Il est réputé pour ses tifos spectaculaires et son ambiance électrique."
    },
    {
        id: "paris",
        name: "Tribune Paris",
        color: "#ceab5d",
        desc: "La grande tribune latérale qui fait face aux caméras de télévision. Elle offre une vue panoramique et rassemble un public familial."
    },
    {
        id: "borelli",
        name: "Tribune Borelli",
        color: "#ceab5d",
        desc: "L'ex-tribune Présidentielle. Elle abrite les loges VIP, les bancs de touche, le tunnel des joueurs et la corbeille présidentielle."
    },
    {
        id: "boulogne",
        name: "Kop of Boulogne",
        color: "#DA291C",
        desc: "Le berceau historique du supportérisme au Parc. Situé au Sud, il fait face à Auteuil pour créer des chants en écho mythiques."
    }
];

const PSG = { name: "Paris SG", logo: "https://media.api-sports.io/football/teams/85.png" };
const match = (date, name, logo) => ({ date, league: { name: "Ligue 1" }, teams: { home: PSG, away: { name, logo } } });

export const scheduleData = [
    match("2026-08-23T20:45:00", "Stade Rennais", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/guI8eg4hoTyIp6rO1opjxA_500x500.png"),
    match("2026-09-04T20:45:00", "AS Monaco", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/RX0XTi5Dtg4joMtuHNmYKg_500x500.png"),
    match("2026-10-10T21:00:00", "Le Mans FC", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/d_680kHAdTDWexQw3BemxQ_500x500.png"),
    match("2026-10-25T20:45:00", "Olympique Lyonnais", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/SrKK55dUkCxe4mJsyshfCg_500x500.png"),
    match("2026-11-07T21:00:00", "ES Troyes AC", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/BUjNnbc4kDTOc5I0IzOQog_500x500.png"),
    match("2026-11-28T21:00:00", "FC Lorient", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/bbYkAWWtD6lpK5KyGfr1vA_500x500.png"),
    match("2026-12-12T21:00:00", "Paris FC", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/6L0HPrdS4FdFbafBX80QuQ_500x500.png"),
    match("2027-01-23T21:00:00", "AJ Auxerre", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/jX0oM3wnm6cWOGKoUR3AyA_500x500.png"),
    match("2027-02-07T20:45:00", "OM", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/GeXt6l3ILU4QLsR-QGBZyg_500x500.png"),
    match("2027-02-20T21:00:00", "Stade Brestois", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/HNqZwlu71GHXo60XjYrPxg_500x500.png"),
    match("2027-02-28T20:45:00", "RC Lens", "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/TUvwItKazVFpgThEhhlN1Q_500x500.png"),
    match("2027-03-20T12:00:00", "RC Strasbourg", "https://media.api-sports.io/football/teams/116.png"),
    match("2027-04-10T12:00:00", "Le Havre AC", "https://media.api-sports.io/football/teams/93.png"),
    match("2027-04-17T12:00:00", "LOSC", "https://media.api-sports.io/football/teams/75.png"),
    match("2027-05-01T12:00:00", "Angers SCO", "https://media.api-sports.io/football/teams/77.png"),
    match("2027-05-16T12:00:00", "OGC Nice", "https://media.api-sports.io/football/teams/84.png"),
    match("2027-05-29T12:00:00", "Toulouse FC", "https://media.api-sports.io/football/teams/96.png"),
];
