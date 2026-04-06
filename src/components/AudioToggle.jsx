import { useState, useRef, useEffect } from 'react';

export default function AudioToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.15; 
        }
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            onClick={togglePlay}
            className="fixed top-6 right-6 z-9999 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 border-2 border-transparent hover:border-[#ceab5d] transition-all duration-300 shadow-sm group"
            title="Activer l'ambiance du stade"
        >
            <audio ref={audioRef} src="/ambiance-parc.mp3" loop />

            <div className="flex items-end gap-[2px] h-3 w-3">
                <div className={`w-1/3 bg-[#004170] transition-all duration-200 ${isPlaying ? 'h-full animate-pulse' : 'h-1'}`}></div>
                <div className={`w-1/3 bg-[#DA291C] transition-all duration-200 delay-75 ${isPlaying ? 'h-2/3 animate-pulse' : 'h-1'}`}></div>
                <div className={`w-1/3 bg-[#004170] transition-all duration-200 delay-150 ${isPlaying ? 'h-full animate-pulse' : 'h-1'}`}></div>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-widest text-[#004170] font-bold group-hover:text-[#DA291C] transition-colors">
                {isPlaying ? 'Ambiance ON' : 'Ambiance OFF'}
            </span>
        </button>
    );
}