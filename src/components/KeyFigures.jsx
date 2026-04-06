import { useState, useEffect, useRef } from 'react';

// Le moteur d'animation reste le même
const AnimatedNumber = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutProgress * target));
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [isVisible, target, duration]);

    return <span ref={ref}>{new Intl.NumberFormat('fr-FR').format(count)}</span>;
};

export default function KeyFigures() {
    const figures = [
        {
            value: 47929,
            label: "Places assises",
            color: "text-[#ceab5d]",
            detail: "Une capacité mythique"
        },
        {
            value: 1972,
            label: "Inauguration",
            color: "text-white",
            detail: "L'ère Taillibert"
        },
        {
            value: 50,
            label: "Portiques de béton",
            color: "text-[#DA291C]",
            detail: "Une structure unique au monde"
        },
        {
            value: 3,
            label: "a accueilli Finales de C1",
            color: "text-white",
            detail: "Le sommet du football européen"
        }
    ];

    return (
        <div className="w-full bg-[#004170] py-20 px-6 border-y-4 border-[#ceab5d] my-16 shadow-2xl relative isolate overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ceab5d 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {figures.map((fig, index) => (
                        <div key={index} className="group flex flex-col items-center">
                            <h3 className={`text-6xl font-light tracking-tighter mb-2 ${fig.color}`}>
                                <AnimatedNumber target={fig.value} duration={2500} />
                            </h3>
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/90 mb-4">
                                {fig.label}
                            </p>
                            <div className="h-px w-12 bg-[#DA291C] group-hover:w-24 transition-all duration-500 mb-4"></div>
                            <p className="text-[10px] font-serif italic text-white/40 uppercase tracking-widest">
                                {fig.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}