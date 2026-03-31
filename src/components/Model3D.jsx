import '@google/model-viewer';

export default function Model3D({ data }) {
    return (
        <div className="w-full h-[600px] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] bg-[#060a12] relative flex items-center justify-center">

            <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37] font-mono animate-pulse z-0 pointer-events-none">
                CHARGEMENT DU Stade...
            </div>

            <model-viewer
                src="/parc-des-princes.glb"
                alt="Modèle 3D du Parc des Princes"
                camera-controls
                auto-rotate
                rotation-per-second="10deg"
                shadow-intensity="2"
                environment-image="neutral"
                exposure="1"
                bounds="tight"
                camera-orbit="0deg 45deg auto"
                style={{ width: '100%', height: '100%', zIndex: 10 }}
            >
                <button
                    className="Hotspot group relative w-5 h-5 border-2 border-white rounded-full cursor-pointer bg-[#E30613]"
                    slot="hotspot-1"
                    data-position="0 10 0"
                    data-normal="0 1 0"
                >
                    <span className="absolute inset-0 rounded-full bg-[#E30613] animate-ping opacity-75"></span>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 p-4 bg-[#001C3F] text-white text-sm rounded-lg border border-[#D4AF37] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <h4 className="font-bold text-[#D4AF37] mb-1">{data.hotspots[0].title}</h4>
                        {data.hotspots[0].text}
                    </div>
                </button>
            </model-viewer>
        </div>
    );
}