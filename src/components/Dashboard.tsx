import { TrendingUp, TrendingDown, DollarSign, Target, Bell, Award, Bot, Activity, CheckCircle, XCircle, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { opportunities } from '../data/opportunities';
import { competitors } from '../data/competitors';
import { alerts } from '../data/alerts';
import { mockAgents } from '../data/agents';
import { AgentActivity } from '../types/agents';
import Header from './Header';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [agents, setAgents] = useState<AgentActivity[]>(mockAgents);

    // Simulate real-time agent updates
    useEffect(() => {
        const interval = setInterval(() => {
            setAgents(prev => prev.map(agent => {
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

    // Calculate KPIs
    const activeOpportunities = opportunities.filter(o => ['nouveau', 'qualifie', 'preparation'].includes(o.status)).length;
    const totalValue = opportunities.reduce((sum, o) => sum + o.value, 0);
    const avgProbability = Math.round(opportunities.reduce((sum, o) => sum + o.probability, 0) / opportunities.length);
    const unreadAlerts = alerts.filter(a => !a.read).length;

    // Agent stats
    const activeAgents = agents.filter(a => a.status === 'running').length;
    const totalAgentTasks = agents.reduce((sum, a) => sum + a.tasksToday, 0);

    // Evolution data (mocked trend)
    const evolutionData = [
        { month: 'Sep', opportunites: 8, valeur: 520 },
        { month: 'Oct', opportunites: 10, valeur: 680 },
        { month: 'Nov', opportunites: 9, valeur: 590 },
        { month: 'Déc', opportunites: 11, valeur: 750 },
        { month: 'Jan', opportunites: 12, valeur: 845 },
        { month: 'Fév', opportunites: 12, valeur: 845 },
    ];

    // Market share data
    const marketShareData = competitors.map(c => ({
        name: c.name,
        value: c.marketShare,
        brand: c.brand,
    }));

    // Sector distribution
    const sectorData = [
        { name: 'Construction', value: 10, color: '#FFCD11' },  // Official CAT yellow
        { name: 'Énergie', value: 1, color: '#FF6B00' },
        { name: 'Mines', value: 1, color: '#64748b' },
    ];

    const COLORS = {
        'Neemba Cat': '#FFCD11',  // Official CAT yellow
        'SMT': '#EF4444',
        'Bia': '#3B82F6',
    };

    return (
        <div className="space-y-6">
            {/* Neemba Branding Header */}
            <Header />

            {/* Section Subtitle */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center space-x-2">
                    <Bot className="text-caterpillar-yellow" size={28} />
                    <span>Intelligence IA</span>
                </h2>
                <p className="text-slate-400">Surveillance automatisée et insights en temps réel</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <KPICard
                    icon={Target}
                    label="Opportunités Actives"
                    value={activeOpportunities}
                    change={+15}
                    trend="up"
                    color="yellow"
                />
                <KPICard
                    icon={DollarSign}
                    label="Valeur Pipeline"
                    value={`${(totalValue / 1000000).toFixed(0)}M`}
                    sublabel="CFA"
                    change={+22}
                    trend="up"
                    color="green"
                />
                <KPICard
                    icon={Award}
                    label="Taux de Conversion"
                    value={`${avgProbability}%`}
                    change={+5}
                    trend="up"
                    color="blue"
                />
                <KPICard
                    icon={Bell}
                    label="Alertes Non Lues"
                    value={unreadAlerts}
                    change={0}
                    trend="stable"
                    color="red"
                />
                <KPICard
                    icon={Bot}
                    label="Agents IA Actifs"
                    value={`${activeAgents}/${agents.length}`}
                    sublabel="en cours"
                    color="purple"
                />
                <KPICard
                    icon={Activity}
                    label="Tâches IA Aujourd'hui"
                    value={totalAgentTasks}
                    sublabel="complétées"
                    color="cyan"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Evolution */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Évolution des Opportunités</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={evolutionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="opportunites" stroke="#FFCD11" strokeWidth={3} name="Opportunités" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Market Share */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Parts de Marché Construction Sénégal</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={marketShareData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="value" name="Part de marché %" radius={[8, 8, 0, 0]}>
                                {marketShareData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sector Distribution */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Répartition par Secteur</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={sectorData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {sectorData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {sectorData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-slate-300">{item.name}</span>
                                </div>
                                <span className="text-white font-semibold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Opportunities */}
                <div className="glass rounded-2xl p-6 lg:col-span-2">
                    <h3 className="text-white font-semibold text-lg mb-4">Top Opportunités</h3>
                    <div className="space-y-3">
                        {opportunities.slice(0, 5).map((opp) => (
                            <div key={opp.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
                                <div className="flex-1">
                                    <h4 className="text-white font-medium text-sm">{opp.client}</h4>
                                    <p className="text-slate-400 text-xs mt-1">{opp.title.substring(0, 50)}...</p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="text-caterpillar-yellow font-bold">{(opp.value / 1000000).toFixed(0)}M</p>
                                    <p className="text-slate-400 text-xs">CFA</p>
                                </div>
                                <div className="ml-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${opp.probability >= 80 ? 'bg-green-500/20 text-green-300' :
                                        opp.probability >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                                            'bg-orange-500/20 text-orange-300'
                                        }`}>
                                        {opp.probability}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Agents Activity Section */}
            <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Bot className="text-caterpillar-yellow" size={24} />
                        <h3 className="text-white font-semibold text-lg">Activité des Agents IA</h3>
                    </div>
                    <div className="text-slate-400 text-sm">
                        <span className="text-caterpillar-yellow font-medium">{activeAgents}</span> agents actifs
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map((agent) => (
                        <AgentMiniCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Agent Mini Card Component
interface AgentMiniCardProps {
    agent: AgentActivity;
}

function AgentMiniCard({ agent }: AgentMiniCardProps) {
    const statusConfig = {
        running: { color: 'bg-blue-500', text: 'En cours', icon: Activity },
        idle: { color: 'bg-slate-500', text: 'Inactif', icon: Clock },
        success: { color: 'bg-green-500', text: 'Succès', icon: CheckCircle },
        error: { color: 'bg-red-500', text: 'Erreur', icon: XCircle },
    };

    const status = statusConfig[agent.status];

    return (
        <div className="bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-colors border border-slate-700">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <Bot size={16} className="text-caterpillar-yellow" />
                    <h4 className="text-white text-sm font-medium">{agent.agentName}</h4>
                </div>
                <div className={`w-2 h-2 rounded-full ${status.color} ${agent.status === 'running' ? 'animate-pulse' : ''}`}></div>
            </div>

            {agent.currentTask && (
                <div className="mb-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-300">
                    {agent.currentTask.substring(0, 50)}...
                </div>
            )}

            <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Aujourd'hui: <span className="text-white font-medium">{agent.tasksToday}</span></span>
                <span className="text-green-400 font-medium">{agent.successRate}%</span>
            </div>
        </div>
    );
}

interface KPICardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    sublabel?: string;
    change?: number;
    trend?: 'up' | 'down' | 'stable';
    color: 'yellow' | 'green' | 'blue' | 'red' | 'purple' | 'cyan';
}

function KPICard({ icon: Icon, label, value, sublabel, change, trend, color }: KPICardProps) {
    const colorClasses = {
        yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
        green: 'from-green-500/20 to-green-600/20 border-green-500/30',
        blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
        red: 'from-red-500/20 to-red-600/20 border-red-500/30',
        purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
        cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
    };

    const iconColorClasses = {
        yellow: 'text-yellow-400',
        green: 'text-green-400',
        blue: 'text-blue-400',
        red: 'text-red-400',
        purple: 'text-purple-400',
        cyan: 'text-cyan-400',
    };

    return (
        <div className={`glass rounded-2xl p-6 bg-gradient-to-br ${colorClasses[color]} border`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-slate-800/50 ${iconColorClasses[color]}`}>
                    <Icon size={24} />
                </div>
                {trend !== 'stable' && (
                    <div className={`flex items-center space-x-1 text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{Math.abs(change)}%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-slate-400 text-sm mb-1">{label}</p>
                <div className="flex items-baseline space-x-2">
                    <h3 className="text-white text-3xl font-bold">{value}</h3>
                    {sublabel && <span className="text-slate-400 text-sm">{sublabel}</span>}
                </div>
            </div>
        </div>
    );
}
