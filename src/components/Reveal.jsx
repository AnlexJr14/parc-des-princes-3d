import useInView from '../hooks/useInView';

export default function Reveal({ as = 'div', variant = 'reveal', delay = 0, className = '', style, children, ...props }) {
    const Tag = as;
    const [ref, inView] = useInView();

    return (
        <Tag
            ref={ref}
            className={`${variant} ${inView ? 'is-in' : ''} ${className}`}
            style={{ '--d': `${delay}ms`, ...style }}
            {...props}
        >
            {children}
        </Tag>
    );
}
