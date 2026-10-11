import { useRef, useState } from 'react';
import Reveal from './Reveal';
import useScrollFrame from '../hooks/useScrollFrame';
import { timelineData } from '../data';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Chaque chiffre de l'année est une colonne 0-9 qui glisse jusqu'à la bonne valeur
function Odometer({ value }) {
    return (
        <span className="odometre" aria-hidden="true">
            {value.split('').map((digit, i) => (
                <span
                    key={i}
                    className="odometre__colonne"
                    style={{ transform: `translateY(-${Number(digit) * 0.86}em)`, transitionDelay: `${i * 60}ms` }}
                >
                    {DIGITS.map((d) => <span key={d}>{d}</span>)}
                </span>
            ))}
        </span>
    );
}

export default function Timeline() {
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const listRef = useRef(null);

    useScrollFrame(() => {
        const list = listRef.current;
        if (!list) return;

        const line = window.innerHeight * 0.55;
        let current = 0;
        [...list.children].forEach((item, i) => {
            if (item.getBoundingClientRect().top < line) current = i;
        });
        setActive(current);

        const rect = list.getBoundingClientRect();
        setProgress(Math.max(0, Math.min((line - rect.top) / rect.height, 1)));
    });

    return (
        <section className="beton" id="heritage">
            <div className="wrap grid grid-cols-1 gap-x-16 py-20 md:py-32 lg:grid-cols-12">

                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
                        <Reveal as="p" className="t-label mb-6 flex items-center gap-4 text-rouge">
                            <span className="h-px w-12 bg-rouge"></span>
                            Héritage
                        </Reveal>
                        <Reveal as="h2" variant="" className="t-display text-6xl text-bleu md:text-7xl xl:text-8xl">
                            <span className="masque"><span>La traversée</span></span>
                            <span className="masque" style={{ '--d': '100ms' }}><span>du temps</span></span>
                        </Reveal>

                        <div className="mt-12 hidden lg:block">
                            <p className="t-display text-[clamp(9rem,17vw,17rem)] text-bleu">
                                <Odometer value={timelineData[active].year} />
                            </p>
                            <p className="t-label mt-6 flex items-center gap-4 text-encre/50">
                                <span className="text-rouge">0{active + 1}</span>
                                <span className="relative h-px w-32 bg-bleu/20">
                                    <span className="absolute inset-0 origin-left bg-rouge transition-transform duration-500 ease-out" style={{ transform: `scaleX(${progress})` }}></span>
                                </span>
                                0{timelineData.length}
                            </p>
                        </div>
                    </div>
                </div>

                <ol ref={listRef} className="relative mt-14 lg:col-span-7 lg:mt-0 lg:py-[12vh]">
                    {timelineData.map((item, index) => (
                        <li
                            key={item.year}
                            className={`relative border-t border-bleu/20 py-10 transition-opacity duration-700 last:border-b lg:py-[9vh] ${index === active ? '' : 'lg:opacity-30'}`}
                        >
                            <span
                                className="absolute -top-px left-0 h-0.5 w-full origin-left bg-rouge transition-transform duration-1000 ease-expo"
                                style={{ transform: `scaleX(${index === active ? 1 : 0})` }}
                            ></span>
                            <Reveal className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-[9rem_1fr]">
                                <p className="t-display text-7xl text-bleu md:text-6xl lg:text-5xl">
                                    {item.year}
                                </p>
                                <div>
                                    <h3 className="t-display text-4xl text-encre md:text-5xl">
                                        {item.title}
                                    </h3>
                                    <p className="mt-4 max-w-xl font-serif text-xl leading-relaxed text-encre/70">
                                        {item.desc}
                                    </p>
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
