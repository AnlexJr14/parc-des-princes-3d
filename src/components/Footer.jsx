export default function Footer({ setView }) {
    return (
        <footer className="border-t-2 border-[#D4AF37]/30 bg-[#060a12] text-gray-400 pt-12 pb-6 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/logo.png" alt="Logo" className="w-10 h-10 bg-white p-1 rounded" />
                        <span className="font-extrabold text-white text-xl tracking-tighter">PARC <span className="text-[#E30613]">3D</span></span>
                    </div>
                    <p className="text-sm leading-relaxed text-justify">
                        Un projet interactif explorant l'architecture brutaliste et l'histoire du Parc des Princes, mêlant modélisation 3D et développement web.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Navigation</h3>
                    <ul className="space-y-2 text-sm">
                        <li><button onClick={() => setView('map')} className="hover:text-[#D4AF37] transition-colors">La Carte Interactive</button></li>
                        <li><button onClick={() => setView('3d')} className="hover:text-[#D4AF37] transition-colors">Exploration 3D</button></li>
                        <li><button onClick={() => setView('article')} className="hover:text-[#D4AF37] transition-colors">L'Histoire du Stade</button></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Le Projet</h3>
                    <p className="text-sm mb-4">Réalisé par des étudiants en 2ème année de BUT MMI.</p>
                    <ul className="space-y-2 text-sm font-bold text-[#D4AF37]">
                        <li><button
                            onClick={() => {
                                setView('creators');
                                setTimeout(() => document.getElementById('timeo')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }}
                            className="hover:text-white transition-colors"
                        >Timéo Da Costa</button></li>
                        <li><button
                            onClick={() => {
                                setView('creators');
                                setTimeout(() => document.getElementById('axel')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }}
                            className="hover:text-white transition-colors"
                        >Axel Treffault</button></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs font-mono tracking-widest border-t border-gray-800 pt-6">
                &copy; 2024 PARC 3D EXPERIENCE. TOUS DROITS RÉSERVÉS.
            </div>
        </footer>
    );
}