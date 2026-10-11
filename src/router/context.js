import { createContext, useContext } from 'react';

export const ROUTES = {
    home: '/',
    modele: '/modele-3d',
    histoire: '/histoire',
    equipe: '/equipe',
};

export const RouterContext = createContext({ path: ROUTES.home, navigate: () => {} });

export const useRouter = () => useContext(RouterContext);

export const normalize = (pathname) => {
    const path = pathname.replace(/\/+$/, '') || '/';
    return Object.values(ROUTES).includes(path) ? path : ROUTES.home;
};
