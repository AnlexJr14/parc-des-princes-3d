import { useState, useEffect } from 'react';
import useInView from '../hooks/useInView';
import Reveal from './Reveal';
import { figuresData } from '../data';

const AnimatedNumber = ({ target, duration = 2000, plain = false }) => {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useInView({ threshold: 0.5, rootMargin: '0px' });

    useEffect(() => {
        if (!isVisible) return;
        let frame;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutProgress * target));
            if (progress < 1) frame = window.requestAnimationFrame(step);
        };
        frame = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(frame);
    }, [isVisible, target, duration]);

    return <span ref={ref} className="tabular-nums">{plain ? count : new Intl.NumberFormat('fr-FR').format(count)}</span>;
};

export default function KeyFigures() {
    return (
        <section className="beton" aria-label="Chiffres clés">
            <div className="wrap py-20 md:py-28">
                <Reveal as="p" className="t-label mb-10 flex items-center gap-4 text-rouge">
                    <span className="h-px w-12 bg-rouge"></span>
                    Le Parc en chiffres
                </Reveal>

                <div className="grid grid-cols-1 border-t border-bleu/20 sm:grid-cols-2 lg:grid-cols-4">
                    {figuresData.map((fig, index) => (
                        <Reveal
                            key={fig.label}
                            delay={index * 110}
                            className="group border-b border-bleu/20 py-8 sm:px-8 sm:odd:border-r sm:odd:pl-0 lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0"
                        >
                            <p className={`t-display text-[clamp(4.5rem,9vw,8.5rem)] ${fig.accent ? 'text-rouge' : 'text-bleu'}`}>
                                <AnimatedNumber target={fig.value} duration={2500} plain={fig.plain} />
                            </p>
                            <h3 className="t-label mt-5 text-encre">{fig.label}</h3>
                            <span className="mt-4 block h-0.5 w-10 bg-or transition-all duration-700 ease-expo group-hover:w-24 group-hover:bg-rouge"></span>
                            <p className="mt-4 font-serif text-lg italic text-encre/60">{fig.detail}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
