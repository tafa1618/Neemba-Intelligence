import { useState, useEffect } from 'react';
import { Bot, Activity, CheckCircle, XCircle, Clock, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockAgents } from '../data/agents';
import { AgentActivity } from '../types/agents';

export default function Agents() {
    const [agents, setAgents] = useState<AgentActivity[]>(mockAgents);
    const [selectedAgent, setSelectedAgent] = useState<AgentActivity | null>(null);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setAgents(prev => prev.map(agent => {
                // Simulate task completion for running agents
                if (agent.status === 'running' && Math.random() > 0.7) {
                    return {
                        ...agent,
                        status: 'success' as const,
                        currentTask: undefined,
                        tasksCompleted: agent.tasksCompleted + 1,
                        tasksToday: agent.tasksToday + 1,
                    };
                }
                return agent;
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const totalTasks = agents.reduce((sum, a) => sum + a.tasksToday, 0);
    const avgSuccessRate = agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length;
    const activeAgents = agents.filter(a => a.status === 'running').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
                    <Bot className="text-caterpillar-yellow" size={40} />
                    <span>Agents IA</span>
                </h1>
                <p className="text-slate-400">Surveillance en temps réel de l'activité des agents intelligents</p>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    icon={Bot}
                    label="Agents Actifs"
                    value={`${activeAgents}/${agents.length}`}
                    color="blue"
                />
                <StatCard
                    icon={Zap}
                    label="Tâches Aujourd'hui"
                    value={totalTasks.toString()}
                    color="yellow"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Taux de Succès Moyen"
                    value={`${avgSuccessRate.toFixed(1)}%`}
                    color="green"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Total Tâches Complétées"
                    value={agents.reduce((sum, a) => sum + a.tasksCompleted, 0).toLocaleString()}
                    color="purple"
                />
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {agents.map((agent) => (
                    <AgentCard
                        key={agent.id}
                        agent={agent}
                        onClick={() => setSelectedAgent(agent)}
                    />
                ))}
            </div>

            {/* Agent Details Modal */}
            {selectedAgent && (
                <AgentDetailsModal
                    agent={selectedAgent}
                    onClose={() => setSelectedAgent(null)}
                />
            )}
        </div>
    );
}

// Components
interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    color: 'blue' | 'yellow' | 'green' | 'purple';
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
    const colorClasses = {
        blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
        yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
        green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
        purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    };

    return (
        <div className={`glass rounded-2xl p-6 bg-gradient-to-br ${colorClasses[color]} border`}>
            <div className="flex items-center justify-between mb-4">
                <Icon size={24} className={colorClasses[color].split(' ')[3]} />
            </div>
            <p className="text-slate-400 text-sm mb-1">{label}</p>
            <h3 className="text-white text-3xl font-bold">{value}</h3>
        </div>
    );
}

interface AgentCardProps {
    agent: AgentActivity;
    onClick: () => void;
}

function AgentCard({ agent, onClick }: AgentCardProps) {
    const statusConfig = {
        running: { color: 'bg-blue-500', text: 'En cours', icon: Activity },
        idle: { color: 'bg-slate-500', text: 'Inactif', icon: Clock },
        success: { color: 'bg-green-500', text: 'Succès', icon: CheckCircle },
        error: { color: 'bg-red-500', text: 'Erreur', icon: XCircle },
    };

    const typeConfig = {
        scraper: { label: 'Scraper Web', color: 'text-blue-400' },
        enrichment: { label: 'Enrichissement', color: 'text-purple-400' },
        scoring: { label: 'Scoring', color: 'text-yellow-400' },
        alerts: { label: 'Alertes', color: 'text-orange-400' },
        nlp: { label: 'NLP', color: 'text-green-400' },
    };

    const status = statusConfig[agent.status];
    const type = typeConfig[agent.agentType];
    const StatusIcon = status.icon;

    return (
        <div
            onClick={onClick}
            className="glass rounded-2xl p-6 hover:bg-slate-800/50 transition-all cursor-pointer group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                        <Bot className="text-caterpillar-yellow" size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold group-hover:text-caterpillar-yellow transition-colors">
                            {agent.agentName}
                        </h3>
                        <p className={`text-sm ${type.color}`}>{type.label}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${status.color} ${agent.status === 'running' ? 'animate-pulse' : ''}`}></div>
                    <span className="text-slate-400 text-xs">{status.text}</span>
                </div>
            </div>

            {/* Current Task */}
            {agent.currentTask && (
                <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <Activity size={14} className="text-blue-400 animate-pulse" />
                        <span className="text-blue-400 text-xs font-medium">Tâche en cours</span>
                    </div>
                    <p className="text-white text-sm">{agent.currentTask}</p>
                </div>
            )}

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <p className="text-slate-500 text-xs mb-1">Aujourd'hui</p>
                    <p className="text-white font-bold text-lg">{agent.tasksToday}</p>
                </div>
                <div>
                    <p className="text-slate-500 text-xs mb-1">Total</p>
                    <p className="text-white font-bold text-lg">{agent.tasksCompleted.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-slate-500 text-xs mb-1">Succès</p>
                    <p className="text-green-400 font-bold text-lg">{agent.successRate}%</p>
                </div>
            </div>

            {/* Last Run */}
            <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Dernière exécution: {new Date(agent.lastRun).toLocaleTimeString('fr-FR')}</span>
                {agent.nextRun && (
                    <span>Prochaine: {new Date(agent.nextRun).toLocaleTimeString('fr-FR')}</span>
                )}
            </div>
        </div>
    );
}

interface AgentDetailsModalProps {
    agent: AgentActivity;
    onClose: () => void;
}

function AgentDetailsModal({ agent, onClose }: AgentDetailsModalProps) {
    const logTypeConfig = {
        info: { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: '📘' },
        success: { color: 'bg-green-500/20 text-green-300 border-green-500/30', icon: '✅' },
        warning: { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', icon: '⚠️' },
        error: { color: 'bg-red-500/20 text-red-300 border-red-500/30', icon: '❌' },
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Bot className="text-caterpillar-yellow" size={32} />
                        <div>
                            <h2 className="text-white text-2xl font-bold">{agent.agentName}</h2>
                            <p className="text-slate-400 text-sm">Logs d'activité détaillés</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <XCircle className="text-slate-400" size={24} />
                    </button>
                </div>

                {/* Metrics Summary */}
                <div className="p-6 border-b border-slate-700 grid grid-cols-4 gap-4">
                    <div>
                        <p className="text-slate-400 text-xs mb-1">Tâches Aujourd'hui</p>
                        <p className="text-white text-2xl font-bold">{agent.tasksToday}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs mb-1">Total Complétées</p>
                        <p className="text-white text-2xl font-bold">{agent.tasksCompleted.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs mb-1">Taux de Succès</p>
                        <p className="text-green-400 text-2xl font-bold">{agent.successRate}%</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs mb-1">Statut</p>
                        <p className="text-caterpillar-yellow text-2xl font-bold capitalize">{agent.status}</p>
                    </div>
                </div>

                {/* Logs */}
                <div className="p-6 overflow-y-auto max-h-96">
                    <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Activity size={18} />
                        <span>Historique d'Activité</span>
                    </h3>
                    <div className="space-y-3">
                        {agent.logs.map((log) => {
                            const config = logTypeConfig[log.type];
                            return (
                                <div key={log.id} className={`p-4 rounded-lg border ${config.color}`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <span>{config.icon}</span>
                                            <span className="font-medium">{log.message}</span>
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            {new Date(log.timestamp).toLocaleTimeString('fr-FR')}
                                        </span>
                                    </div>
                                    {log.details && (
                                        <p className="text-sm text-slate-400 ml-6">{log.details}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-caterpillar-yellow text-caterpillar-black rounded-lg font-medium hover:bg-caterpillar-orange transition-colors"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}
