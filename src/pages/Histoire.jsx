import { useRef } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import NextStep from '../components/NextStep';
import Link from '../router/Link';
import { ROUTES } from '../router/context';
import useScrollFrame from '../hooks/useScrollFrame';
import { articleData as data, creatorsData } from '../data';

// Repères chiffrés tirés du texte, affichés en marge
const reperes = [
    ['1972', 'Inauguration'],
    ['50', 'Piliers en béton'],
    ['48 m', 'Porte-à-faux'],
];

const auteurs = ['timeo', 'axel'].map((id) => creatorsData.find((creator) => creator.id === id));

export default function Histoire() {
    const progressRef = useRef(null);
    const photoRef = useRef(null);

    useScrollFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        if (progressRef.current && max > 0) {
            progressRef.current.style.transform = `scaleX(${Math.min(doc.scrollTop / max, 1)})`;
        }

        // Parallaxe : 0 quand la photo entre par le bas de la fenêtre, 1 quand elle sort par le haut
        if (photoRef.current) {
            const rect = photoRef.current.getBoundingClientRect();
            const p = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            photoRef.current.style.setProperty('--p', Math.min(Math.max(p, 0), 1));
        }
    });

    return (
        <article>
            <div
                ref={progressRef}
                className="fixed top-(--nav-h) left-0 z-40 h-1 w-full origin-left scale-x-0 bg-linear-to-r from-rouge to-or"
                aria-hidden="true"
            ></div>

            <PageHeader
                eyebrow={data.subtitle}
                title={data.title}
                back={
                    <Link to={ROUTES.home} className="t-label text-white/60 transition-colors duration-300 hover:text-white">
                        ← Retour au plan
                    </Link>
                }
            >
                <div className="t-label flex flex-col gap-x-10 gap-y-4 border-t border-white/15 pt-6 text-white/55 md:flex-row md:items-center md:justify-between">
                    <p>
                        Écrit par{' '}
                        <Link to={ROUTES.equipe} hash="timeo" className="lien text-white hover:text-or">Timéo Da Costa</Link>
                        {' '}&{' '}
                        <Link to={ROUTES.equipe} hash="axel" className="lien text-white hover:text-or">Axel Treffault</Link>
                    </p>
                    <p>
                        Édition Spéciale —{' '}
                        <span className="text-white">
                            {data.date.split(' • ')[0]} •{' '}
                            <span className="whitespace-nowrap">{data.date.split(' • ')[1]}</span>
                        </span>
                    </p>
                </div>
            </PageHeader>

            <div className="beton">
                <div className="wrap grid grid-cols-1 gap-x-12 gap-y-12 py-16 md:py-24 lg:grid-cols-12">

                    <aside className="lg:col-span-3" aria-label="Repères">
                        <ul className="grid grid-cols-3 gap-6 border-t border-bleu/20 pt-6 lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:grid-cols-1 lg:gap-0 lg:pt-0">
                            {reperes.map(([chiffre, legende], i) => (
                                <Reveal as="li" key={legende} delay={i * 120} className="lg:border-b lg:border-bleu/20 lg:py-6">
                                    <p className="t-display text-5xl text-bleu md:text-6xl">{chiffre}</p>
                                    <p className="t-label mt-2 text-[0.625rem] text-encre/60">{legende}</p>
                                </Reveal>
                            ))}
                        </ul>
                    </aside>

                    <div className="lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-5">
                        <Reveal as="p" className="lettrine font-serif text-2xl leading-normal text-bleu md:text-[1.75rem]">
                            {data.content[0]}
                        </Reveal>

                        <figure className="my-14 md:my-20">
                            <Reveal variant="volet" className="overflow-hidden border-b-4 border-or">
                                <img src="/photo1.jpg" alt="Parc des Princes" className="h-auto w-full" />
                            </Reveal>
                            <figcaption className="t-label mt-4 flex items-center gap-4 text-[0.625rem] text-encre/55">
                                Le Parc des Princes, Paris XVIe
                            </figcaption>
                        </figure>

                        <Reveal as="p" className="font-serif text-xl leading-[1.75] text-encre/85 md:text-[1.375rem]">
                            {data.content[1]}
                        </Reveal>
                    </div>
                </div>
            </div>

            <figure ref={photoRef} className="parallaxe relative h-[60vh] overflow-hidden bg-nuit md:h-[85vh]">
                <img src="/photo2.jpg" alt="Tribunes du Parc" loading="lazy" className="absolute inset-x-0 top-0 h-[124%] w-full object-cover" />
                <figcaption className="t-label absolute bottom-0 left-0 bg-nuit px-5 py-3 text-[0.625rem] text-white/70">
                    Les tribunes du Parc un soir de match
                </figcaption>
            </figure>

            <section className="relative isolate overflow-hidden bg-bleu py-24 md:py-36">
                <div className="calque absolute inset-0 -z-10"></div>
                <div className="wrap text-center">
                    <Reveal as="p" className="mx-auto max-w-4xl font-serif text-3xl leading-normal text-or italic md:text-[2.5rem]">
                        {data.content[2]}
                    </Reveal>
                    <Reveal variant="trait" delay={300} className="mx-auto mt-12 h-1.5 w-24 origin-center! bg-rouge shadow-[0_0_15px_rgba(218,41,28,0.5)]"></Reveal>
                </div>
            </section>

            <section className="beton" aria-label="Les auteurs">
                <div className="wrap py-16 md:py-24">
                    <Reveal as="p" className="t-label mb-8 flex items-center gap-4 text-rouge">
                        {data.authors}
                    </Reveal>
                    <div className="grid grid-cols-1 border-t border-bleu/20 md:grid-cols-2">
                        {auteurs.map((auteur, i) => (
                            <Reveal key={auteur.id} delay={i * 120} className="border-b border-bleu/20 md:odd:border-r">
                                <Link to={ROUTES.equipe} hash={auteur.id} className={`group flex items-center gap-6 py-7 md:px-8 ${i === 0 ? 'md:pl-0' : ''}`}>
                                    <img
                                        src={auteur.image}
                                        alt=""
                                        loading="lazy"
                                        className="h-20 w-20 shrink-0 object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0 md:h-24 md:w-24"
                                    />
                                    <span className="grow">
                                        <span className="t-display block text-4xl text-bleu transition-colors duration-300 group-hover:text-rouge md:text-5xl">{auteur.name}</span>
                                        <span className="t-label mt-2 block text-[0.625rem] leading-relaxed text-encre/60">{auteur.details["Formation"]}</span>
                                    </span>
                                    <span className="text-2xl text-bleu transition-transform duration-500 ease-expo group-hover:translate-x-2 group-hover:text-rouge" aria-hidden="true">→</span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <NextStep to={ROUTES.modele} label="À suivre — Modèle 3D" title="Explorer l'architecture" />
        </article>
    );
}
