import { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    Target,
    Award,
    Bell,
    Bot,
    Activity as ActivityIcon,
    Zap,
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

import Header from './Header';
import { opportunities } from '../data/opportunities';
import { mockAgents } from '../data/agents';

export default function Dashboard() {
    const [timeRange] = useState('7d');

    // KPI Calculations
    const totalRevenue = 45_600_000;
    const activeClients = 127;
    const conversionRate = 68;
    const unreadAlerts = 12;
    const activeAgents = mockAgents.filter(a => a.status === 'running').length;
    const totalTasks = mockAgents.reduce((sum, a) => sum + a.tasksToday, 0);

    // Revenue trend data
    const revenueData = [
        { name: 'Lun', value: 4200 },
        { name: 'Mar', value: 5100 },
        { name: 'Mer', value: 4800 },
        { name: 'Jeu', value: 6200 },
        { name: 'Ven', value: 7100 },
        { name: 'Sam', value: 5900 },
        { name: 'Dim', value: 6500 },
    ];

    // Sector distribution
    const sectorData = [
        { name: 'Construction', value: 12, color: '#FFCD11' },
        { name: 'Énergie', value: 8, color: '#10b981' },
        { name: 'Transport', value: 6, color: '#3b82f6' },
        { name: 'Autres', value: 4, color: '#8b5cf6' },
    ];

    return (
        <div className="space-y-6">
            <Header />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    icon={DollarSign}
                    label="Revenu Total"
                    value={`${(totalRevenue / 1_000_000).toFixed(1)}M CFA`}
                    change={12.5}
                    trend="up"
                    color="yellow"
                />
                <KPICard
                    icon={Users}
                    label="Clients Actifs"
                    value={activeClients}
                    change={8.2}
                    trend="up"
                    color="green"
                />
                <KPICard
                    icon={Target}
                    label="Taux de Conversion"
                    value={`${conversionRate}%`}
                    change={3.1}
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
                    value={activeAgents}
                    color="purple"
                />
                <KPICard
                    icon={Zap}
                    label="Tâches Aujourd'hui"
                    value={totalTasks}
                    color="cyan"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trend */}
                <div className="glass rounded-2xl p-6 lg:col-span-2">
                    <h3 className="text-white font-semibold mb-4 flex items-center justify-between">
                        <span>Évolution du Revenu</span>
                        <span className="text-sm text-slate-400">{timeRange === '7d' ? '7 derniers jours' : '30 derniers jours'}</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFCD11" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#FFCD11" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#FFCD11"
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Sector Distribution */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4">Répartition par Secteur</h3>
                    <ResponsiveContainer width="100%" height={250}>
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
                    <h3 className="text-white font-semibold mb-4">Top Opportunités</h3>
                    <div className="space-y-3">
                        {opportunities.slice(0, 5).map((opp) => (
                            <div
                                key={opp.id}
                                className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg hover:bg-slate-800/70 transition-colors"
                            >
                                <div className="flex-1">
                                    <p className="text-white font-medium">{opp.client}</p>
                                    <p className="text-slate-400 text-sm">{opp.title}</p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="text-caterpillar-yellow font-bold">
                                        {(opp.value / 1_000_000).toFixed(1)}M CFA
                                    </p>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${(opp.probability ?? 0) >= 80
                                            ? 'bg-green-500/20 text-green-300'
                                            : (opp.probability ?? 0) >= 60
                                                ? 'bg-yellow-500/20 text-yellow-300'
                                                : 'bg-orange-500/20 text-orange-300'
                                            }`}
                                    >
                                        {opp.probability ?? 0}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agent Activity */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <ActivityIcon size={20} className="text-caterpillar-yellow" />
                        <span>Activité des Agents</span>
                    </h3>
                    <div className="space-y-3">
                        {mockAgents.slice(0, 4).map((agent) => (
                            <div key={agent.id} className="bg-slate-800/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white text-sm font-medium">{agent.agentName}</span>
                                    <span
                                        className={`w-2 h-2 rounded-full ${agent.status === 'running'
                                            ? 'bg-green-400'
                                            : agent.status === 'idle'
                                                ? 'bg-yellow-400'
                                                : 'bg-red-400'
                                            }`}
                                    ></span>
                                </div>
                                <p className="text-slate-400 text-xs">
                                    {agent.tasksToday} tâches aujourd'hui
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
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
    const iconColorClasses = {
        yellow: 'text-caterpillar-yellow',
        green: 'text-green-400',
        blue: 'text-blue-400',
        red: 'text-red-400',
        purple: 'text-purple-400',
        cyan: 'text-cyan-400',
    };

    return (
        <div className="glass rounded-2xl p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-slate-800/50 ${iconColorClasses[color]}`}>
                    <Icon size={24} />
                </div>
                {/* Trend indicator temporarily disabled for TypeScript compatibility */}
                {/* {trend && trend !== 'stable' && (
                    <div className={`flex items-center space-x-1 text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{Math.abs(change ?? 0)}%</span>
                    </div>
                )} */}
            </div>
            <p className="text-slate-400 text-sm mb-1">{label}</p>
            <div className="flex items-baseline space-x-2">
                <h3 className="text-white text-3xl font-bold">{value}</h3>
                {sublabel && <span className="text-slate-400 text-sm">{sublabel}</span>}
            </div>
        </div>
    );
}
