import Link from '../router/Link';

export default function NextStep({ to, label, title }) {
    return (
        <Link to={to} className="group relative isolate block overflow-hidden bg-bleu text-white">
            <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-rouge transition-transform duration-700 ease-expo group-hover:scale-y-100 group-focus-visible:scale-y-100"></span>
            <span className="wrap flex items-end justify-between gap-8 py-16 md:py-24">
                <span>
                    <span className="t-label mb-5 flex items-center gap-4 text-or transition-colors duration-500 group-hover:text-white">
                        <span className="h-px w-12 bg-current"></span>
                        {label}
                    </span>
                    <span className="t-display block text-[clamp(3.25rem,10vw,10rem)]">{title}</span>
                </span>
                <span className="t-display shrink-0 text-[clamp(3.25rem,10vw,10rem)] transition-transform duration-700 ease-expo group-hover:translate-x-4" aria-hidden="true">
                    →
                </span>
            </span>
        </Link>
    );
}
