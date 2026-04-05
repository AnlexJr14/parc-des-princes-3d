import '@google/model-viewer';

export default function Model3D({ data }) {
    return (
        <div className="w-full h-full min-h-[600px] overflow-hidden border-2 border-[#ceab5d]/30 bg-white relative flex items-center justify-center transition-colors duration-500">

            <model-viewer
                src="/parc-des-princes.glb"
                alt="Modèle 3D du Parc des Princes"
                camera-controls
                auto-rotate
                rotation-per-second="10deg"
                shadow-intensity="1.5"
                shadow-softness="1"
                environment-image="neutral"
                exposure="1.2"
                bounds="tight"
                camera-orbit="0deg 45deg auto"
                style={{ width: '100%', height: '100%', zIndex: 10, backgroundColor: 'transparent' }}
            >
                <button
                    className="Hotspot group relative w-6 h-6 border-2 border-white rounded-full cursor-pointer bg-[#DA291C] shadow-lg"
                    slot="hotspot-1"
                    data-position="0 10 0"
                    data-normal="0 1 0"
                >
                    <span className="absolute inset-0 rounded-full bg-[#DA291C] animate-ping opacity-40"></span>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-5 bg-[#004170] text-white text-sm rounded-none border-t-4 border-[#ceab5d] shadow-[0_20px_40px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-4 group-hover:translate-y-0">
                        <h4 className="font-bold text-[#ceab5d] uppercase tracking-widest mb-2 text-xs">
                            {data.hotspots[0].title}
                        </h4>
                        <p className="font-serif leading-relaxed opacity-90 italic">
                            {data.hotspots[0].text}
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
    );
}