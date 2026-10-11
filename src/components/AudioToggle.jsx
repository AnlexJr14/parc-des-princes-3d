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
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
    };

    return (
        <button
            onClick={togglePlay}
            aria-pressed={isPlaying}
            className="group flex h-10 items-center gap-3 border border-white/20 px-3.5 text-white transition-colors duration-300 hover:border-or"
            title={isPlaying ? "Couper l'ambiance du stade" : "Activer l'ambiance du stade"}
        >
            <audio ref={audioRef} src="/ambiance-parc.mp3" loop preload="none" />

            <span className={`egaliseur flex h-3.5 items-end gap-0.75 ${isPlaying ? 'joue text-or' : 'text-white/70'}`} aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </span>

            <span className="t-label text-[0.625rem]">
                <span className="hidden lg:inline">Ambiance </span>
                <span className={isPlaying ? 'text-or' : 'text-white/60'}>{isPlaying ? 'On' : 'Off'}</span>
            </span>
        </button>
    );
}
