import { useEffect, useState } from 'react';

const C = 400;
const K = 0.77;
const N = 50;

const ellipse = (rx) => {
    const ry = rx * K;
    return `M${C - rx},${C}a${rx},${ry} 0 1,0 ${rx * 2},0a${rx},${ry} 0 1,0 ${-rx * 2},0Z`;
};
const anneau = (rxOut, rxIn) => ellipse(rxOut) + ellipse(rxIn);

const rayon = (i, n, rxIn, rxOut) => {
    const a = (i / n) * Math.PI * 2;
    const cos = Math.cos(a);
    const sin = Math.sin(a) * K;
    return [C + rxIn * cos, C + rxIn * sin, C + rxOut * cos, C + rxOut * sin].map((v) => +v.toFixed(1));
};
const rayons = (n, rxIn, rxOut) =>
    Array.from({ length: n }, (_, i) => {
        const [x1, y1, x2, y2] = rayon(i, n, rxIn, rxOut);
        return `M${x1},${y1}L${x2},${y2}`;
    }).join('');

const PORTIQUES = Array.from({ length: N }, (_, i) => rayon(i, N, 322, 376));

const P = { x: C - 150, y: C - 97, w: 300, h: 194 };

function Couche({ z, children }) {
    return (
        <svg className="plan__couche" viewBox="0 0 800 800" style={{ '--z': z }} fill="none" aria-hidden="true">
            {children}
        </svg>
    );
}

export default function StadiumPlan({ className = '' }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setOpen(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div className={`plan ${open ? 'is-open' : ''} ${className}`}>
            <div className="plan__bascule">
                <div className="plan__plateau">

                    {/* Sol : emprise et pelouse */}
                    <Couche z={0}>
                        <path d={ellipse(384)} stroke="#fff" strokeOpacity=".22" strokeDasharray="2 7" />
                        <path d={ellipse(372)} fill="#001b30" fillOpacity=".55" />
                        <rect x={P.x} y={P.y} width={P.w} height={P.h} fill="#004170" fillOpacity=".55" />
                        {[0, 2, 4, 6, 8].map((i) => (
                            <rect key={i} x={P.x + i * 30} y={P.y} width="30" height={P.h} fill="#fff" fillOpacity=".05" />
                        ))}
                        <g stroke="#fff" strokeOpacity=".8" strokeWidth="1.4">
                            <rect x={P.x} y={P.y} width={P.w} height={P.h} />
                            <path d={`M${C},${P.y}V${P.y + P.h}`} />
                            <circle cx={C} cy={C} r="26" />
                            <rect x={P.x} y={C - 57.5} width="47" height="115" />
                            <rect x={P.x + P.w - 47} y={C - 57.5} width="47" height="115" />
                            <rect x={P.x} y={C - 26} width="16" height="52" />
                            <rect x={P.x + P.w - 16} y={C - 26} width="16" height="52" />
                        </g>
                        <circle className="pouls" cx={C} cy={C} r="7" fill="#DA291C" />
                        <circle cx={C} cy={C} r="4" fill="#DA291C" />
                    </Couche>

                    {/* Gradins bas */}
                    <Couche z={1}>
                        <path d={anneau(276, 212)} fillRule="evenodd" fill="#004170" fillOpacity=".5" stroke="#fff" strokeOpacity=".55" />
                        <path d={ellipse(244)} stroke="#fff" strokeOpacity=".2" />
                        <path d={rayons(25, 212, 276)} stroke="#fff" strokeOpacity=".22" />
                    </Couche>

                    {/* Gradins hauts */}
                    <Couche z={2}>
                        <path d={anneau(338, 270)} fillRule="evenodd" fill="#004170" fillOpacity=".42" stroke="#fff" strokeOpacity=".55" />
                        <path d={ellipse(304)} stroke="#fff" strokeOpacity=".2" />
                        <path d={rayons(N, 270, 338)} stroke="#fff" strokeOpacity=".18" />
                    </Couche>

                    {/* Les 50 portiques, répétés en hauteur pour suggérer leur élancement */}
                    <Couche z={2.6}>
                        <path d={rayons(N, 330, 376)} stroke="#ceab5d" strokeOpacity=".3" strokeWidth="2" />
                    </Couche>
                    <Couche z={3.3}>
                        <path d={rayons(N, 326, 376)} stroke="#ceab5d" strokeOpacity=".5" strokeWidth="2.5" />
                    </Couche>
                    <Couche z={4}>
                        <g stroke="#ceab5d" strokeWidth="3.5" strokeLinecap="round">
                            {PORTIQUES.map(([x1, y1, x2, y2], i) => (
                                <line key={i} className="plan__portique" pathLength="1" x1={x1} y1={y1} x2={x2} y2={y2} style={{ '--i': i }} />
                            ))}
                        </g>
                    </Couche>

                    {/* Toiture en porte-à-faux */}
                    <Couche z={5}>
                        <path d={anneau(370, 238)} fillRule="evenodd" fill="#fff" fillOpacity=".07" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" />
                        <path d={rayons(N, 238, 370)} stroke="#fff" strokeOpacity=".16" />
                        <path d={ellipse(238)} stroke="#ceab5d" strokeWidth="2" />
                    </Couche>

                    {/* La ronde des projecteurs, tracée sur un cercle puis aplatie en ellipse */}
                    <div className="plan__couche" style={{ '--z': 5.05 }} aria-hidden="true">
                        <div className="absolute inset-0" style={{ transform: `scaleY(${K})` }}>
                            <svg className="plan__ronde h-full w-full overflow-visible" viewBox="0 0 800 800">
                                {Array.from({ length: 9 }, (_, i) => (
                                    <line
                                        key={i}
                                        x1={C + 238}
                                        y1={C}
                                        x2={C + 370}
                                        y2={C}
                                        stroke="#fff"
                                        strokeWidth="3"
                                        strokeOpacity={1 - i / 9}
                                        transform={`rotate(${-i * 7.2} ${C} ${C})`}
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
