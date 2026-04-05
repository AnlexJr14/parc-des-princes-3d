import Map from './Map';
import Model3D from './Model3D';
import Article from './Article';
import Creators from './Creators';

export default function MainContent({ view, setView, articleData, creatorsData }) {
  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 w-full transition-all duration-500">
      
      {view === 'map' && (
        <section className="animate-slideUpFade space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-white p-12 border border-black/5 shadow-sm">
            <div className="col-span-2">
              <span className="text-[#DA291C] font-mono tracking-[0.4em] text-xs uppercase mb-3 block font-bold">Localisation Stratégique</span>
              <h2 className="text-6xl md:text-8xl font-light text-[#004170] tracking-tighter leading-none uppercase">
                Le Parc <span className="font-bold">des</span><br/> Princes
              </h2>
            </div>
            <div className="border-l-4 border-[#ceab5d] pl-8 py-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                Naviguez à travers l'histoire architecturale de Paris. Sélectionnez le marqueur pour une immersion totale.
              </p>
            </div>
          </div>
          
          <div className="premium-card p-3">
            <Map onMarkerClick={() => setView('3d')} />
          </div>
        </section>
      )}

      {view === '3d' && (
        <section className="animate-slideUpFade space-y-12">
          <div className="bg-white p-10 flex flex-col md:flex-row justify-between items-start gap-6 border border-black/5 shadow-sm">
            <div>
              <span className="text-gray-400 font-mono tracking-widest text-xs uppercase block mb-2">Perspective Numérique</span>
              <h2 className="text-5xl font-bold text-[#004170] uppercase tracking-tight italic">Architecture</h2>
            </div>
            <button 
              onClick={() => setView('article')}
              className="px-10 py-4 border-2 border-[#ceab5d] text-[#ceab5d] font-mono text-sm uppercase tracking-widest hover:bg-[#ceab5d] hover:text-white transition-all font-bold group"
            >
              L'Histoire <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
            </button>
          </div>
          
          <div className="premium-card h-[750px] p-2">
            <Model3D data={articleData} />
          </div>
        </section>
      )}

      {(view === 'article' || view === 'creators') && (
        <div className="animate-slideUpFade py-6">
          {view === 'article' && <Article data={articleData} setView={setView} />}
          {view === 'creators' && <Creators data={creatorsData} setView={setView} />}
        </div>
      )}

    </div>
  );
}