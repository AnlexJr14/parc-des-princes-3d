import { useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { RouterContext, normalize } from './context';

const scrollToHash = (hash) => {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Router({ children }) {
    const [path, setPath] = useState(() => normalize(window.location.pathname));

    useEffect(() => {
        const onPop = () => setPath(normalize(window.location.pathname));
        window.addEventListener('popstate', onPop);

        const hash = window.location.hash.slice(1);
        if (hash) requestAnimationFrame(() => scrollToHash(hash));

        return () => window.removeEventListener('popstate', onPop);
    }, []);

    const navigate = useCallback((to, hash) => {
        if (to === normalize(window.location.pathname)) {
            if (hash) scrollToHash(hash);
            else window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const update = () => {
            window.history.pushState(null, '', hash ? `${to}#${hash}` : to);
            setPath(to);
        };
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!document.startViewTransition || reduced) {
            update();
            window.scrollTo(0, 0);
            if (hash) requestAnimationFrame(() => scrollToHash(hash));
            return;
        }

        const transition = document.startViewTransition(() => {
            flushSync(update);
            window.scrollTo(0, 0);
        });
        if (hash) transition.finished.then(() => scrollToHash(hash));
    }, []);

    const value = useMemo(() => ({ path, navigate }), [path, navigate]);

    return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
