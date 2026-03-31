import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Model3D from './components/Model3D';
import Map from './components/Map';
import Article from './components/Article';
import Creators from './components/Creators';
import { articleData, creatorsData } from './data';

function App() {
  const [view, setView] = useState('map');

  return (
    <div className="min-h-screen bg-[#0a0f18] text-white font-sans flex flex-col">

      <Navbar currentView={view} setView={setView} />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">

        {view === 'map' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-black text-center mb-8 uppercase tracking-widest text-[#D4AF37]">
              Localisez le monument
            </h2>
            <Map onMarkerClick={() => setView('3d')} />
          </div>
        )}

        {view === '3d' && (
          <div className="animate-fadeIn w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black uppercase tracking-widest text-[#D4AF37]">
                Exploration 3D
              </h2>
              <button onClick={() => setView('article')} className="text-sm font-bold text-[#E30613] hover:text-white underline">
                Lire l'article complet →
              </button>
            </div>
            <div className="h-[700px] w-full">
              <Model3D data={articleData} />
            </div>
          </div>
        )}

        {view === 'article' && (
          <div className="animate-fadeIn">
            <Article data={articleData} setView={setView} />
          </div>
        )}

        {view === 'creators' && (
          <Creators data={creatorsData} />
        )}

      </main>

      <Footer setView={setView} />

    </div>
  );
}

export default App;