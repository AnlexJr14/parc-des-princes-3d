export default function Footer({ setView }) {
    return (
        <footer className="bg-[#F8F8F8] border-t border-black/5 pt-24 pb-12 mt-20">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">

                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 border border-black flex items-center justify-center font-serif font-bold">P</div>
                            <span className="font-bold tracking-widest uppercase">Parc 3D Experience</span>
                        </div>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-md font-serif italic">
                            "Une exploration numérique du Parc des Princes, le plus beau stade du monde, recréé en 3D par deux étudiants en BUT MMI."
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            <li><button onClick={() => setView('map')} className="text-sm uppercase tracking-wider hover:text-[#E30613] transition-colors">La Carte</button></li>
                            <li><button onClick={() => setView('3d')} className="text-sm uppercase tracking-wider hover:text-[#E30613] transition-colors">Modèle 3D</button></li>
                            <li><button onClick={() => setView('article')} className="text-sm uppercase tracking-wider hover:text-[#E30613] transition-colors">L'Histoire</button></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">Conception</h3>
                        <div className="space-y-4 flex flex-col items-start">
                            <button
                                onClick={() => {
                                    setView('creators');
                                    setTimeout(() => document.getElementById('timeo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                                }}
                                className="text-sm uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#DA291C] transition-colors text-left"
                            >
                                Timéo Da Costa
                            </button>
                            <button
                                onClick={() => {
                                    setView('creators');
                                    setTimeout(() => document.getElementById('axel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                                }}
                                className="text-sm uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#DA291C] transition-colors text-left"
                            >
                                Axel Treffault
                            </button>
                            <p className="text-xs text-gray-400 mt-4 font-mono pt-2 border-t border-black/5 w-1/2">
                                BUT MMI - 2026
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center pt-8 border-t border-black/5 mt-12">
                    <div className="text-[12px] font-mono text-center w-full tracking-[0.3em] text-gray-400 uppercase">
                        &copy; Tous droits réservés — Paris, France — 2026
                    </div>
                </div>
            </div>
        </footer>
    );
}