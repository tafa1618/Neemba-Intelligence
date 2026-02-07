import { TrendingUp, Target, Award, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { competitors } from '../data/competitors';
import { opportunities } from '../data/opportunities';

export default function Competitors() {
    const neemba = competitors.find(c => c.name === 'Neemba Cat')!;
    const rivals = competitors.filter(c => c.name !== 'Neemba Cat');

    // Competitive insights
    const competitiveProjects = opportunities.filter(o => o.competitors.length > 0);
    const smtProjects = opportunities.filter(o => o.competitors.includes('SMT')).length;
    const biaProjects = opportunities.filter(o => o.competitors.includes('Bia')).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Intelligence Concurrentielle</h1>
                <p className="text-slate-400">Analyse de SMT (Komatsu) et Bia (Volvo) - Secteur Construction Sénégal</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass rounded-2xl p-6 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30">
                    <div className="flex items-center justify-between mb-3">
                        <Award className="text-yellow-400" size={32} />
                        <TrendingUp className="text-green-400" size={24} />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Votre Position</h3>
                    <p className="text-4xl font-bold text-white mb-1">#1</p>
                    <p className="text-yellow-300 text-sm">{neemba.marketShare}% Part de marché</p>
                </div>

                <div className="glass rounded-2xl p-6 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30">
                    <div className="flex items-center justify-between mb-3">
                        <Target className="text-red-400" size={32} />
                        <span className="text-white font-bold text-2xl">{smtProjects}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">SMT (Komatsu)</h3>
                    <p className="text-slate-300 text-sm">Projets en compétition</p>
                </div>

                <div className="glass rounded-2xl p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                    <div className="flex items-center justify-between mb-3">
                        <Target className="text-blue-400" size={32} />
                        <span className="text-white font-bold text-2xl">{biaProjects}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Bia (Volvo)</h3>
                    <p className="text-slate-300 text-sm">Projets en compétition</p>
                </div>
            </div>

            {/* Competitor Profiles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rivals.map((competitor) => (
                    <div key={competitor.id} className="glass rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{competitor.name}</h2>
                                <p className="text-slate-400">{competitor.brand}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-white">{competitor.marketShare}%</p>
                                <p className="text-slate-400 text-sm">Part de marché</p>
                            </div>
                        </div>

                        {/* Recent Performance */}
                        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">Victoires récentes</span>
                                <span className="text-white font-bold text-xl">{competitor.recentWins}</span>
                            </div>
                        </div>

                        {/* Strengths */}
                        <div className="mb-4">
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <CheckCircle2 className="text-green-400 mr-2" size={18} />
                                Forces
                            </h3>
                            <div className="space-y-2">
                                {competitor.strengths.map((strength, idx) => (
                                    <div key={idx} className="flex items-start text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 mr-2 flex-shrink-0"></div>
                                        <p className="text-slate-300">{strength}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Weaknesses */}
                        <div>
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <AlertTriangle className="text-orange-400 mr-2" size={18} />
                                Faiblesses
                            </h3>
                            <div className="space-y-2">
                                {competitor.weaknesses.map((weakness, idx) => (
                                    <div key={idx} className="flex items-start text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-2 flex-shrink-0"></div>
                                        <p className="text-slate-300">{weakness}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Competitive Opportunities */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Projets en Compétition</h2>
                <div className="space-y-3">
                    {competitiveProjects.slice(0, 6).map((opp) => (
                        <div key={opp.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <div className="flex-1">
                                <h4 className="text-white font-medium">{opp.client}</h4>
                                <p className="text-slate-400 text-sm mt-1">{opp.title}</p>
                            </div>
                            <div className="flex items-center space-x-4 ml-4">
                                <div className="text-right">
                                    <p className="text-caterpillar-yellow font-bold">{(opp.value / 1000000).toFixed(0)}M</p>
                                    <p className="text-slate-400 text-xs">CFA</p>
                                </div>
                                <div className="flex space-x-1">
                                    {opp.competitors.map((comp, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-2 py-1 rounded text-xs font-medium ${comp === 'SMT' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
                                                }`}
                                        >
                                            {comp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
