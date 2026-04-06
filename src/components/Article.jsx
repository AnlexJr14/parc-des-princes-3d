import { useState, useEffect } from 'react';
export default function Article({ data, setView }) {

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            if (windowHeight > 0) {
                const scroll = (totalScroll / windowHeight) * 100;
                setScrollProgress(scroll);
            }
        }; window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <article className="max-w-7xl mx-auto bg-white p-10 md:p-24 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative">

            <div
                className="fixed top-[98px] left-0 h-1.5 z-[9999] bg-gradient-to-r from-[#DA291C] to-[#004170] transition-all duration-75 ease-out"
                style={{ width: `${scrollProgress}%` }}
            >
                <div className="absolute top-0 right-0 h-full w-4 bg-white/50 blur-[2px]"></div>
            </div>


            <nav className="mb-20 border-b border-black/5 pb-6">
                <button
                    onClick={() => setView('map')}
                    className="text-sm font-mono uppercase tracking-widest text-[#004170] hover:text-[#DA291C] transition-colors font-bold"
                >
                    ← Retour au plan
                </button>
            </nav>

            <header className="mb-24 grid grid-cols-1 md:grid-cols-4 gap-12 items-end">
                <div className="md:col-span-3">
                    <span className="text-[#DA291C] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                        {data.subtitle}
                    </span>
                    <h1 className="text-6xl md:text-9xl font-extrabold text-[#004170] leading-none mb-4 uppercase tracking-tighter">
                        {data.title}
                    </h1>
                    <div className="font-mono text-xs md:text-sm uppercase tracking-[0.15em] text-gray-500">
                        Écrit par{' '}
                        <button
                            onClick={() => {
                                setView('creators');
                                setTimeout(() => document.getElementById('timeo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                            }}
                            className="font-bold text-[#004170] hover:text-[#DA291C] transition-colors underline decoration-[#ceab5d] underline-offset-4"
                        >
                            Timéo Da Costa
                        </button>
                        {' '}&{' '}
                        <button
                            onClick={() => {
                                setView('creators');
                                setTimeout(() => document.getElementById('axel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                            }}
                            className="font-bold text-[#004170] hover:text-[#DA291C] transition-colors underline decoration-[#ceab5d] underline-offset-4"
                        >
                            Axel Treffault
                        </button>
                    </div>
                </div>
                <div className="font-mono text-sm text-gray-400 uppercase tracking-[0.2em] md:text-right border-r-4 border-[#ceab5d] pr-6 py-2">
                    Édition Spéciale<br />
                    <span className="text-[#004170] font-bold">
                        {data.date.split(' • ')[0]} •{' '}
                        <span className="whitespace-nowrap">
                            {data.date.split(' • ')[1]}
                        </span>
                    </span>
                </div>
            </header>

            <div className="space-y-20 text-xl md:text-2xl text-[#333333] leading-relaxed">

                <div className="bg-[#004170]/5 p-12 border-l-8 border-[#DA291C]">
                    <p className="text-[#004170] text-3xl md:text-4xl leading-snug font-normal col-span-2">
                        {data.content[0]}
                    </p>
                </div>

                <div className="group relative overflow-hidden rounded-lg border-4 border-[#ceab5d] shadow-lg">
                    <img src="/photo1.jpg" alt="Parc des Princes" className="w-full h-auto transition-transform duration-[1.5s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="text-[#004170] text-3xl md:text-4xl leading-snug font-normal col-span-2">
                    <p>{data.content[1]}</p>
                </div>

                <div className="group relative overflow-hidden rounded-lg border-4 border-[#ceab5d] shadow-lg">
                    <img src="/photo2.jpg" alt="Tribunes du Parc" className="w-full h-auto transition-transform duration-[1.5s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="bg-[#004170] py-20 px-12 text-center shadow-xl">
                    <p className="text-3xl md:text-4xl text-[#ceab5d] font-serif italic max-w-4xl mx-auto leading-normal">
                        {data.content[2]}
                    </p>
                    <div className="h-1.5 w-24 bg-[#DA291C] mx-auto mt-10 shadow-[0_0_15px_rgba(218,41,28,0.5)]"></div>
                </div>
            </div>
        </article>
    );
}