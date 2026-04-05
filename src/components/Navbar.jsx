export default function Navbar({ currentView, setView }) {
    const navItems = [
        { id: 'map', label: "Exploration" },
        { id: '3d', label: "Modèle 3D" },
        { id: 'article', label: "L'Histoire" }
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-[#004170]/10">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
                
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('map')}>
                    <div className="w-12 h-12 flex items-center justify-center border-2 border-[#004170] group-hover:bg-[#004170] group-hover:text-white transition-all duration-500">
                        <span className="font-serif font-bold text-xl">P</span>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold tracking-[0.2em] uppercase leading-none text-[#004170]">
                            Parc <span className="text-[#DA291C]">3D</span>
                        </h1>
                        <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#ceab5d] mt-1 font-bold">Ici c'est Paris</p>
                    </div>
                </div>

                <nav className="flex items-center gap-4 md:gap-10">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`relative py-2 text-xs md:text-sm font-mono uppercase tracking-[0.2em] transition-all
                                ${currentView === item.id 
                                    ? 'text-[#004170] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#DA291C]' 
                                    : 'text-gray-400 hover:text-[#ceab5d] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ceab5d] hover:after:w-full after:transition-all'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
}