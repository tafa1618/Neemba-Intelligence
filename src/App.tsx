import { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Pipeline from './components/Pipeline';
import Competitors from './components/Competitors';
import Alerts from './components/Alerts';
import Clients from './components/Clients';
import Admin from './components/Admin';
import Login from './components/Login';

type Page = 'dashboard' | 'pipeline' | 'competitors' | 'alerts' | 'clients' | 'admin';

interface User {
    email: string;
    role: string;
}

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [user, setUser] = useState<User | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('neemba_user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                if (parsedUser && parsedUser.email && parsedUser.role) {
                    setUser(parsedUser);
                } else {
                    // Invalid data structure
                    localStorage.removeItem('neemba_user');
                }
            } catch (error) {
                console.error('Failed to parse user session:', error);
                localStorage.removeItem('neemba_user');
            }
        }
    }, []);

    const handleLogin = (email: string, role: string) => {
        const userData = { email, role };
        setUser(userData);
        localStorage.setItem('neemba_user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('neemba_user');
        setCurrentPage('dashboard');
    };

    // If not logged in, show login page
    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'pipeline':
                return <Pipeline />;
            case 'competitors':
                return <Competitors />;
            case 'alerts':
                return <Alerts />;
            case 'clients':
                return <Clients />;
            case 'admin':
                return <Admin userEmail={user.email} userRole={user.role} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar currentPage={currentPage} onPageChange={(page) => setCurrentPage(page as Page)} userRole={user.role} />

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto animate-fadeIn">
                    {/* User Info & Logout */}
                    <div className="flex justify-end mb-4">
                        <div className="flex items-center space-x-4 glass px-4 py-2 rounded-lg">
                            <div className="text-right">
                                <p className="text-white text-sm font-medium">{user.email}</p>
                                <p className="text-slate-400 text-xs capitalize">{user.role}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                                title="Déconnexion"
                            >
                                <LogOut size={18} className="text-slate-400 group-hover:text-red-400" />
                            </button>
                        </div>
                    </div>

                    {renderPage()}
                </div>
            </main>
        </div>
    );
}

export default App;
