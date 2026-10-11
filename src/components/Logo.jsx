import { useId } from 'react';

const PORTIQUES = Array.from({ length: 50 }, (_, i) => {
    const a = (i / 50) * Math.PI * 2;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return [32 + 21.5 * cos, 32 + 16 * sin, 32 + 30.5 * cos, 32 + 23 * sin].map((n) => n.toFixed(2));
});

export function LogoMark({ tone = 'sombre', className = '' }) {
    const clip = useId();
    const sombre = tone === 'sombre';

    return (
        <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo Parc 3D">
            <g stroke={sombre ? '#fff' : '#004170'} strokeWidth="1.5">
                {PORTIQUES.map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
            </g>
            <clipPath id={clip}>
                <ellipse cx="32" cy="32" rx="17.5" ry="12" />
            </clipPath>
            <g clipPath={`url(#${clip})`}>
                <rect x="12" y="18" width="40" height="28" fill="#004170" />
                <rect x="26.6" y="18" width="10.8" height="28" fill="#fff" />
                <rect x="28.4" y="18" width="7.2" height="28" fill="#DA291C" />
            </g>
            {sombre && <ellipse cx="32" cy="32" rx="17.5" ry="12" fill="none" stroke="#ceab5d" strokeWidth="1" />}
        </svg>
    );
}

export default function Logo({ tone = 'sombre', className = '' }) {
    const sombre = tone === 'sombre';

    return (
        <span className={`inline-flex items-center gap-3 ${className}`}>
            <LogoMark
                tone={tone}
                className="h-11 w-11 shrink-0 transition-transform duration-700 ease-expo group-hover:rotate-[14.4deg]"
            />
            <span className="flex flex-col leading-none">
                <span className={`t-display text-[1.7rem] tracking-[0.02em] ${sombre ? 'text-white' : 'text-bleu'}`}>
                    Parc <span className={sombre ? 'text-or' : 'text-rouge'}>3D</span>
                </span>
                <span className={`t-label mt-1 text-[0.5625rem] ${sombre ? 'text-white/55' : 'text-encre/55'}`}>
                    Ici c'est Paris
                </span>
            </span>
        </span>
    );
}
