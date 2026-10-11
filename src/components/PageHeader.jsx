import { useEffect, useState } from 'react';

export default function PageHeader({ eyebrow, title, back, children, aside }) {
    const [ready, setReady] = useState(false);
    const lines = Array.isArray(title) ? title : [title];

    useEffect(() => {
        const frame = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <header className={`relative isolate overflow-hidden bg-nuit pt-(--nav-h) text-white ${ready ? 'is-in' : ''}`}>
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_90%_at_85%_10%,var(--color-bleu),transparent_70%)]"></div>
            <div className="calque absolute inset-0 -z-10"></div>

            <div className="wrap pt-10 pb-14 md:pt-16 md:pb-20">
                {back && <div className="reveal mb-12 md:mb-16">{back}</div>}

                <p className="reveal t-label mb-6 flex items-center gap-4 text-or" style={{ '--d': '100ms' }}>
                    <span className="trait h-px w-12 bg-or" style={{ '--d': '200ms' }}></span>
                    {eyebrow}
                </p>
                <h1 className="t-display text-[clamp(2.75rem,12.5vw,12rem)]">
                    {lines.map((line, i) => (
                        <span key={i} className="masque" style={{ '--d': `${150 + i * 110}ms` }}>
                            <span>{line}</span>
                        </span>
                    ))}
                </h1>

                {(children || aside) && (
                    <div className="mt-9 flex flex-col gap-x-12 gap-y-8 lg:flex-row lg:items-end lg:justify-between">
                        {children && (
                            <div className="reveal grow" style={{ '--d': `${350 + lines.length * 110}ms` }}>
                                {children}
                            </div>
                        )}
                        {aside && (
                            <div className="reveal shrink-0" style={{ '--d': '600ms' }}>
                                {aside}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
