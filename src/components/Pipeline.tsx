import { Calendar, DollarSign, MapPin, Users } from 'lucide-react';
import { opportunities } from '../data/opportunities';
import { Opportunity } from '../types';

const statusColumns = {
    nouveau: { label: 'Nouveau', color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30' },
    qualifie: { label: 'Qualifié', color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30' },
    preparation: { label: 'En Préparation', color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30' },
    soumis: { label: 'Soumis', color: 'from-green-500/20 to-green-600/20 border-green-500/30' },
};

export default function Pipeline() {
    const columns = Object.entries(statusColumns);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Pipeline d'Opportunités</h1>
                <p className="text-slate-400">Suivi des projets en cours secteur Construction - Sénégal</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {columns.map(([status, config]) => {
                    const count = opportunities.filter(o => o.status === status).length;
                    const value = opportunities
                        .filter(o => o.status === status)
                        .reduce((sum, o) => sum + o.value, 0);

                    return (
                        <div key={status} className={`glass rounded-xl p-4 bg-gradient-to-br ${config.color} border`}>
                            <h3 className="text-white font-semibold mb-1">{config.label}</h3>
                            <p className="text-2xl font-bold text-white">{count}</p>
                            <p className="text-sm text-slate-300">{(value / 1000000).toFixed(0)}M CFA</p>
                        </div>
                    );
                })}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {columns.map(([status, config]) => (
                    <div key={status} className="space-y-4">
                        <div className={`glass rounded-xl p-3 bg-gradient-to-r ${config.color} border`}>
                            <h3 className="text-white font-semibold text-center">{config.label}</h3>
                        </div>

                        <div className="space-y-3">
                            {opportunities
                                .filter(o => o.status === status)
                                .map(opp => (
                                    <OpportunityCard key={opp.id} opportunity={opp} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
    return (
        <div className="glass rounded-xl p-4 hover:bg-slate-700/30 transition-all cursor-pointer border border-slate-700 hover:border-slate-600">
            <div className="mb-3">
                <h4 className="text-white font-semibold text-sm mb-1">{opportunity.client}</h4>
                <p className="text-slate-300 text-xs leading-tight">{opportunity.title}</p>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex items-center text-caterpillar-yellow">
                    <DollarSign size={14} className="mr-1" />
                    <span className="font-bold">{(opportunity.value / 1000000).toFixed(0)}M CFA</span>
                </div>

                <div className="flex items-center text-slate-400">
                    <Calendar size={14} className="mr-1" />
                    <span>{new Date(opportunity.deadline).toLocaleDateString('fr-FR')}</span>
                </div>

                <div className="flex items-center text-slate-400">
                    <MapPin size={14} className="mr-1" />
                    <span>{opportunity.region}</span>
                </div>

                {opportunity.competitors.length > 0 && (
                    <div className="flex items-center text-orange-400">
                        <Users size={14} className="mr-1" />
                        <span>{opportunity.competitors.join(', ')}</span>
                    </div>
                )}

                <div className="pt-2 border-t border-slate-700">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">Probabilité</span>
                        <span className={`font-bold ${opportunity.probability >= 80 ? 'text-green-400' :
                                opportunity.probability >= 60 ? 'text-yellow-400' :
                                    'text-orange-400'
                            }`}>
                            {opportunity.probability}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                        <div
                            className={`h-1.5 rounded-full ${opportunity.probability >= 80 ? 'bg-green-500' :
                                    opportunity.probability >= 60 ? 'bg-yellow-500' :
                                        'bg-orange-500'
                                }`}
                            style={{ width: `${opportunity.probability}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
