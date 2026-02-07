import { Building2, TrendingUp, MapPin, ShoppingCart, AlertCircle } from 'lucide-react';
import { clients } from '../data/clients';

export default function Clients() {
    // Sort by purchase history (most loyal first)
    const sortedClients = [...clients].sort((a, b) => b.purchaseHistory - a.purchaseHistory);

    // Calculate stats
    const totalRevenue = clients.reduce((sum, c) => sum + c.revenue, 0);
    const avgPurchases = Math.round(clients.reduce((sum, c) => sum + c.purchaseHistory, 0) / clients.length);
    const clientsWithSignals = clients.filter(c => c.signals.length > 0).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Base Clients</h1>
                <p className="text-slate-400">Aperçu enrichi de vos clients avec signaux d'achat détectés</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass rounded-2xl p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                    <Building2 className="text-blue-400 mb-3" size={32} />
                    <p className="text-slate-300 text-sm mb-1">Clients Actifs</p>
                    <p className="text-4xl font-bold text-white">{clients.length}</p>
                    <p className="text-slate-400 text-xs mt-1">Sur 3000 total</p>
                </div>

                <div className="glass rounded-2xl p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30">
                    <TrendingUp className="text-green-400 mb-3" size={32} />
                    <p className="text-slate-300 text-sm mb-1">CA Total</p>
                    <p className="text-4xl font-bold text-white">{(totalRevenue / 1000000000).toFixed(1)}Md</p>
                    <p className="text-slate-400 text-xs mt-1">CFA</p>
                </div>

                <div className="glass rounded-2xl p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30">
                    <ShoppingCart className="text-purple-400 mb-3" size={32} />
                    <p className="text-slate-300 text-sm mb-1">Achats Moyens</p>
                    <p className="text-4xl font-bold text-white">{avgPurchases}</p>
                    <p className="text-slate-400 text-xs mt-1">Par client</p>
                </div>

                <div className="glass rounded-2xl p-6 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30">
                    <AlertCircle className="text-yellow-400 mb-3" size={32} />
                    <p className="text-slate-300 text-sm mb-1">Signaux Actifs</p>
                    <p className="text-4xl font-bold text-white">{clientsWithSignals}</p>
                    <p className="text-slate-400 text-xs mt-1">Clients à contacter</p>
                </div>
            </div>

            {/* Clients Table */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Clients Prioritaires</h2>
                <div className="space-y-3">
                    {sortedClients.map((client) => (
                        <div
                            key={client.id}
                            className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-12 h-12 bg-gradient-to-br from-caterpillar-yellow to-caterpillar-orange rounded-lg flex items-center justify-center">
                                            <Building2 className="text-black" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold text-lg">{client.name}</h3>
                                            <p className="text-slate-400 text-sm">{client.sector}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 mb-3">
                                        <div>
                                            <p className="text-slate-400 text-xs">Région</p>
                                            <div className="flex items-center text-white text-sm mt-1">
                                                <MapPin size={14} className="mr-1" />
                                                {client.region}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs">CA Annuel</p>
                                            <p className="text-white font-semibold text-sm mt-1">{(client.revenue / 1000000).toFixed(0)}M CFA</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs">Dernier Achat</p>
                                            <p className="text-white text-sm mt-1">{new Date(client.lastPurchase).toLocaleDateString('fr-FR')}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs">Historique</p>
                                            <p className="text-white font-semibold text-sm mt-1">{client.purchaseHistory} achats</p>
                                        </div>
                                    </div>

                                    {client.signals.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {client.signals.map((signal, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${signal.includes('⚠️') ? 'bg-red-500/20 text-red-300' :
                                                            signal.includes('🔥') ? 'bg-orange-500/20 text-orange-300' :
                                                                'bg-green-500/20 text-green-300'
                                                        }`}
                                                >
                                                    {signal}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button className="ml-4 px-4 py-2 bg-caterpillar-yellow hover:bg-caterpillar-orange text-black font-semibold text-sm rounded-lg transition-colors">
                                    Voir profil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Note */}
            <div className="glass rounded-xl p-4 bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-start space-x-3">
                    <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-slate-300">
                        <p className="font-semibold text-white mb-1">Version Démo</p>
                        <p>Cette vue montre 8 clients échantillons enrichis automatiquement. Dans la version complète, vos 3000 clients seront importés depuis Excel et enrichis quotidiennement avec des signaux d'achat détectés par les agents IA.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
