export default function Article({ data, setView }) {
    return (
        <article className="max-w-4xl mx-auto bg-[#001C3F] p-8 md:p-16 rounded-3xl border border-[#D4AF37]/30 shadow-2xl relative">

            <header className="mb-12 text-center border-b border-[#D4AF37]/20 pb-8">
                <h2 className="text-sm font-bold text-[#E30613] tracking-[0.3em] uppercase mb-4">
                    {data.subtitle}
                </h2>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6 font-serif uppercase">
                    {data.title}
                </h1>

                <div className="flex flex-col items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
                    <span className="text-[#D4AF37] font-bold">
                        Par <button
                            onClick={() => {
                                setView('creators');
                                setTimeout(() => document.getElementById('axel')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }}
                            className="hover:text-white transition-colors"
                        >Axel Treffault</button> et <button
                            onClick={() => {
                                setView('creators');
                                setTimeout(() => document.getElementById('timeo')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }}
                            className="hover:text-white transition-colors"
                        >Timéo Da Costa</button>
                    </span>
                    <span>{data.date}</span>
                </div>
            </header>

            <div className="space-y-10 text-lg md:text-xl text-gray-300 leading-relaxed font-serif">

                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                    {data.content[0]}
                </p>

                <div className="my-10 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-lg bg-black h-[400px] flex items-center justify-center">
                    <img src="/photo1.jpg" alt="Le Parc des Princes" className="w-full h-full object-cover opacity-80" />
                </div>

                <p className="text-justify">
                    {data.content[1]}
                </p>

                <div className="my-10 rounded-2xl overflow-hidden border-2 border-[#E30613]/50 shadow-lg bg-black h-[400px] flex items-center justify-center">
                    <img src="/photo2.jpg" alt="Architecture brute" className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="border-l-4 border-[#E30613] pl-6 py-2 my-10">
                    <p className="italic text-white">
                        {data.content[2]}
                    </p>
                </div>

            </div>
        </article>
    );
}