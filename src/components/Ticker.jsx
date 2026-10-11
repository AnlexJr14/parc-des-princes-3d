import { tickerData } from '../data';

export default function Ticker() {
    const items = [...tickerData, ...tickerData];

    return (
        <div className="bandeau overflow-hidden bg-rouge py-4 text-white" aria-hidden="true">
            <div className="bandeau__piste">
                {[0, 1].map((copy) => (
                    <ul key={copy} className="flex shrink-0 items-center">
                        {items.map((item, i) => (
                            <li key={i} className="t-display flex items-center text-3xl tracking-[0.02em] md:text-4xl">
                                {item}
                                <svg className="mx-7 h-4 w-5" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <ellipse cx="10" cy="8" rx="9" ry="6.5" />
                                    <path d="M10 1.5v13" />
                                </svg>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}
