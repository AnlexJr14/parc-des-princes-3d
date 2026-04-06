import { useState, useEffect } from 'react';

export default function NextMatch() {
    const [matchData, setMatchData] = useState(null);
    const [otherMatches, setOtherMatches] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ jours: 0, heures: 0, min: 0, sec: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [showAll, setShowAll] = useState(false); 
    
    const fetchMockAPI = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const now = new Date();
                
                const schedule = [
                    {
                        date: "2026-04-08T21:00:00",
                        league: { name: "Ligue des Champions" },
                        teams: {
                            home: { name: "Paris SG", logo: "https://media.api-sports.io/football/teams/85.png" },
                            away: { name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }
                        }
                    },
                    {
                        date: "2026-04-19T20:45:00",
                        league: { name: "Ligue 1" },
                        teams: {
                            home: { name: "Paris SG", logo: "https://media.api-sports.io/football/teams/85.png" },
                            away: { name: "Lyon", logo: "https://media.api-sports.io/football/teams/80.png" }
                        }
                    },
                    {
                        date: "2026-04-22T19:00:00",
                        league: { name: "Ligue 1" },
                        teams: {
                            home: { name: "Paris SG", logo: "https://media.api-sports.io/football/teams/85.png" },
                            away: { name: "FC Nantes", logo: "https://media.api-sports.io/football/teams/83.png" }
                        }
                    },
                    {
                        date: "2026-05-03T21:00:00",
                        league: { name: "Ligue 1" },
                        teams: {
                            home: { name: "Paris SG", logo: "https://media.api-sports.io/football/teams/85.png" },
                            away: { name: "Lorient", logo: "https://media.api-sports.io/football/teams/97.png" }
                        }
                    },
                    {
                        date: "2026-05-09T21:00:00",
                        league: { name: "Ligue 1" },
                        teams: {
                            home: { name: "Paris SG", logo: "https://media.api-sports.io/football/teams/85.png" },
                            away: { name: "Brest", logo: "https://media.api-sports.io/football/teams/106.png" }
                        }
                    }
                ];

                const next = schedule.find(match => new Date(match.date) > now);
                const others = schedule.filter(match => match !== next && new Date(match.date) > now);

                resolve({ next, others });
            }, 1200); 
        });
    };

    useEffect(() => {
        fetchMockAPI().then((data) => {
            setMatchData(data.next);
            setOtherMatches(data.others);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!matchData) return;

        const matchDate = new Date(matchData.date);

        const timer = setInterval(() => {
            const difference = matchDate - new Date();

            if (difference > 0) {
                setTimeLeft({
                    jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    min: Math.floor((difference / 1000 / 60) % 60),
                    sec: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ jours: 0, heures: 0, min: 0, sec: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [matchData]);

    const formatNumber = (num) => num.toString().padStart(2, '0');

    if (isLoading) {
        return (
            <div className="w-full max-w-[1200px] mx-auto my-24 p-12 bg-white border-2 border-[#ceab5d] shadow-xl flex justify-center items-center h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004170]"></div>
            </div>
        );
    }

    return (
        <section className="w-full max-w-[1200px] mx-auto my-24 px-6 relative isolate animate-slideUpFade">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-black/10 -z-10"></div>

            <div className="bg-white border-2 border-[#ceab5d] shadow-2xl p-8 md:p-12 relative transition-all duration-500">
                
                <div className="text-center mb-10">
                    <span className="text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold bg-[#DA291C]">
                        {matchData.league.name}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#004170] uppercase tracking-tight italic mt-6">
                        Prochaine Rencontre au Parc des Princes
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-[#ceab5d] shadow-lg mb-4 p-4">
                            <img src={matchData.teams.home.logo} alt={matchData.teams.home.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-mono text-sm uppercase tracking-widest font-bold text-[#1A1A1A] text-center w-32 truncate">
                            {matchData.teams.home.name}
                        </span>
                    </div>

                    <div className="text-4xl font-light text-gray-300 italic">VS</div>

                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-gray-200 shadow-lg mb-4 p-4">
                            <img src={matchData.teams.away.logo} alt={matchData.teams.away.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-mono text-sm uppercase tracking-widest font-bold text-gray-500 text-center w-32 truncate">
                            {matchData.teams.away.name}
                        </span>
                    </div>
                </div>

                <div className="bg-[#f8f8f8] border border-black/5 p-6 flex justify-center gap-4 md:gap-8 mb-10">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
                            <span className="text-3xl md:text-5xl font-light tracking-tighter text-[#004170]">
                                {formatNumber(value)}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#DA291C] font-bold mt-2">
                                {unit}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <a href="https://billetterie.psg.fr" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#004170] text-white px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#ceab5d] transition-all duration-300 shadow-md">
                            Accéder à la billetterie
                        </a>
                        
                        <button 
                            onClick={() => setShowAll(!showAll)}
                            className="inline-block border-2 border-[#004170] text-[#004170] px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-gray-50 transition-all duration-300 shadow-md"
                        >
                            {showAll ? "Fermer le calendrier" : "Voir les prochains matchs"}
                        </button>
                    </div>

                    <p className="text-[10px] font-serif italic text-gray-400 uppercase tracking-widest">
                        Match prévu le {new Date(matchData.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                {showAll && (
                    <div className="mt-12 pt-12 border-t border-gray-100 animate-slideUpFade">
                        <h3 className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-8">
                            Calendrier à venir
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {otherMatches.map((match, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-[#f8f8f8] hover:bg-[#004170]/5 transition-colors border-l-4 border-[#ceab5d]">
                                    <div className="flex items-center gap-4">
                                        
                                        <div className="flex -space-x-2 relative z-0">
                                            <img 
                                                src={match.teams.home.logo} 
                                                className="w-7 h-7 object-contain bg-white rounded-full p-1 shadow-md relative z-10 border border-gray-50" 
                                                alt="PSG" 
                                            />
                                            <img 
                                                src={match.teams.away.logo} 
                                                className="w-7 h-7 object-contain bg-white rounded-full p-1 shadow-sm relative z-0 translate-x-1" 
                                                alt="Adversaire" 
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-[#004170] uppercase tracking-tight">
                                                vs {match.teams.away.name}
                                            </span>
                                            <span className="text-[9px] text-gray-400 font-mono italic">
                                                {match.league.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right flex flex-col">
                                        <span className="text-[10px] font-mono text-[#DA291C] font-bold">
                                            {new Date(match.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                        </span>
                                        <span className="text-[8px] text-gray-400 uppercase font-mono">
                                            {new Date(match.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}