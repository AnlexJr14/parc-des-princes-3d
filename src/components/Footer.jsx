// components/Footer.jsx
export default function Footer({ setView }) {
    return (
        <footer className="bg-[#F8F8F8] border-t border-black/5 pt-24 pb-12 mt-20">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    
                    {/* Description - 5 colonnes */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 border border-black flex items-center justify-center font-serif font-bold">P</div>
                            <span className="font-bold tracking-widest uppercase">Parc 3D Experience</span>
                        </div>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-md font-serif italic">
                            "Une exploration numérique de la structure de Roger Taillibert, où le béton devient poésie."
                        </p>
                    </div>

                    {/* Navigation - 3 colonnes */}
                    <div className="md:col-span-3">
                        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            <li><button onClick={() => setView('map')} className="text-sm uppercase tracking-wider hover:text-[#E30613] transition-colors">La Carte</button></li>
                            <li><button onClick={() => setView('3d')} className="text-sm uppercase tracking-wider hover:text-[#E30613] transition-colors">Modèle 3D</button></li>
                            <li><button onClick={() => setView('article')} className="text-sm uppercase tracking-wider hover:text-[#E30613] transition-colors">L'Histoire</button></li>
                        </ul>
                    </div>

                    {/* Crédits - 4 colonnes */}
                    <div className="md:col-span-4">
                        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">Conception</h3>
                        <div className="space-y-1">
                            <p className="text-sm uppercase tracking-widest font-bold">Timéo Da Costa</p>
                            <p className="text-sm uppercase tracking-widest font-bold">Axel Treffault</p>
                            <p className="text-xs text-gray-400 mt-4 font-mono">BUT MMI - 2026</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 gap-4">
                    <div className="flex gap-8">
                        <a href="#" className="text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-black">Instagram</a>
                        <a href="#" className="text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-black">LinkedIn</a>
                    </div>
                    <div className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase">
                        &copy; Tous droits réservés — Paris, France
                    </div>
                </div>
            </div>
        </footer>
    );
}