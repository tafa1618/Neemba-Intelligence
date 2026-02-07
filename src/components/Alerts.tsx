import { Bell, TrendingUp, Target, Users, Building2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { alerts } from '../data/alerts';

export default function Alerts() {
    const unreadAlerts = alerts.filter(a => !a.read);
    const readAlerts = alerts.filter(a => a.read);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Alertes & Insights</h1>
                    <p className="text-slate-400">Notifications intelligentes en temps réel</p>
                </div>
                <div className="glass rounded-xl px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30">
                    <div className="flex items-center space-x-2">
                        <Bell className="text-red-400" size={24} />
                        <div>
                            <p className="text-3xl font-bold text-white">{unreadAlerts.length}</p>
                            <p className="text-red-300 text-sm">Non lues</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {[
                    { label: 'Toutes', count: alerts.length, color: 'slate' },
                    { label: 'Opportunités', count: alerts.filter(a => a.type === 'opportunity').length, color: 'green' },
                    { label: 'Concurrents', count: alerts.filter(a => a.type === 'competitor').length, color: 'red' },
                    { label: 'Tendances', count: alerts.filter(a => a.type === 'trend').length, color: 'blue' },
                    { label: 'Clients', count: alerts.filter(a => a.type === 'client').length, color: 'yellow' },
                ].map((tab, idx) => (
                    <button
                        key={idx}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${idx === 0
                                ? 'bg-gradient-to-r from-caterpillar-yellow to-caterpillar-orange text-black font-semibold'
                                : 'glass text-slate-300 hover:text-white'
                            }`}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            {/* Unread Alerts */}
            {unreadAlerts.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Non Lues</h2>
                    <div className="space-y-3">
                        {unreadAlerts.map((alert) => (
                            <AlertCard key={alert.id} alert={alert} />
                        ))}
                    </div>
                </div>
            )}

            {/* Read Alerts */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Historique</h2>
                <div className="space-y-3">
                    {readAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function AlertCard({ alert }: { alert: typeof alerts[0] }) {
    const getIcon = () => {
        switch (alert.type) {
            case 'opportunity': return Target;
            case 'competitor': return Users;
            case 'trend': return TrendingUp;
            case 'client': return Building2;
            default: return Bell;
        }
    };

    const getColorClasses = () => {
        if (!alert.read) {
            switch (alert.priority) {
                case 'high': return 'from-red-500/20 to-red-600/20 border-red-500/40';
                case 'medium': return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/40';
                case 'low': return 'from-blue-500/20 to-blue-600/20 border-blue-500/40';
            }
        }
        return 'from-slate-700/20 to-slate-800/20 border-slate-700/40';
    };

    const getPriorityIcon = () => {
        switch (alert.priority) {
            case 'high': return <AlertCircle className="text-red-400" size={16} />;
            case 'medium': return <AlertTriangle className="text-yellow-400" size={16} />;
            case 'low': return <Info className="text-blue-400" size={16} />;
        }
    };

    const Icon = getIcon();
    const timeAgo = getTimeAgo(alert.timestamp);

    return (
        <div className={`glass rounded-xl p-5 bg-gradient-to-r ${getColorClasses()} border ${!alert.read ? 'shadow-lg' : 'opacity-60'}`}>
            <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${alert.type === 'opportunity' ? 'bg-green-500/20 text-green-400' :
                        alert.type === 'competitor' ? 'bg-red-500/20 text-red-400' :
                            alert.type === 'trend' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    <Icon size={24} />
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            {getPriorityIcon()}
                            <h3 className="text-white font-semibold">{alert.title}</h3>
                        </div>
                        {!alert.read && (
                            <span className="px-2 py-1 bg-caterpillar-yellow text-black text-xs font-bold rounded-full">
                                NEW
                            </span>
                        )}
                    </div>

                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">{alert.description}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs">{timeAgo}</span>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors">
                                Voir détails
                            </button>
                            {!alert.read && (
                                <button className="px-3 py-1 bg-caterpillar-yellow hover:bg-caterpillar-orange text-black text-xs font-medium rounded-lg transition-colors">
                                    Marquer lu
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getTimeAgo(timestamp: string): string {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'À l\'instant';
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
    return `Il y a ${Math.floor(seconds / 86400)}j`;
}
