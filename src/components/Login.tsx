import { useState } from 'react';
import { LogIn, AlertCircle, Building2 } from 'lucide-react';

interface LoginProps {
    onLogin: (email: string, role: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock users for demo
    const mockUsers = [
        { email: 'admin@neemba.com', password: 'admin123', role: 'admin', name: 'Administrateur' },
        { email: 'commercial@neemba.com', password: 'demo123', role: 'commercial', name: 'Commercial' },
        { email: 'manager@neemba.com', password: 'demo123', role: 'manager', name: 'Manager' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            // Validate @neemba.com domain
            if (!email.endsWith('@neemba.com')) {
                setError('Seules les adresses @neemba.com sont autorisées');
                setLoading(false);
                return;
            }

            // Check credentials
            const user = mockUsers.find(u => u.email === email && u.password === password);

            if (user) {
                onLogin(user.email, user.role);
            } else {
                setError('Email ou mot de passe incorrect');
            }

            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #FFCD11 0, #FFCD11 1px, transparent 0, transparent 50%)`,
                    backgroundSize: '10px 10px'
                }}></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-caterpillar-yellow to-caterpillar-orange rounded-2xl shadow-2xl mb-4">
                        <Building2 size={40} className="text-caterpillar-black" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Neemba <span className="text-caterpillar-yellow">Intelligence</span>
                    </h1>
                    <p className="text-slate-400 italic">"La puissance Cat®, la maîtrise Neemba"</p>
                </div>

                {/* Login Card */}
                <div className="glass rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Connexion</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Email professionnel
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="votre.nom@neemba.com"
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-caterpillar-yellow focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-caterpillar-yellow focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <AlertCircle size={18} className="text-red-400" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-caterpillar-yellow to-caterpillar-orange text-caterpillar-black font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-caterpillar-black border-t-transparent rounded-full animate-spin"></div>
                                    <span>Connexion...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    <span>Se connecter</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-slate-700">
                        <p className="text-slate-400 text-xs mb-3">Comptes de démonstration :</p>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center p-2 bg-slate-800/30 rounded">
                                <span className="text-slate-300">Admin</span>
                                <code className="text-caterpillar-yellow">admin@neemba.com / admin123</code>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-800/30 rounded">
                                <span className="text-slate-300">Commercial</span>
                                <code className="text-caterpillar-yellow">commercial@neemba.com / demo123</code>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-slate-500 text-sm">
                        Neemba Cat Sénégal • Construction • Énergie • Mines
                    </p>
                    <p className="text-slate-600 text-xs mt-2">
                        🔒 Authentification Azure AD disponible en production
                    </p>
                </div>
            </div>
        </div>
    );
}
