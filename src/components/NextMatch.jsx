import { useState, useEffect } from 'react';
import Reveal from './Reveal';
import { scheduleData } from '../data';

const formatNumber = (num) => num.toString().padStart(2, '0');

const fallbackMatch = (now) => {
    const fallbackDate = new Date(now);
    fallbackDate.setDate(fallbackDate.getDate() + 30);
    fallbackDate.setHours(21, 0, 0, 0);

    return {
        date: fallbackDate.toISOString(),
        league: { name: "Ligue 1" },
        teams: {
            home: scheduleData[0].teams.home,
            away: { name: "À définir", logo: "" }
        },
        isFake: true
    };
};

function Crest({ team, size = 'lg' }) {
    const [failed, setFailed] = useState(false);
    const box = size === 'lg' ? 'h-24 w-24 p-4 md:h-32 md:w-32 md:p-6' : 'h-9 w-9 p-1.5';

    return (
        <span className={`flex shrink-0 items-center justify-center rounded-full bg-white ${box}`}>
            {team.logo && !failed ? (
                <img
                    src={team.logo}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-contain"
                />
            ) : (
                <span className={`t-display text-bleu ${size === 'lg' ? 'text-4xl' : 'text-sm'}`}>
                    {team.logo ? team.name.slice(0, 2) : '?'}
                </span>
            )}
        </span>
    );
}

export default function NextMatch() {
    const [now, setNow] = useState(() => Date.now());
    const [fallback] = useState(() => fallbackMatch(Date.now()));
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const upcoming = scheduleData.filter((match) => new Date(match.date) > now);
    const matchData = upcoming[0] ?? fallback;
    const otherMatches = upcoming.slice(1);

    const difference = Math.max(new Date(matchData.date) - now, 0);
    const timeLeft = {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60)
    };

    return (
        <section className="relative isolate overflow-hidden bg-nuit text-white" id="prochain-match">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,var(--color-bleu),transparent_75%)]"></div>

            <div className="wrap py-20 md:py-28">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <Reveal as="p" className="t-label mb-6 flex items-center gap-4 text-or">
                            Jour de match
                        </Reveal>
                        <Reveal as="h2" variant="" className="t-display text-6xl md:text-7xl xl:text-8xl">
                            <span className="masque"><span>Prochaine rencontre</span></span>
                            <span className="masque" style={{ '--d': '100ms' }}><span>au Parc des Princes</span></span>
                        </Reveal>
                    </div>
                    <Reveal delay={200}>
                        <span className="t-label inline-block bg-rouge px-3 py-1.5 text-[0.625rem] font-semibold text-white">
                            {matchData.league?.name || "Ligue"}
                        </span>
                    </Reveal>
                </div>

                <Reveal delay={150} className="mt-14 border border-white/15 bg-white/3">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-10 md:px-12 md:py-14">
                        <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-end md:text-right">
                            <span className="t-display order-2 text-3xl md:order-1 md:text-5xl">{matchData.teams.home.name}</span>
                            <span className="order-1 rounded-full ring-2 ring-or ring-offset-4 ring-offset-nuit md:order-2">
                                <Crest team={matchData.teams.home} />
                            </span>
                        </div>

                        <span className="t-display px-2 text-4xl text-white/30 md:px-8 md:text-6xl">VS</span>

                        <div className="flex flex-col items-center gap-5 text-center md:flex-row md:text-left">
                            <span className="rounded-full ring-2 ring-white/25 ring-offset-4 ring-offset-nuit">
                                <Crest team={matchData.teams.away} />
                            </span>
                            <span className="t-display text-3xl md:text-5xl">{matchData.teams.away.name || "À définir"}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 border-y border-white/15" role="timer" aria-label="Compte à rebours avant le coup d'envoi">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="flex flex-col items-center border-l border-white/15 py-8 first:border-l-0 md:py-10">
                                <span className="t-display overflow-hidden text-6xl text-or tabular-nums md:text-8xl xl:text-9xl">
                                    <span key={value} className="chiffre">{formatNumber(value)}</span>
                                </span>
                                <span className="t-label mt-4 text-[0.625rem] text-white/55">{unit}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:px-12">
                        <p className="t-label text-center text-[0.625rem] leading-relaxed text-white/55 md:text-left">
                            {matchData.isFake
                                ? "Prochaine date à confirmer prochainement"
                                : `Match prévu le ${new Date(matchData.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`
                            }
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            {otherMatches.length > 0 && (
                                <button onClick={() => setShowAll(!showAll)} aria-expanded={showAll} className="btn btn-contour" style={{ '--btn-fg-hover': 'var(--color-bleu)' }}>
                                    {showAll ? "Fermer le calendrier" : "Voir les prochains matchs"}
                                </button>
                            )}
                            <a href="https://billetterie.psg.fr" target="_blank" rel="noopener noreferrer" className="btn">
                                Accéder à la billetterie <span className="fleche" aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>

                    <div className={`repli ${showAll ? 'ouvert' : ''}`} inert={!showAll}>
                        <div>
                            <div className="border-t border-white/15 px-4 py-10 md:px-12">
                                <h3 className="t-label mb-8 text-white/55">Calendrier à venir</h3>
                                <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                                    {otherMatches.map((match) => (
                                        <li key={match.date} className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 transition-colors duration-300 hover:border-or">
                                            <div className="flex items-center gap-4">
                                                <Crest team={match.teams.away} size="sm" />
                                                <div>
                                                    <p className="t-display text-2xl">
                                                        <span className="text-white/40">vs</span> {match.teams.away.name}
                                                    </p>
                                                    <p className="t-label mt-1 text-[0.5625rem] text-white/45">{match.league?.name}</p>
                                                </div>
                                            </div>
                                            <p className="t-label text-right text-[0.625rem] leading-relaxed text-or">
                                                {new Date(match.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                <span className="block text-white/45">
                                                    {new Date(match.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
