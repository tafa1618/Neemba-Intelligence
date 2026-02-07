import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Pipeline from './components/Pipeline';
import Competitors from './components/Competitors';
import Alerts from './components/Alerts';
import Clients from './components/Clients';

type Page = 'dashboard' | 'pipeline' | 'competitors' | 'alerts' | 'clients';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');

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
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto animate-fadeIn">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
}

export default App;
