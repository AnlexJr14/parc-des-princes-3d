import Logo from './Logo';
import Reveal from './Reveal';
import Link from '../router/Link';
import { ROUTES } from '../router/context';

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-nuit text-white">
            <div className="wrap pt-20 pb-10 md:pt-28">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

                    <div className="space-y-7 md:col-span-5">
                        <Link to={ROUTES.home} className="group inline-block" aria-label="Parc 3D — retour à l'accueil">
                            <Logo />
                        </Link>
                        <p className="max-w-md font-serif text-xl leading-relaxed text-white/65 italic">
                            "Une exploration numérique du Parc des Princes, le plus beau stade du monde, recréé en 3D par deux étudiants en BUT MMI."
                        </p>
                    </div>

                    <div className="md:col-span-3 md:col-start-7">
                        <h3 className="t-label mb-7 text-white/45">Navigation</h3>
                        <ul className="t-display space-y-2 text-3xl">
                            <li><Link to={ROUTES.home} className="transition-colors duration-300 hover:text-or">La Carte</Link></li>
                            <li><Link to={ROUTES.modele} className="transition-colors duration-300 hover:text-or">Modèle 3D</Link></li>
                            <li><Link to={ROUTES.histoire} className="transition-colors duration-300 hover:text-or">L'Histoire</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="t-label mb-7 text-white/45">Conception</h3>
                        <ul className="t-display space-y-2 text-3xl">
                            <li><Link to={ROUTES.equipe} hash="timeo" className="transition-colors duration-300 hover:text-or">Timéo Da Costa</Link></li>
                            <li><Link to={ROUTES.equipe} hash="axel" className="transition-colors duration-300 hover:text-or">Axel Treffault</Link></li>
                        </ul>
                        <p className="t-label mt-6 text-white/45">BUT MMI - 2026</p>
                    </div>
                </div>

                <Reveal as="p" variant="" className="t-display mt-20 -mb-[0.06em] text-center text-[clamp(3rem,16vw,15rem)] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.28)] select-none" aria-hidden="true">
                    <span className="masque"><span>Ici c'est Paris</span></span>
                </Reveal>

                <div className="t-label flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-[0.625rem] text-white/45 md:flex-row">
                    <p>&copy; Tous droits réservés — Paris, France — 2026</p>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-3 uppercase tracking-[inherit] transition-colors duration-300 hover:text-white">
                        Retour en haut
                        <span className="transition-transform duration-500 ease-expo group-hover:-translate-y-1" aria-hidden="true">↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
