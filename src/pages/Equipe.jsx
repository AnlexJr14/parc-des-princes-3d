import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import NextStep from '../components/NextStep';
import Link from '../router/Link';
import { ROUTES } from '../router/context';
import { creatorsData as data } from '../data';

const getIcon = (type) => {
    if (type === 'linkedin') return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
    if (type === 'globe') return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>;
    if (type === 'envelope') return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
};

const splitName = (name) => {
    const [first, ...rest] = name.split(' ');
    return [first, rest.join(' ')];
};

const socialLabels = { linkedin: 'LinkedIn', globe: 'Portfolio', envelope: 'E-mail' };

export default function Equipe() {
    return (
        <>
            <PageHeader
                eyebrow="L'équipe du projet"
                title={['Qui sommes', '-nous ?']}
                back={
                    <Link to={ROUTES.histoire} className="t-label text-white/60 transition-colors duration-300 hover:text-white">
                        ← Retour à l'article
                    </Link>
                }
            >
                <p className="max-w-3xl font-serif text-xl leading-relaxed text-white/75 italic md:text-2xl">
                    Derrière ce projet de modélisation se cachent deux étudiants en 2ème année de BUT MMI. Alliant compétences techniques, design 3D et développement web, nous avons uni nos forces pour recréer virtuellement le Parc des Princes.
                </p>
            </PageHeader>

            <div className="beton">
                <div className="wrap space-y-24 py-20 md:space-y-36 md:py-32">
                    {data.map((creator, index) => (
                        <section
                            key={creator.id}
                            id={creator.id}
                            className="group grid scroll-mt-28 grid-cols-1 items-start gap-x-16 gap-y-12 lg:grid-cols-12"
                        >
                            <div className={`relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none ${index % 2 ? 'lg:order-2' : ''}`}>
                                <span className="absolute inset-0 border border-or" style={{ translate: index % 2 ? '-1rem 1rem' : '1rem 1rem' }}></span>
                                <Reveal variant="volet" className="relative aspect-4/5 overflow-hidden bg-bleu">
                                    <img
                                        src={creator.image}
                                        alt={creator.name}
                                        className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-1000 group-hover:grayscale-0"
                                    />
                                </Reveal>
                            </div>

                            <div className="lg:col-span-7 lg:pt-6">
                                <Reveal as="p" className="t-label mb-5 flex items-center gap-4 text-rouge">
                                    <span className="h-px w-12 shrink-0 bg-rouge"></span>
                                    {creator.role}
                                </Reveal>
                                <Reveal as="h2" variant="" className="t-display text-[clamp(3.75rem,9vw,8.5rem)] text-bleu">
                                    {splitName(creator.name).map((part, i) => (
                                        <span key={part} className="masque" style={{ '--d': `${i * 100}ms` }}><span>{part}</span></span>
                                    ))}
                                </Reveal>

                                <Reveal as="p" delay={150} className="mt-9 max-w-2xl font-serif text-xl leading-[1.7] text-encre/80">
                                    {creator.bio}
                                </Reveal>

                                <Reveal as="dl" delay={250} className="mt-10 grid grid-cols-1 border-t border-bleu/20 sm:grid-cols-2">
                                    {Object.entries(creator.details).map(([key, value]) => (
                                        <div key={key} className="border-b border-bleu/20 py-5 sm:pr-8 sm:last:col-span-2">
                                            <dt className="t-label mb-2 text-[0.625rem] text-bleu">{key}</dt>
                                            <dd className="text-encre/75">{value}</dd>
                                        </div>
                                    ))}
                                </Reveal>

                                <Reveal delay={350} className="mt-9 flex flex-wrap gap-3">
                                    {creator.socials.map((social) => (
                                        <a
                                            key={social.icon}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-contour-bleu"
                                        >
                                            {getIcon(social.icon)}
                                            {socialLabels[social.icon]}
                                        </a>
                                    ))}
                                </Reveal>
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <NextStep to={ROUTES.modele} label="Notre réalisation — Modèle 3D" title="Explorer l'architecture" />
        </>
    );
}
