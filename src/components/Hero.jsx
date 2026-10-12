import { useEffect, useRef, useState } from 'react';
import StadiumPlan from './StadiumPlan';
import Link from '../router/Link';
import { ROUTES } from '../router/context';
import useScrollFrame from '../hooks/useScrollFrame';

export default function Hero() {
    const sectionRef = useRef(null);
    const planRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const handlePointerMove = (e) => {
        if (e.pointerType !== 'mouse' || !planRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        planRef.current.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width - 0.5) * 2);
        planRef.current.style.setProperty('--my', ((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    useScrollFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const progress = Math.min(Math.max(window.scrollY / section.offsetHeight, 0), 1);
        section.style.setProperty('--p', progress);
    });

    return (
        <section
            ref={sectionRef}
            onPointerMove={handlePointerMove}
            className={`relative isolate flex min-h-svh flex-col overflow-hidden bg-nuit pt-(--nav-h) text-white ${ready ? 'is-in' : ''}`}
        >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_72%_45%,var(--color-bleu),transparent_70%)]"></div>
            <div className="calque absolute inset-0 -z-10"></div>

            <div className="wrap relative grid grow grid-cols-1 items-center gap-y-4 py-10 lg:grid-cols-12 lg:py-0">

                <div className="relative z-10 lg:col-span-7" style={{ transform: 'translateY(calc(var(--p, 0) * -4rem))', opacity: 'calc(1 - var(--p, 0) * 1.4)' }}>
                    <p className="reveal t-label mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-or" style={{ '--d': '200ms' }}>
                        Paris XVIe
                        <span className="text-white/45">48.8414° N — 2.2530° E</span>
                    </p>

                    <h1 className="t-display text-[clamp(4.25rem,16.5vw,7rem)] sm:text-[clamp(7rem,15vw,13.5rem)] lg:text-[clamp(7rem,11.2vw,13.5rem)]">
                        <span className="masque" style={{ '--d': '250ms' }}><span>Le Parc</span></span>
                        <span className="masque" style={{ '--d': '370ms' }}>
                            <span>des <span className="text-transparent [-webkit-text-stroke:2px_var(--color-or)]">Princes</span></span>
                        </span>
                    </h1>

                    <p className="reveal mt-8 max-w-md font-serif text-xl leading-relaxed text-white/75 md:text-[1.375rem]" style={{ '--d': '650ms' }}>
                        Le colosse de béton de Roger Taillibert, modélisé en 3D et raconté par deux étudiants en BUT MMI.
                    </p>

                    <div className="reveal mt-10 flex flex-wrap gap-4" style={{ '--d': '800ms' }}>
                        <Link to={ROUTES.modele} className="btn">
                            Explorer le modèle 3D <span className="fleche" aria-hidden="true">→</span>
                        </Link>
                        <Link to={ROUTES.histoire} className="btn btn-contour">
                            Lire l'article
                        </Link>
                    </div>
                </div>

                <div className="pointer-events-none relative -mx-6 lg:col-span-5 lg:mx-0">
                    <div
                        ref={planRef}
                        className="relative mx-auto mt-[8%] -mb-[18%] w-full max-w-136 lg:absolute lg:top-1/2 lg:right-[-46%] lg:my-0 lg:w-[160%] xl:right-[-34%] lg:max-w-none lg:-translate-y-[52%]"
                    >
                        <StadiumPlan />
                    </div>
                </div>
            </div>

            <div className="reveal wrap relative z-10 pb-7" style={{ '--d': '1000ms' }}>
                <dl className="t-label grid grid-cols-2 border-t border-white/15 text-[0.625rem] text-white/50 sm:grid-cols-4">
                    {[
                        ['Architecte', 'Roger Taillibert'],
                        ['Inauguration', '1972'],
                        ['Structure', '50 portiques'],
                        ['Courant', 'Brutalisme'],
                    ].map(([terme, valeur]) => (
                        <div key={terme} className="border-white/15 py-4 sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0">
                            <dt>{terme}</dt>
                            <dd className="mt-1.5 text-white">{valeur}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
