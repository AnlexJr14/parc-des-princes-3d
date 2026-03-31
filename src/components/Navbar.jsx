export default function Navbar({ currentView, setView }) {
    const navItems = [
        { id: 'map', label: "1. La Carte" },
        { id: '3d', label: "2. Modèle 3D" },
        { id: 'article', label: "3. L'Histoire" }
    ];

    return (
        <header className="border-b-4 border-[#E30613] bg-[#001C3F] shadow-2xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                <div
                    className="flex items-center gap-4 cursor-pointer group"
                    onClick={() => setView('map')}
                >
                    <div className="w-16 h-16 p-1 bg-white rounded-xl flex items-center justify-center border-2 border-[#D4AF37] group-hover:scale-105 transition-transform">
                        <img src="/logo.png" alt="Logo" className="w-full h-auto" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tighter text-white leading-none">
                            PARC <span className="text-[#E30613]">3D</span>
                        </h1>
                        <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-mono">Experience</span>
                    </div>
                </div>

                <nav className="flex flex-wrap justify-center gap-2 md:gap-4 mt-2 md:mt-0">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wider rounded-lg transition-all ${currentView === item.id
                                ? 'bg-[#D4AF37] text-[#001C3F] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                : 'text-gray-300 hover:text-white hover:bg-white/10'
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