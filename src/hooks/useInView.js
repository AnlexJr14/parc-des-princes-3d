import { useEffect, useRef, useState } from 'react';

export default function useInView({ once = true, rootMargin = '0px 0px -12% 0px', threshold = 0 } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setInView(false);
                }
            },
            { rootMargin, threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [once, rootMargin, threshold]);

    return [ref, inView];
}
