import { useEffect, useRef } from 'react';

export default function useScrollFrame(callback) {
    const saved = useRef(callback);

    useEffect(() => {
        saved.current = callback;
    });

    useEffect(() => {
        let frame = 0;
        const run = () => {
            frame = 0;
            saved.current();
        };
        const request = () => {
            if (!frame) frame = requestAnimationFrame(run);
        };

        run();
        window.addEventListener('scroll', request, { passive: true });
        window.addEventListener('resize', request);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', request);
            window.removeEventListener('resize', request);
        };
    }, []);
}
