import { useState } from 'react';
import AudioToggle from './AudioToggle';

export default function Navbar({ currentView, setView }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'map', label: "Exploration" },
        { id: '3d', label: "Modèle 3D" },
        { id: 'article', label: "L'Histoire" }
    ];

    const handleNavClick = (id) => {
        setView(id);
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-[#004170]/10">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">

                <div className="flex items-center gap-4 cursor-pointer group shrink-0" onClick={() => handleNavClick('map')}>
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

                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`relative py-2 text-sm font-mono uppercase tracking-[0.2em] transition-all
                                ${currentView === item.id
                                    ? 'text-[#004170] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#DA291C]'
                                    : 'text-gray-400 hover:text-[#ceab5d] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#ceab5d] hover:after:w-full after:transition-all'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                    
                    <div className="border-l border-gray-200 pl-8 ml-2">
                        <AudioToggle />
                    </div>
                </nav>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50"
                >
                    <span className={`block w-6 h-0.5 bg-[#004170] transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-[#004170] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-[#004170] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            <div className={`md:hidden absolute top-24 left-0 w-full bg-white shadow-xl border-b border-gray-100 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-80 py-8' : 'max-h-0'}`}>
                <nav className="flex flex-col items-center gap-6">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className="text-sm font-mono uppercase tracking-widest text-gray-600"
                        >
                            {item.label}
                        </button>
                    ))}
                    <div className="pt-4 border-t border-gray-100 w-full flex justify-center">
                        <AudioToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
}