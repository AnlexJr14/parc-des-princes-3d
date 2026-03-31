export default function Creators({ data }) {
    const getIcon = (type) => {
        if (type === 'linkedin') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
        if (type === 'globe') return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>;
        if (type === 'envelope') return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    };

    return (
        <div className="max-w-5xl mx-auto animate-fadeIn">

            <section className="text-center mb-16 bg-[#001C3F] p-8 md:p-12 rounded-3xl border border-[#D4AF37]/20 shadow-xl">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-serif mb-6">
                    Qui sommes-nous ?
                </h1>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                    Derrière ce projet de modélisation se cachent deux étudiants en 2ème année de BUT MMI.
                    Alliant compétences techniques, design 3D et développement web, nous avons uni nos forces pour essayer de recréer virtuellement le Parc des Princes.
                </p>
            </section>

            <div className="space-y-12">
                {data.map((creator) => (
                    <section
                        key={creator.id}
                        id={creator.id}
                        className="bg-[#001C3F] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row group"
                    >
                        <div className="md:w-1/3 bg-black/40 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#D4AF37]/20 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#E30613]"></div>

                            <div className="w-40 h-40 rounded-full border-4 border-[#D4AF37] overflow-hidden mb-6 shadow-xl group-hover:scale-105 transition-transform duration-500">
                                <img
                                    src={creator.image}
                                    alt={creator.name}
                                    className="w-full h-full object-cover object-top transition-all duration-500" 
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>

                            <div className="flex gap-4">
                                {creator.socials.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-[#001C3F] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center hover:bg-[#E30613] hover:text-white hover:border-[#E30613] transition-all duration-300"
                                    >
                                        {getIcon(social.icon)}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="md:w-2/3 p-8 md:p-10 relative">

                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E30613]/5 rounded-bl-full pointer-events-none"></div>

                            <span className="inline-block px-3 py-1 bg-[#E30613] text-white text-xs font-bold uppercase tracking-widest rounded mb-4">
                                Co-réalisateur
                            </span>

                            <h2 className="text-3xl font-black text-white uppercase mb-2">
                                {creator.name}
                            </h2>
                            <h3 className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">
                                {creator.role}
                            </h3>

                            <p className="text-gray-300 leading-relaxed mb-8 text-justify">
                                {creator.bio}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-black/20 p-6 rounded-xl border border-gray-800">
                                {Object.entries(creator.details).map(([key, value], idx) => (
                                    <div key={idx}>
                                        <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">{key}</h4>
                                        <p className="text-gray-200 text-sm">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}