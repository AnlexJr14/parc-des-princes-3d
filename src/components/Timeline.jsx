import { useState, useEffect, useRef } from 'react';

export default function Timeline() {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);

    const dates = [
        { 
            year: "1897", 
            title: "Le Stade-Vélodrome", 
            desc: "Inauguration du premier Parc des Princes. Il se distingue par sa piste en ciment rose de 333 mètres et devient un haut lieu du cyclisme." 
        },
        { 
            year: "1932", 
            title: "La Première Rénovation", 
            desc: "L'enceinte est repensée pour accueillir 40 000 places. Elle s'ouvre massivement au football et au rugby, devenant le temple du sport français." 
        },
        { 
            year: "1972", 
            title: "L'Œuvre de Taillibert", 
            desc: "Inauguration de l'arène que l'on connaît aujourd'hui. Un chef-d'œuvre de l'architecture brutaliste porté par ses 50 portiques en béton." 
        },
        { 
            year: "1974", 
            title: "La Maison du PSG", 
            desc: "Le Paris Saint-Germain s'y installe définitivement. Le stade devient le théâtre des plus grandes nuits européennes du club de la capitale." 
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const scrollDistance = (window.innerHeight * 0.6) - rect.top;
            let percentage = (scrollDistance / rect.height) * 100;
            
            percentage = Math.max(0, Math.min(percentage, 100)); 
            setProgress(percentage);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="w-full bg-[#f8f8f8] py-24 px-6 overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
                
                <div className="text-center mb-20">
                    <span className="text-[#DA291C] font-mono tracking-[0.4em] text-xs uppercase block font-bold mb-3">Héritage</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#004170] uppercase tracking-tight italic">
                        La Traversée du Temps
                    </h2>
                </div>

                <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
                    
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-black/10"></div>
                    
                    <div 
                        className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-[#DA291C] transition-all duration-300 ease-out" 
                        style={{ height: `${progress}%` }}
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-10 bg-linear-to-t from-[#DA291C] to-transparent blur-[2px]"></div>
                    </div>

                    <div className="flex flex-col gap-16 md:gap-24 relative z-10 pt-8">
                        {dates.map((item, index) => {
                            const threshold = (index / (dates.length - 1)) * 100;
                            const isActive = progress >= threshold - 5;

                            return (
                                <div key={index} className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    
                                    <div className="hidden md:block md:w-1/2"></div>
                                    
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white transition-colors duration-500 shadow-md"
                                         style={{ backgroundColor: isActive ? '#DA291C' : '#e5e7eb' }}>
                                    </div>

                                    <div className={`w-full pl-16 md:pl-0 md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'}`}>
                                        <div 
                                            className={`bg-white p-8 border-t-4 border-[#ceab5d] shadow-xl transition-all duration-700 ease-out transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                        >
                                            <div className="text-4xl md:text-5xl font-light tracking-tighter text-[#004170] mb-2">
                                                {item.year}
                                            </div>
                                            <h3 className="font-bold uppercase tracking-widest text-xs text-[#1A1A1A] mb-4">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-serif italic leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    
                                </div>
                            );
                        })}
                    </div>
                    
                </div>
            </div>
        </section>
    );
}