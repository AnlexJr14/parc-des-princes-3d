import { useState } from 'react';
import Reveal from './Reveal';
import { tribunesData } from '../data';

const CX = 300;
const CY = 220;
const OUT = [278, 198];
const IN = [192, 120];
const GAP = 1.4;

const sectors = {
    boulogne: [-42, 42],
    borelli: [42, 138],
    auteuil: [138, 222],
    paris: [222, 318],
};

const point = ([rx, ry], deg) => {
    const a = (deg * Math.PI) / 180;
    return [CX + rx * Math.cos(a), CY + ry * Math.sin(a)].map((n) => n.toFixed(1)).join(',');
};

const sectorPath = ([from, to]) => {
    const a = from + GAP;
    const b = to - GAP;
    return `M${point(OUT, a)}A${OUT} 0 0 1 ${point(OUT, b)}L${point(IN, b)}A${IN} 0 0 0 ${point(IN, a)}Z`;
};

const labelPosition = ([from, to]) => {
    const mid = (from + to) / 2;
    const [x, y] = point([(OUT[0] + IN[0]) / 2, (OUT[1] + IN[1]) / 2], mid).split(',');
    const rotate = mid === 0 ? 90 : mid === 180 ? -90 : 0;
    return { x, y, rotate };
};

const PORTIQUES = Array.from({ length: 50 }, (_, i) => {
    const deg = (i / 50) * 360;
    return `M${point([288, 206], deg)}L${point([300, 216], deg)}`;
}).join('');

export default function Tribunes() {
    const [active, setActive] = useState(null);

    return (
        <section className="beton" id="anatomie">
            <div className="wrap py-20 md:py-28">
                <Reveal as="p" className="t-label mb-6 flex items-center gap-4 text-rouge">
                    <span className="h-px w-12 bg-rouge"></span>
                    Quatre tribunes
                </Reveal>
                <Reveal as="h2" variant="" className="t-display text-6xl text-bleu md:text-7xl xl:text-8xl">
                    <span className="masque"><span>L'Anatomie du Stade</span></span>
                </Reveal>

                <div className="mt-14 grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-12">

                    <Reveal className="lg:col-span-6">
                        <svg viewBox="0 0 600 440" className="w-full" role="img" aria-label="Plan des quatre tribunes du Parc des Princes">
                            <path d={PORTIQUES} stroke="#004170" strokeWidth="2" strokeOpacity=".45" />

                            {tribunesData.map((tribune) => {
                                const isActive = active === tribune.id;
                                const { x, y, rotate } = labelPosition(sectors[tribune.id]);
                                return (
                                    <g
                                        key={tribune.id}
                                        onMouseEnter={() => setActive(tribune.id)}
                                        onMouseLeave={() => setActive(null)}
                                        className="cursor-pointer"
                                    >
                                        <path
                                            d={sectorPath(sectors[tribune.id])}
                                            fill={isActive ? tribune.color : '#004170'}
                                            fillOpacity={isActive ? 1 : active ? 0.06 : 0.12}
                                            stroke={isActive ? tribune.color : '#004170'}
                                            strokeOpacity={isActive ? 1 : 0.4}
                                            className="transition-all duration-500"
                                        />
                                        <text
                                            x={x}
                                            y={y}
                                            transform={`rotate(${rotate} ${x} ${y})`}
                                            textAnchor="middle"
                                            dominantBaseline="central"
                                            className="t-display pointer-events-none text-[1.6rem] transition-all duration-500"
                                            fill={isActive ? (tribune.color === '#ceab5d' ? '#001b30' : '#fff') : '#004170'}
                                            fillOpacity={isActive || !active ? 1 : 0.35}
                                        >
                                            {tribune.name}
                                        </text>
                                    </g>
                                );
                            })}

                            <g stroke="#004170" strokeOpacity=".55" strokeWidth="1.5" fill="none">
                                <rect x={CX - 118} y={CY - 76} width="236" height="152" fill="#004170" fillOpacity=".05" />
                                <path d={`M${CX},${CY - 76}V${CY + 76}`} />
                                <circle cx={CX} cy={CY} r="21" />
                                <rect x={CX - 118} y={CY - 45} width="37" height="90" />
                                <rect x={CX + 81} y={CY - 45} width="37" height="90" />
                            </g>
                        </svg>
                    </Reveal>

                    <ul className="border-t border-bleu/20 lg:col-span-6">
                        {tribunesData.map((tribune, index) => {
                            const isActive = active === tribune.id;
                            return (
                                <Reveal
                                    as="li"
                                    key={tribune.id}
                                    delay={index * 90}
                                    onMouseEnter={() => setActive(tribune.id)}
                                    onMouseLeave={() => setActive(null)}
                                    onFocus={() => setActive(tribune.id)}
                                    onBlur={() => setActive(null)}
                                    tabIndex={0}
                                    className={`relative border-b border-bleu/20 py-7 pr-4 pl-7 transition-[background-color,opacity,transform] duration-500 ${isActive ? 'bg-white' : active ? 'opacity-45' : ''}`}
                                >
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 origin-top transition-transform duration-500 ease-expo"
                                        style={{ backgroundColor: tribune.color, transform: `scaleY(${isActive ? 1 : 0.35})` }}
                                    ></span>
                                    <h3 className="t-display text-4xl text-bleu md:text-5xl">{tribune.name}</h3>
                                    <p className="mt-3 max-w-xl font-serif text-lg leading-relaxed text-encre/70">
                                        {tribune.desc}
                                    </p>
                                </Reveal>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
