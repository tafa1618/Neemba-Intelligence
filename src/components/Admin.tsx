import { Bot, Settings, Database, Activity, Shield, Calendar, Zap, AlertTriangle, CheckCircle, Clock, Play, Pause, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { mockAgents } from '../data/agents';
import { AgentActivity } from '../types/agents';

interface AdminProps {
    userEmail: string;
    userRole?: string;
}

export default function Admin({ userEmail }: AdminProps) {
    const [activeTab, setActiveTab] = useState<'agents' | 'config' | 'integrations'>('agents');
    const [agents] = useState<AgentActivity[]>(mockAgents);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
                        <Shield className="text-caterpillar-yellow" size={40} />
                        <span>Centre de Contrôle</span>
                    </h1>
                    <p className="text-slate-400">Gestion des agents IA et configuration système</p>
                </div>
                <div className="flex items-center space-x-3 glass px-4 py-3 rounded-lg">
                    <Shield className="text-caterpillar-yellow" size={20} />
                    <div>
                        <p className="text-white text-sm font-medium">{userEmail}</p>
                        <p className="text-slate-400 text-xs capitalize">Administrateur Système</p>
                    </div>
                </div>
            </div>

            {/* System Health Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <HealthCard
                    icon={Bot}
                    label="Agents Déployés"
                    value={`${agents.filter(a => a.status !== 'error').length}/${agents.length}`}
                    status="success"
                />
                <HealthCard
                    icon={Activity}
                    label="Tâches Complétées"
                    value={agents.reduce((sum, a) => sum + a.tasksToday, 0).toString()}
                    sublabel="aujourd'hui"
                    status="success"
                />
                <HealthCard
                    icon={Database}
                    label="Intégrations"
                    value="3/3"
                    sublabel="actives"
                    status="success"
                />
                <HealthCard
                    icon={Zap}
                    label="Performance"
                    value="99.2%"
                    sublabel="uptime"
                    status="success"
                />
            </div>

            {/* Tabs */}
            <div className="glass rounded-2xl overflow-hidden">
                <div className="flex border-b border-slate-700">
                    <TabButton
                        active={activeTab === 'agents'}
                        onClick={() => setActiveTab('agents')}
                        icon={Bot}
                        label="Gestion Agents"
                    />
                    <TabButton
                        active={activeTab === 'config'}
                        onClick={() => setActiveTab('config')}
                        icon={Settings}
                        label="Configuration"
                    />
                    <TabButton
                        active={activeTab === 'integrations'}
                        onClick={() => setActiveTab('integrations')}
                        icon={Database}
                        label="Intégrations"
                    />
                </div>

                <div className="p-6">
                    {activeTab === 'agents' && <AgentsManagement agents={agents} />}
                    {activeTab === 'config' && <SystemConfiguration />}
                    {activeTab === 'integrations' && <IntegrationsPanel />}
                </div>
            </div>
        </div>
    );
}

// Agents Management Tab
function AgentsManagement({ agents }: { agents: AgentActivity[] }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">Agents IA Déployés</h3>
                <button className="px-4 py-2 bg-caterpillar-yellow text-caterpillar-black rounded-lg font-medium hover:bg-caterpillar-orange transition-colors flex items-center space-x-2">
                    <Play size={16} />
                    <span>Démarrer Tous</span>
                </button>
            </div>

            <div className="space-y-4">
                {agents.map((agent) => (
                    <AgentControlCard key={agent.id} agent={agent} />
                ))}
            </div>
        </div>
    );
}

// Agent Control Card
function AgentControlCard({ agent }: { agent: AgentActivity }) {
    const statusConfig = {
        running: { color: 'bg-blue-500', text: 'En cours', icon: Activity },
        idle: { color: 'bg-slate-500', text: 'Inactif', icon: Clock },
        success: { color: 'bg-green-500', text: 'Succès', icon: CheckCircle },
        error: { color: 'bg-red-500', text: 'Erreur', icon: AlertTriangle },
    };

    const status = statusConfig[agent.status];

    return (
        <div className="glass rounded-lg p-5 border border-slate-700">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                        <Bot className="text-caterpillar-yellow" size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-semibold">{agent.agentName}</h4>
                        <p className="text-slate-400 text-sm capitalize">{agent.agentType}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${status.color} ${agent.status === 'running' ? 'animate-pulse' : ''}`}></div>
                        <span className="text-slate-400 text-sm">{status.text}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {agent.status === 'running' ? (
                            <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors" title="Pause">
                                <Pause size={16} className="text-white" />
                            </button>
                        ) : (
                            <button className="p-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors" title="Démarrer">
                                <Play size={16} className="text-white" />
                            </button>
                        )}
                        <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors" title="Redémarrer">
                            <RefreshCw size={16} className="text-white" />
                        </button>
                        <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors" title="Configuration">
                            <Settings size={16} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Agent Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-slate-800/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Tâches Aujourd'hui</p>
                    <p className="text-white text-xl font-bold">{agent.tasksToday}</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Total Complétées</p>
                    <p className="text-white text-xl font-bold">{agent.tasksCompleted.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Taux de Succès</p>
                    <p className="text-green-400 text-xl font-bold">{agent.successRate}%</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Prochaine Exécution</p>
                    <p className="text-white text-sm font-medium">
                        {agent.nextRun ? new Date(agent.nextRun).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </p>
                </div>
            </div>

            {/* Current Task */}
            {agent.currentTask && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <Activity size={14} className="text-blue-400 animate-pulse" />
                        <span className="text-blue-400 text-xs font-medium">Tâche en cours</span>
                    </div>
                    <p className="text-white text-sm">{agent.currentTask}</p>
                </div>
            )}

            {/* Schedule Configuration */}
            <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-slate-400 text-sm">Planification:</span>
                        <span className="text-white text-sm font-medium">Quotidienne à 06:00</span>
                    </div>
                    <button className="text-caterpillar-yellow text-sm font-medium hover:text-caterpillar-orange">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    );
}

// System Configuration Tab
function SystemConfiguration() {
    return (
        <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg mb-4">Paramètres Système</h3>

            <div className="space-y-4">
                {/* Scraping Settings */}
                <ConfigSection
                    icon={Activity}
                    title="Paramètres de Scraping"
                    description="Configuration des agents de collecte de données"
                >
                    <ConfigItem label="Fréquence de scraping" value="Quotidienne" />
                    <ConfigItem label="Timeout requêtes" value="30 secondes" />
                    <ConfigItem label="Retry automatique" value="3 tentatives" />
                    <ConfigItem label="User-Agent rotation" value="Activé" />
                </ConfigSection>

                {/* Alert Settings */}
                <ConfigSection
                    icon={AlertTriangle}
                    title="Paramètres d'Alertes"
                    description="Configuration du système de notifications"
                >
                    <ConfigItem label="Seuil haute priorité" value="Score ≥ 80%" />
                    <ConfigItem label="Email notifications" value="Activé" />
                    <ConfigItem label="Destinataires" value="3 commerciaux" />
                    <ConfigItem label="Digest quotidien" value="08:00 AM" />
                </ConfigSection>

                {/* AI/NLP Settings */}
                <ConfigSection
                    icon={Bot}
                    title="Paramètres IA & NLP"
                    description="Configuration des modèles d'intelligence artificielle"
                >
                    <ConfigItem label="Modèle NLP" value="GPT-4 Turbo" />
                    <ConfigItem label="Scoring algorithm" value="ML Random Forest" />
                    <ConfigItem label="Confiance minimale" value="75%" />
                    <ConfigItem label="Auto-enrichment" value="Activé" />
                </ConfigSection>

                {/* Data Retention */}
                <ConfigSection
                    icon={Database}
                    title="Rétention des Données"
                    description="Gestion du stockage et archivage"
                >
                    <ConfigItem label="Logs agents" value="90 jours" />
                    <ConfigItem label="Données scrapées" value="365 jours" />
                    <ConfigItem label="Alertes archivées" value="180 jours" />
                    <ConfigItem label="Backup automatique" value="Quotidien" />
                </ConfigSection>
            </div>
        </div>
    );
}

// Integrations Panel
function IntegrationsPanel() {
    const integrations: Array<{
        name: string;
        status: 'connected' | 'pending' | 'error';
        icon: string;
        lastSync: string | null;
        records: string;
        description: string;
    }> = [
            {
                name: 'Salesforce',
                status: 'connected' as const,
                icon: '☁️',
                lastSync: '2026-02-07T17:45:00Z',
                records: '1,247',
                description: 'CRM - Opportunités et clients'
            },
            {
                name: 'ERP Neemba',
                status: 'connected' as const,
                icon: '💼',
                lastSync: '2026-02-07T18:00:00Z',
                records: '3,842',
                description: 'Historique achats et facturation'
            },
            {
                name: 'Azure AD',
                status: 'pending' as const,
                icon: '🔐',
                lastSync: null,
                records: '0',
                description: 'Authentification SSO (Production)'
            },
            {
                name: 'ARMP Sénégal',
                status: 'connected' as const,
                icon: '📋',
                lastSync: '2026-02-07T17:55:00Z',
                records: '156',
                description: 'Appels d\'offres publics'
            },
        ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">Intégrations Externes</h3>
                <button className="px-4 py-2 bg-caterpillar-yellow text-caterpillar-black rounded-lg font-medium hover:bg-caterpillar-orange transition-colors">
                    + Nouvelle Intégration
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration, idx) => (
                    <IntegrationCard key={idx} integration={integration} />
                ))}
            </div>
        </div>
    );
}

// Helper Components
interface HealthCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    sublabel?: string;
    status: 'success' | 'warning' | 'error';
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
}

function HealthCard({ icon: Icon, label, value, sublabel, status }: HealthCardProps) {
    const statusColors = {
        success: 'from-green-500/20 to-green-600/20 border-green-500/30',
        warning: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
        error: 'from-red-500/20 to-red-600/20 border-red-500/30',
    };

    return (
        <div className={`glass rounded-2xl p-6 bg-gradient-to-br ${statusColors[status]} border`}>
            <div className="flex items-center justify-between mb-4">
                <Icon size={24} className="text-white" />
                <CheckCircle size={20} className="text-green-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">{label}</p>
            <div className="flex items-baseline space-x-2">
                <h3 className="text-white text-3xl font-bold">{value}</h3>
                {sublabel && <span className="text-slate-400 text-sm">{sublabel}</span>}
            </div>
        </div>
    );
}

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}

function TabButton({ active, onClick, icon: Icon, label }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${active
                ? 'text-caterpillar-yellow border-b-2 border-caterpillar-yellow'
                : 'text-slate-400 hover:text-white'
                }`}
        >
            <Icon size={18} />
            <span>{label}</span>
        </button>
    );
}

interface ConfigSectionProps {
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
}

function ConfigSection({ icon: Icon, title, description, children }: ConfigSectionProps) {
    return (
        <div className="glass rounded-lg p-5 border border-slate-700">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Icon className="text-caterpillar-yellow" size={24} />
                    <div>
                        <h4 className="text-white font-medium">{title}</h4>
                        <p className="text-slate-400 text-sm">{description}</p>
                    </div>
                </div>
                <button className="text-caterpillar-yellow text-sm font-medium hover:text-caterpillar-orange">
                    Modifier
                </button>
            </div>
            <div className="space-y-3 mt-4">
                {children}
            </div>
        </div>
    );
}

function ConfigItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
            <span className="text-slate-400 text-sm">{label}</span>
            <span className="text-white text-sm font-medium">{value}</span>
        </div>
    );
}

interface IntegrationCardProps {
    integration: {
        name: string;
        status: 'connected' | 'pending' | 'error';
        icon: string;
        lastSync: string | null;
        records: string;
        description: string;
    };
}

function IntegrationCard({ integration }: IntegrationCardProps) {
    const statusConfig = {
        connected: { color: 'bg-green-500', text: 'Connecté' },
        pending: { color: 'bg-yellow-500', text: 'En attente' },
        error: { color: 'bg-red-500', text: 'Erreur' },
    };

    const status = statusConfig[integration.status];

    return (
        <div className="glass rounded-lg p-5 border border-slate-700 hover:bg-slate-800/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                        <h4 className="text-white font-medium">{integration.name}</h4>
                        <p className="text-slate-400 text-xs">{integration.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
                    <span className="text-slate-400 text-xs">{status.text}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-slate-800/30 rounded p-2">
                    <p className="text-slate-400 text-xs">Dernière sync</p>
                    <p className="text-white text-sm font-medium">
                        {integration.lastSync ? new Date(integration.lastSync).toLocaleTimeString('fr-FR') : 'N/A'}
                    </p>
                </div>
                <div className="bg-slate-800/30 rounded p-2">
                    <p className="text-slate-400 text-xs">Enregistrements</p>
                    <p className="text-white text-sm font-medium">{integration.records}</p>
                </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
                <button className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white text-sm font-medium transition-colors">
                    Configurer
                </button>
                <button className="flex-1 px-3 py-2 bg-caterpillar-yellow hover:bg-caterpillar-orange text-caterpillar-black rounded text-sm font-medium transition-colors">
                    Synchroniser
                </button>
            </div>
        </div>
    );
}
