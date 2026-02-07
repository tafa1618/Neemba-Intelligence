export default function Header() {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-5xl font-bold text-white mb-3">
                        Neemba <span className="text-caterpillar-yellow">Intelligence</span>
                    </h1>
                    <p className="text-slate-400 text-lg italic">
                        "La puissance Cat®, la maîtrise Neemba"
                    </p>
                </div>
                <div className="text-right">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-caterpillar-yellow to-caterpillar-orange rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-caterpillar-black font-black text-3xl">N</span>
                        </div>
                        <div>
                            <p className="text-white font-bold text-2xl">Neemba Cat</p>
                            <p className="text-caterpillar-yellow text-sm font-semibold">Sénégal</p>
                        </div>
                    </div>
                    <p className="text-slate-500 text-xs">
                        Construction • Énergie • Mines
                    </p>
                </div>
            </div>
        </div>
    );
}
