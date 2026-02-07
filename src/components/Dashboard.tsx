import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    Bell,
    Award,
    Bot,
    Activity,
    CheckCircle,
    XCircle,
    Clock,
} from 'lucide-react';

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import { opportunities } from '../data/opportunities';
import { competitors } from '../data/competitors';
import { alerts } from '../data/alerts';
import { mockAgents } from '../data/agents';
import { AgentActivity } from '../types/agents';
import Header from './Header';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [agents, setAgents] = useState<AgentActivity[]>(mockAgents);

    /* -------------------- AGENTS -------------------- */
    useEffect(() => {
        const interval = setInterval(() => {
            setAgents(prev =>
                prev.map(agent => {
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
                })
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    /* -------------------- KPI -------------------- */
    const activeOpportunities = opportunities.filter(o =>
        ['nouveau', 'qualifie', 'preparation'].includes(o.status)
    ).length;

    const totalValue = opportunities.reduce((sum, o) => sum + o.value, 0);

    const avgProbability =
        opportunities.length > 0
            ? Math.round(
                opportunities.reduce(
                    (sum, o) => sum + (o.probability ?? 0),
                    0
                ) / opportunities.length
            )
            : 0;

    const unreadAlerts = alerts.filter(a => !a.read).length;

    const activeAgents = agents.filter(a => a.status === 'running').length;
    const totalAgentTasks = agents.reduce((sum, a) => sum + a.tasksToday, 0);

    /* -------------------- DATA -------------------- */
    const evolutionData = [
        { month: 'Sep', opportunites: 8 },
        { month: 'Oct', opportunites: 10 },
        { month: 'Nov', opportunites: 9 },
        { month: 'Déc', opportunites: 11 },
        { month: 'Jan', opportunites: 12 },
        { month: 'Fév', opportunites: 12 },
    ];

    const marketShareData = competitors.map(c => ({
        name: c.name,
        value: c.marketShare,
    }));

    const sectorData = [
        { name: 'Construction', value: 10, color: '#FFCD11' },
        { name: 'Énergie', value: 1, color: '#FF6B00' },
        { name: 'Mines', value: 1, color: '#64748b' },
    ];

    const COLORS: Record<string, string> = {
        'Neemba Cat': '#FFCD11',
        SMT: '#EF4444',
        Bia: '#3B82F6',
    };

    /* ==================== RENDER ==================== */
    return (
        <div className="space-y-6">
            <Header />

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <KPICard icon={Target} label="Opportunités Actives" value={activeOpportunities} trend="up" change={15} color="yellow" />
                <KPICard icon={DollarSign} label="Valeur Pipeline" value={`${(totalValue / 1_000_000).toFixed(0)}M`} sublabel="CFA" trend="up" change={22} color="green" />
                <KPICard icon={Award} label="Taux de Conversion" value={`${avgProbability}%`} trend="up" change={5} color="blue" />
                <KPICard icon={Bell} label="Alertes Non Lues" value={unreadAlerts} trend="stable" color="red" />
                <KPICard icon={Bot} label="Agents IA Actifs" value={`${activeAgents}/${agents.length}`} color="purple" />
                <KPICard icon={Activity} label="Tâches IA Aujourd'hui" value={totalAgentTasks} color="cyan" />
            </div>

            {/* TOP OPPORTUNITÉS — CORRIGÉ */}
            <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Top Opportunités</h3>

                <div className="space-y-3">
                    {opportunities.slice(0, 5).map(opp => {
                        const probability: number = opp.probability ?? 0;

                        return (
                            <div
                                key={opp.id}
                                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                            >
                                <div>
                                    <h4 className="text-white text-sm font-medium">{opp.client}</h4>
                                    <p className="text-slate-400 text-xs">{opp.title}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-caterpillar-yellow font-bold">
                                        {(opp.value / 1_000_000).toFixed(0)}M
                                    </p>
                                    <p className="text-xs text-slate-400">CFA</p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${probability >= 80
                                            ? 'bg-green-500/20 text-green-300'
                                            : probability >= 60
                                                ? 'bg-yellow-500/20 text-yellow-300'
                                                : 'bg-orange-500/20 text-orange-300'
                                        }`}
                                >
                                    {probability}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ==================== COMPONENTS ==================== */

function AgentMiniCard({ agent }: { agent: AgentActivity }) {
    const statusConfig = {
        running: { color: 'bg-blue-500', icon: Activity },
        idle: { color: 'bg-slate-500', icon: Clock },
        success: { color: 'bg-green-500', icon: CheckCircle },
        error: { color: 'bg-red-500', icon: XCircle },
    } as const;

    const status = statusConfig[agent.status];

    return (
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
            <div className="flex justify-between mb-2">
                <span className="text-white text-sm">{agent.agentName}</span>
                <div className={`w-2 h-2 rounded-full ${status.color}`} />
            </div>
            <div className="text-xs text-slate-400">
                Aujourd’hui : <span className="text-white">{agent.tasksToday}</span>
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

function KPICard({
    icon: Icon,
    label,
    value,
    sublabel,
    change = 0,
    trend,
    color,
}: KPICardProps) {
    return (
        <div className="glass rounded-2xl p-6 border border-slate-700">
            <div className="flex justify-between mb-3">
                <Icon size={22} />
                {trend && trend !== 'stable' && (
                    <span className="text-sm">
                        {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {Math.abs(change)}%
                    </span>
                )}
            </div>
            <p className="text-slate-400 text-sm">{label}</p>
            <div className="flex items-baseline space-x-2">
                <h3 className="text-white text-2xl font-bold">{value}</h3>
                {sublabel && <span className="text-slate-400 text-sm">{sublabel}</span>}
            </div>
        </div>
    );
}
