import { useEffect, useState } from 'react';
import {
    Bot,
    Activity,
    DollarSign,
    Target,
    Award,
    Bell,
} from 'lucide-react';

import Header from './Header';
import { opportunities } from '../data/opportunities';
import { alerts } from '../data/alerts';
import { mockAgents } from '../data/agents';
import { AgentActivity } from '../types/agents';

/* =========================
   TYPES LOCAUX SIMPLES
   ========================= */

type SafeOpportunity = {
    id: string;
    client: string;
    title: string;
    value: number;
    probability: number; // 🔒 OBLIGATOIRE
};

/* =========================
   NORMALISATION DES DONNÉES
   ========================= */

function makeSafeOpportunities(): SafeOpportunity[] {
    return opportunities.map(o => ({
        id: o.id,
        client: o.client,
        title: o.title,
        value: o.value,
        probability: o.probability ?? 0,
    }));
}

/* =========================
   COMPONENT
   ========================= */

export default function Dashboard() {
    const [agents, setAgents] = useState<AgentActivity[]>(mockAgents);

    // 🔒 Données normalisées UNE FOIS
    const safeOpportunities = makeSafeOpportunities();

    /* ---------------- AGENTS ---------------- */
    useEffect(() => {
        const interval = setInterval(() => {
            setAgents(prev =>
                prev.map(agent =>
                    agent.status === 'running'
                        ? {
                            ...agent,
                            tasksToday: agent.tasksToday + 1,
                        }
                        : agent
                )
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    /* ---------------- KPI ---------------- */
    const activeOpportunities = safeOpportunities.length;

    const totalValue = safeOpportunities.reduce(
        (sum, o) => sum + o.value,
        0
    );

    const avgProbability =
        safeOpportunities.length === 0
            ? 0
            : Math.round(
                safeOpportunities.reduce(
                    (sum, o) => sum + o.probability,
                    0
                ) / safeOpportunities.length
            );

    const unreadAlerts = alerts.filter(a => !a.read).length;

    /* =========================
       RENDER
       ========================= */

    return (
        <div className="space-y-6">
            <Header />

            {/* KPI */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPI icon={Target} label="Opportunités" value={activeOpportunities} />
                <KPI
                    icon={DollarSign}
                    label="Valeur"
                    value={`${(totalValue / 1_000_000).toFixed(0)}M CFA`}
                />
                <KPI
                    icon={Award}
                    label="Conversion"
                    value={`${avgProbability}%`}
                />
                <KPI
                    icon={Bell}
                    label="Alertes"
                    value={unreadAlerts}
                />
            </div>

            {/* TOP OPPORTUNITÉS */}
            <div className="glass p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-4">
                    Top Opportunités
                </h3>

                <div className="space-y-3">
                    {safeOpportunities.slice(0, 5).map(opp => (
                        <div
                            key={opp.id}
                            className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg"
                        >
                            <div>
                                <p className="text-white text-sm font-medium">
                                    {opp.client}
                                </p>
                                <p className="text-slate-400 text-xs">
                                    {opp.title}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-yellow-400 font-bold">
                                    {(opp.value / 1_000_000).toFixed(0)}M
                                </p>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${opp.probability >= 80
                                            ? 'bg-green-500/20 text-green-300'
                                            : opp.probability >= 60
                                                ? 'bg-yellow-500/20 text-yellow-300'
                                                : 'bg-orange-500/20 text-orange-300'
                                        }`}
                                >
                                    {opp.probability}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AGENTS */}
            <div className="glass p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Bot size={18} /> Agents IA
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {agents.map(agent => (
                        <div
                            key={agent.id}
                            className="bg-slate-800/40 p-3 rounded-lg text-sm"
                        >
                            <p className="text-white">{agent.agentName}</p>
                            <p className="text-slate-400">
                                Tâches aujourd’hui : {agent.tasksToday}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* =========================
   KPI COMPONENT
   ========================= */

function KPI({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
}) {
    return (
        <div className="glass p-4 rounded-xl">
            <div className="flex items-center gap-2 text-slate-400">
                <Icon size={16} />
                <span className="text-sm">{label}</span>
            </div>
            <p className="text-white text-2xl font-bold mt-1">
                {value}
            </p>
        </div>
    );
}
