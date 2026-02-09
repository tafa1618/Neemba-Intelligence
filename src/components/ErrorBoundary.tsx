import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        // Here you could send the error to a logging service
    }

    private handleReset = () => {
        // Clear local storage as it might be the cause
        localStorage.clear();
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                    <div className="glass max-w-md w-full p-8 rounded-2xl text-center border-red-500/30">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={32} className="text-red-500" />
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">Oups ! Une erreur est survenue</h1>
                        <p className="text-slate-400 mb-6">
                            L'application a rencontré un problème inattendu. Nous avons nettoyé les données locales par sécurité.
                        </p>

                        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-left overflow-auto max-h-32">
                            <code className="text-red-400 text-xs font-mono">
                                {this.state.error?.message || 'Erreur inconnue'}
                            </code>
                        </div>

                        <button
                            onClick={this.handleReset}
                            className="w-full bg-gradient-to-r from-caterpillar-yellow to-caterpillar-orange text-caterpillar-black font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                        >
                            <RefreshCw size={18} />
                            <span>Recharger l'application</span>
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
