import Reveal from './Reveal';
import Link from '../router/Link';
import { ROUTES } from '../router/context';
import { articleData } from '../data';

function Card({ to, label, title, image, alt, delay }) {
    return (
        <Reveal delay={delay}>
            <Link to={to} className="group relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden bg-nuit p-7 text-white sm:aspect-16/11 md:p-10 lg:aspect-4/5 xl:aspect-16/13">
                <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1.6s] ease-expo group-hover:scale-105"
                />
                <span className="absolute inset-0 -z-10 bg-linear-to-t from-nuit via-nuit/55 to-nuit/10 transition-opacity duration-700 group-hover:opacity-80"></span>
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-rouge transition-transform duration-700 ease-expo group-hover:scale-x-100"></span>

                <span className="t-label mb-4 flex items-center gap-4 text-or">
                    {label}
                </span>
                <span className="flex items-end justify-between gap-6">
                    <span className="t-display text-5xl md:text-6xl xl:text-7xl">{title}</span>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-white/40 text-xl transition-all duration-500 ease-expo group-hover:border-rouge group-hover:bg-rouge" aria-hidden="true">
                        <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
                    </span>
                </span>
            </Link>
        </Reveal>
    );
}

export default function Discover() {
    return (
        <section className="beton" aria-label="À découvrir">
            <div className="wrap grid grid-cols-1 gap-6 pb-20 md:pb-32 lg:grid-cols-2">
                <Card
                    to={ROUTES.modele}
                    label="Modèle 3D"
                    title="Explorer l'architecture"
                    image="/photo1.jpg"
                    alt="Le Parc des Princes vu du ciel, de nuit"
                    delay={0}
                />
                <Card
                    to={ROUTES.histoire}
                    label="L'Histoire"
                    title={articleData.title}
                    image="/photo2.jpg"
                    alt="Les tribunes du Parc des Princes un soir de match"
                    delay={120}
                />
            </div>
        </section>
    );
}
