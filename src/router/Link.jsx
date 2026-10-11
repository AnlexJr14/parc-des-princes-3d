import { useRouter } from './context';

export default function Link({ to, hash, onClick, children, ...props }) {
    const { path, navigate } = useRouter();

    const handleClick = (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to, hash);
    };

    return (
        <a
            href={hash ? `${to}#${hash}` : to}
            aria-current={path === to && !hash ? 'page' : undefined}
            onClick={handleClick}
            {...props}
        >
            {children}
        </a>
    );
}
