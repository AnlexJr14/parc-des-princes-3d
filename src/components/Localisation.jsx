import { lazy, Suspense, useRef } from 'react';
import Reveal from './Reveal';
import useInView from '../hooks/useInView';
import { ROUTES, useRouter } from '../router/context';

const Map = lazy(() => import('./Map'));

export default function Localisation() {
    const { navigate } = useRouter();
    const mapRef = useRef(null);
    const [frameRef, near] = useInView({ rootMargin: '600px 0px' });

    return (
        <section className="relative isolate overflow-hidden bg-bleu text-white" id="localisation">
            <div className="calque absolute inset-0 -z-10"></div>

            <div className="wrap grid grid-cols-1 gap-x-12 gap-y-12 py-20 md:py-28 lg:grid-cols-12 lg:items-end">

                <div className="lg:col-span-5">
                    <Reveal as="p" className="t-label mb-6 flex items-center gap-4 text-or">
                        Localisation stratégique
                    </Reveal>
                    <Reveal as="h2" variant="" className="t-display text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                        <span className="masque"><span>Au sud-ouest</span></span>
                        <span className="masque" style={{ '--d': '100ms' }}><span>de Paris</span></span>
                    </Reveal>
                    <Reveal as="p" delay={150} className="mt-7 max-w-sm font-serif text-xl leading-relaxed text-white/75">
                        Naviguez à travers l'histoire architecturale de Paris. Sélectionnez le marqueur pour une immersion totale.
                    </Reveal>

                    <Reveal delay={250} className="t-label mt-10 border-t border-white/20 pt-6 text-[0.625rem] leading-loose text-white/60">
                        <p className="text-white">24 rue du Commandant Guilbaud</p>
                        <p>75016 Paris — France</p>
                        <p>48.8414° N — 2.2530° E</p>
                    </Reveal>

                    <Reveal delay={350} className="mt-8">
                        <button onClick={() => mapRef.current?.recenter()} className="btn btn-contour" style={{ '--btn-fg-hover': 'var(--color-bleu)' }}>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 14v1m8-8h-1M5 12H4" />
                            </svg>
                            Recentrer
                        </button>
                    </Reveal>
                </div>

                <Reveal variant="volet" className="relative lg:col-span-7">
                    <div ref={frameRef} className="relative h-112 border border-white/20 bg-nuit md:h-152">
                        {near && (
                            <Suspense fallback={null}>
                                <Map ref={mapRef} onMarkerClick={() => navigate(ROUTES.modele)} />
                            </Suspense>
                        )}
                        <p className="t-label pointer-events-none absolute top-0 right-0 z-10 bg-white px-4 py-2.5 text-[0.625rem] text-bleu">
                            Cliquez sur le marqueur
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
