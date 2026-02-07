import { LayoutDashboard, TrendingUp, Users, Bell, Building2 } from 'lucide-react';

interface SidebarProps {
    currentPage: string;
    onPageChange: (page: string) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
        { id: 'competitors', label: 'Concurrence', icon: Users },
        { id: 'alerts', label: 'Alertes', icon: Bell },
        { id: 'clients', label: 'Clients', icon: Building2 },
    ];

    return (
        <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-caterpillar-yellow to-caterpillar-orange rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-xl">N</span>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg">Neemba</h1>
                        <p className="text-slate-400 text-xs">Intelligence</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onPageChange(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-gradient-to-r from-caterpillar-yellow to-caterpillar-orange text-black font-semibold shadow-lg'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                            {item.id === 'alerts' && (
                                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    5
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
                <div className="text-slate-400 text-xs text-center">
                    <p>Neemba Cat Sénégal</p>
                    <p className="mt-1">Veille Concurrentielle v1.0</p>
                </div>
            </div>
        </div>
    );
}
