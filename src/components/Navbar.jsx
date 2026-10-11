import { useEffect, useState } from 'react';
import AudioToggle from './AudioToggle';
import Logo from './Logo';
import Link from '../router/Link';
import { ROUTES, useRouter } from '../router/context';
import useScrollFrame from '../hooks/useScrollFrame';

const navItems = [
    { to: ROUTES.home, label: "Exploration" },
    { to: ROUTES.modele, label: "Modèle 3D" },
    { to: ROUTES.histoire, label: "L'Histoire" },
    { to: ROUTES.equipe, label: "Créateurs" },
];

export default function Navbar() {
    const { path } = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useScrollFrame(() => setScrolled(window.scrollY > 24));

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        if (!isMenuOpen) return;

        const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500
                ${scrolled || isMenuOpen ? 'border-white/10 bg-nuit/90 backdrop-blur-md' : 'border-transparent bg-transparent'}`}
            style={{ viewTransitionName: 'nav' }}
        >
            <div className="wrap flex h-(--nav-h) items-center justify-between gap-6">

                <Link to={ROUTES.home} onClick={closeMenu} className="group shrink-0" aria-label="Parc 3D — retour à l'accueil">
                    <Logo />
                </Link>

                <nav className="hidden items-center gap-6 md:flex lg:gap-9" aria-label="Navigation principale">
                    {navItems.map((item) => (
                        <Link key={item.to} to={item.to} className="nav-lien t-label text-[0.6875rem] whitespace-nowrap">
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <AudioToggle />

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative h-10 w-10 border border-white/20 md:hidden"
                        aria-expanded={isMenuOpen}
                        aria-controls="menu-mobile"
                        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    >
                        <span className={`absolute left-2.5 right-2.5 h-0.5 bg-white transition-all duration-500 ease-expo ${isMenuOpen ? 'top-4.75 rotate-45' : 'top-3.5'}`}></span>
                        <span className={`absolute left-2.5 right-2.5 h-0.5 bg-white transition-all duration-500 ease-expo ${isMenuOpen ? 'top-4.75 -rotate-45' : 'top-6'}`}></span>
                    </button>
                </div>
            </div>

            <div
                id="menu-mobile"
                className={`absolute inset-x-0 top-full h-[calc(100dvh-var(--nav-h))] overflow-y-auto bg-nuit transition-[clip-path,visibility] duration-700 ease-expo md:hidden
                    ${isMenuOpen ? 'visible [clip-path:inset(0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'}`}
            >
                <nav className="wrap flex h-full flex-col justify-between py-10" aria-label="Navigation mobile">
                    <ul>
                        {navItems.map((item, i) => (
                            <li key={item.to} className="overflow-hidden border-b border-white/10">
                                <Link
                                    to={item.to}
                                    onClick={closeMenu}
                                    className={`t-display flex items-baseline justify-between py-4 text-6xl transition-transform duration-700 ease-expo
                                        ${path === item.to ? 'text-or' : 'text-white'}
                                        ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
                                    style={{ transitionDelay: isMenuOpen ? `${120 + i * 70}ms` : '0ms' }}
                                >
                                    {item.label}
                                    <span className="t-label text-white/40" aria-hidden="true">→</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="t-label text-white/40">Paris XVIe — BUT MMI 2026</p>
                </nav>
            </div>
        </header>
    );
}
