import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Router from './router/Router';
import { ROUTES, useRouter } from './router/context';
import Home from './pages/Home';
import Modele from './pages/Modele';
import Histoire from './pages/Histoire';
import Equipe from './pages/Equipe';

const pages = {
  [ROUTES.home]: Home,
  [ROUTES.modele]: Modele,
  [ROUTES.histoire]: Histoire,
  [ROUTES.equipe]: Equipe,
};

function Page() {
  const { path } = useRouter();
  const Current = pages[path];
  return <Current key={path} />;
}

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <a href="#contenu" className="btn sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100">
          Aller au contenu
        </a>

        <Navbar />

        <main id="contenu" className="grow">
          <Page />
        </main>

        <Footer />

        <Analytics />
      </div>
    </Router>
  );
}
