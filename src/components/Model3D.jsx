import { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import { finishes, snapshotMaterials, applyFinish } from './modelFinishes';

const DEFAULT_ORBIT = '0deg 45deg auto';
const SKY = '/street-view-paris.hdr';

const views = [
    { id: 'perspective', label: 'Perspective', orbit: DEFAULT_ORBIT },
    { id: 'aerienne', label: 'Aérienne', orbit: '0deg 0deg auto' },
    { id: 'facade', label: 'Façade', orbit: '90deg 82deg auto' },
];

const PORTIQUES = Array.from({ length: 50 }, (_, i) => {
    const a = (i / 50) * Math.PI * 2 - Math.PI / 2;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return [60 + 40 * cos, 60 + 30 * sin, 60 + 56 * cos, 60 + 42 * sin].map((n) => n.toFixed(1));
});

function Hotspot({ slot, position, normal, title, text }) {
    return (
        <button
            className="point-3d relative h-6 w-6 rounded-full border-2 border-white bg-rouge shadow-lg transition-opacity duration-300"
            slot={slot}
            data-position={position}
            data-normal={normal}
            aria-label={title}
        >
            <span className="absolute inset-0 animate-ping rounded-full bg-rouge opacity-40"></span>
            <span className="point-3d__fiche absolute bottom-10 left-1/2 z-50 block w-64 border-t-4 border-or bg-bleu p-5 text-left text-sm text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                <span className="t-label mb-2 block text-or">{title}</span>
                <span className="block font-serif text-base leading-relaxed italic opacity-90">{text}</span>
            </span>
        </button>
    );
}

export default function Model3D({ data }) {
    const viewerRef = useRef(null);
    const stageRef = useRef(null);
    const originalsRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const [view, setView] = useState('perspective');
    const [finish, setFinish] = useState('realiste');
    const [autoRotate, setAutoRotate] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [pseudoFullscreen, setPseudoFullscreen] = useState(false);

    useEffect(() => {
        const viewer = viewerRef.current;
        const onProgress = (e) => setProgress(e.detail.totalProgress);
        const onLoad = () => {
            originalsRef.current = snapshotMaterials(viewer);
            setLoaded(true);
        };
        const onError = () => setFailed(true);
        const onFullscreen = () => setIsFullscreen(document.fullscreenElement === stageRef.current);

        viewer.addEventListener('progress', onProgress);
        viewer.addEventListener('load', onLoad);
        viewer.addEventListener('error', onError);
        document.addEventListener('fullscreenchange', onFullscreen);
        return () => {
            viewer.removeEventListener('progress', onProgress);
            viewer.removeEventListener('load', onLoad);
            viewer.removeEventListener('error', onError);
            document.removeEventListener('fullscreenchange', onFullscreen);
        };
    }, []);

    const selectView = (next) => {
        setView(next.id);
        viewerRef.current.cameraOrbit = next.orbit;
        viewerRef.current.fieldOfView = 'auto';
    };

    const selectFinish = (next) => {
        if (!originalsRef.current) return;
        setFinish(next);
        applyFinish(originalsRef.current, next);
    };

    useEffect(() => {
        if (!pseudoFullscreen) return;
        const onKey = (e) => e.key === 'Escape' && setPseudoFullscreen(false);
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [pseudoFullscreen]);

    const toggleFullscreen = () => {
        const stage = stageRef.current;
        if (document.fullscreenElement) document.exitFullscreen();
        else if (pseudoFullscreen) setPseudoFullscreen(false);
        else if (!stage.requestFullscreen) setPseudoFullscreen(true);
        else stage.requestFullscreen().catch(() => setPseudoFullscreen(true));
    };

    const expanded = isFullscreen || pseudoFullscreen;

    const studio = finish !== 'realiste';
    const lit = Math.round(progress * 50);
    const control = 'flex h-11 items-center gap-2.5 border-l border-white/15 px-4 transition-colors duration-300 hover:bg-white hover:text-bleu';
    const groupe = 't-label flex max-w-full overflow-x-auto border border-white/15 bg-nuit/80 text-[0.625rem] text-white backdrop-blur-sm max-sm:[&>button:first-of-type]:border-l-0';
    const etiquette = 'hidden h-11 items-center px-4 text-white/50 sm:flex';

    return (
        <div ref={stageRef} className={`isolate w-full overflow-hidden border border-white/15 bg-nuit ${pseudoFullscreen ? 'fixed inset-0 z-100 h-dvh' : 'relative h-[min(78svh,52rem)] min-h-112'}`}>

            <model-viewer
                ref={viewerRef}
                src="/parc-des-princes.glb"
                alt="Modèle 3D du Parc des Princes"
                camera-controls
                touch-action="pan-y"
                auto-rotate={autoRotate ? '' : undefined}
                rotation-per-second="18deg"
                interaction-prompt="none"
                shadow-intensity="1.5"
                shadow-softness="1"
                skybox-image={studio ? undefined : SKY}
                environment-image={studio ? 'neutral' : SKY}
                exposure={studio ? '0.7' : '0.9'}
                bounds="tight"
                camera-orbit={DEFAULT_ORBIT}
                max-camera-orbit="auto 85deg auto"
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
            >
                <div slot="progress-bar"></div>

                <Hotspot slot="hotspot-1" position="-1.66 1.74 -5.59" normal="0 2 0" {...data.hotspots[0]} />
                <Hotspot slot="hotspot-2" position="2.8 1.74 -5.59" normal="1 0 0" {...data.hotspots[1]} />
            </model-viewer>

            <div
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-7 bg-nuit transition-opacity duration-1000 ${loaded ? 'pointer-events-none opacity-0' : ''}`}
                role="status"
                aria-hidden={loaded}
            >
                <div className="calque absolute inset-0 -z-10"></div>
                {failed ? (
                    <p className="t-label max-w-xs text-center leading-relaxed text-white/70">
                        Le modèle 3D n'a pas pu être chargé. Rechargez la page pour réessayer.
                    </p>
                ) : (
                    <>
                        <div className="relative">
                            <svg viewBox="0 0 120 120" className="h-48 w-48 md:h-60 md:w-60" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                {PORTIQUES.map(([x1, y1, x2, y2], i) => (
                                    <line
                                        key={i}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        className="transition-[stroke] duration-500"
                                        stroke={i < lit ? '#ceab5d' : 'rgb(255 255 255 / 0.15)'}
                                    />
                                ))}
                            </svg>
                            <p className="t-display absolute inset-0 flex items-center justify-center text-5xl tabular-nums md:text-6xl">
                                {Math.round(progress * 100)}<span className="ml-1 text-2xl text-or">%</span>
                            </p>
                        </div>
                        <p className="t-label text-white/60">Assemblage des 50 portiques…</p>
                    </>
                )}
            </div>

            <div className={`pointer-events-none absolute top-5 left-5 z-10 flex items-center gap-3 transition-opacity delay-500 duration-700 ${loaded ? '' : 'opacity-0'}`}>
                <span className="h-11 w-1 bg-rouge"></span>
                <div className="bg-nuit/70 px-3 py-2 backdrop-blur-sm">
                    <p className="t-label text-[0.625rem] text-white">Vue {views.find((item) => item.id === view).label}</p>
                    <p className="mt-0.5 font-serif text-sm text-white/60 italic">Rendu {finishes.find((item) => item.id === finish).label.toLowerCase()}, temps réel</p>
                </div>
            </div>

            <div className={`absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end gap-3 p-3 transition-all delay-500 duration-700 ease-expo md:p-5 ${loaded ? '' : 'translate-y-6 opacity-0'}`}>
                <div className={groupe} role="group" aria-label="Points de vue">
                    <span className={etiquette} aria-hidden="true">Vue</span>
                    {views.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => selectView(item)}
                            aria-pressed={view === item.id}
                            className={`${control} uppercase tracking-[inherit] ${view === item.id ? 'bg-rouge' : ''}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className={groupe} role="group" aria-label="Matière">
                    <span className={etiquette} aria-hidden="true">Matière</span>
                    {finishes.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => selectFinish(item.id)}
                            aria-pressed={finish === item.id}
                            className={`${control} uppercase tracking-[inherit] ${finish === item.id ? 'bg-rouge' : ''}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className={`${groupe} ml-auto`}>
                    <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        aria-pressed={autoRotate}
                        className={`${control} border-l-0 uppercase tracking-[inherit] ${autoRotate ? 'bg-rouge' : ''}`}
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 12a9 9 0 1 1-3-6.7" />
                            <path d="M21 3v6h-6" />
                        </svg>
                        <span className="hidden sm:inline">Rotation</span>
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className={control}
                        aria-label={expanded ? 'Quitter le plein écran' : 'Plein écran'}
                        title={expanded ? 'Quitter le plein écran' : 'Plein écran'}
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            {expanded
                                ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                                : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}
                        </svg>
                    </button>
                </div>
            </div>

            <p className={`t-label pointer-events-none absolute top-5 right-5 z-10 hidden bg-nuit/70 px-3 py-2 text-[0.625rem] text-white/70 backdrop-blur-sm transition-opacity delay-700 duration-700 md:block ${loaded ? '' : 'opacity-0'}`}>
                Glisser pour tourner — Molette pour zoomer
            </p>
        </div>
    );
}
