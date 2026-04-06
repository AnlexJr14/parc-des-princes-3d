import '@google/model-viewer';

export default function Model3D({ data }) {
    return (
        <div className="flex flex-col gap-12 pb-12 w-full">

            <div className="w-full h-[600px] rounded-3xl overflow-hidden border-4 border-[#ceab5d] bg-white relative flex items-center justify-center shadow-2xl isolate transition-colors duration-500">

                <model-viewer
                    src="/parc-des-princes.glb"
                    alt="Modèle 3D du Parc des Princes"
                    camera-controls
                    shadow-intensity="1.5"
                    shadow-softness="1"
                    skybox-image="/street-view-paris.hdr"
                    environment-image="/street-view-paris.hdr"
                    exposure="1.2"
                    bounds="tight"
                    camera-orbit="0deg 45deg auto"
                    max-camera-orbit="auto 85deg auto"
                    style={{ width: '100%', height: '100%', zIndex: 10, backgroundColor: 'transparent' }}
                >
                    <button
                        className="Hotspot group relative w-6 h-6 border-2 border-white rounded-full cursor-pointer bg-[#DA291C] shadow-lg"
                        slot="hotspot-1"
                        data-position="-2 7 0"
                        data-normal="0 2 0"
                    >
                        <span className="absolute inset-0 rounded-full bg-[#DA291C] animate-ping opacity-40"></span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-5 bg-[#004170] text-white text-sm rounded-none border-t-4 border-[#ceab5d] shadow-[0_20px_40px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-4 group-hover:translate-y-0 z-50">
                            <h4 className="font-bold text-[#ceab5d] uppercase tracking-widest mb-2 text-xs">
                                {data.hotspots[0].title}
                            </h4>
                            <p className="font-serif leading-relaxed opacity-90 italic">
                                {data.hotspots[0].text}
                            </p>
                        </div>
                    </button>

                    <button
                        className="Hotspot group relative w-6 h-6 border-2 border-white rounded-full cursor-pointer bg-[#DA291C] shadow-lg"
                        slot="hotspot-2"
                        data-position="10 7 0"
                        data-normal="1 0 0"
                    >
                        <span className="absolute inset-0 rounded-full bg-[#DA291C] animate-ping opacity-40"></span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-5 bg-[#004170] text-white text-sm rounded-none border-t-4 border-[#ceab5d] shadow-[0_20px_40px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-4 group-hover:translate-y-0 z-50">
                            <h4 className="font-bold text-[#ceab5d] uppercase tracking-widest mb-2 text-xs">
                                {data.hotspots[1].title}
                            </h4>
                            <p className="font-serif leading-relaxed opacity-90 italic">
                                {data.hotspots[1].text}
                            </p>
                        </div>
                    </button>
                </model-viewer>

                <div className="absolute top-6 left-6 z-20 pointer-events-none">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-12 bg-[#DA291C]"></div>
                        <div>
                            <p className="text-[10px] font-mono text-[#004170] uppercase tracking-widest font-bold">Vue Perspective</p>
                            <p className="text-xs font-serif italic text-gray-400">Rendu 3D temps réel</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 mt-4">
                <div className="flex items-center gap-4 px-2">
                    <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-[#004170] font-bold">L'Anatomie du Stade</h3>
                    <div className="h-px bg-black/10 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#f8f8f8] border-t-4 border-[#004170] p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                        <h4 className="font-bold text-[#004170] uppercase tracking-widest mb-3 text-sm">Virage Auteuil</h4>
                        <p className="text-sm text-gray-600 font-serif italic leading-relaxed">
                            Historiquement le cœur bouillant des supporters parisiens, situé à l'Ouest. Il est réputé pour ses tifos spectaculaires et son ambiance électrique.
                        </p>
                    </div>

                    <div className="bg-[#f8f8f8] border-t-4 border-[#ceab5d] p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                        <h4 className="font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 text-sm">Tribune Paris</h4>
                        <p className="text-sm text-gray-600 font-serif italic leading-relaxed">
                            La grande tribune latérale qui fait face aux caméras de télévision. Elle offre une vue panoramique et rassemble un public familial.
                        </p>
                    </div>

                    <div className="bg-[#f8f8f8] border-t-4 border-[#ceab5d] p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                        <h4 className="font-bold text-[#ceab5d] uppercase tracking-widest mb-3 text-sm">Tribune Borelli</h4>
                        <p className="text-sm text-gray-600 font-serif italic leading-relaxed">
                            L'ex-tribune Présidentielle. Elle abrite les loges VIP, les bancs de touche, le tunnel des joueurs et la corbeille présidentielle.
                        </p>
                    </div>

                    <div className="bg-[#f8f8f8] border-t-4 border-[#DA291C] p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                        <h4 className="font-bold text-[#DA291C] uppercase tracking-widest mb-3 text-sm">Kop of Boulogne</h4>
                        <p className="text-sm text-gray-600 font-serif italic leading-relaxed">
                            Le berceau historique du supportérisme au Parc. Situé à l'Est, il fait face à Auteuil pour créer des chants en écho mythiques.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}