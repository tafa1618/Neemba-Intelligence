export interface Opportunity {
    id: string;
    title: string;
    client: string;
    value: number;
    currency: string;
    sector: 'construction' | 'energy' | 'mining';
    status: 'nouveau' | 'qualifie' | 'preparation' | 'soumis' | 'gagne' | 'perdu';
    deadline: string;
    competitors: string[];
    description: string;
    probability: number;
    region: string;
}

export interface Competitor {
    id: string;
    name: string;
    brand: string;
    marketShare: number;
    recentWins: number;
    strengths: string[];
    weaknesses: string[];
}

export interface Alert {
    id: string;
    type: 'opportunity' | 'competitor' | 'trend' | 'client';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
}

export interface Client {
    id: string;
    name: string;
    sector: string;
    region: string;
    revenue: number;
    lastPurchase: string;
    purchaseHistory: number;
    signals: string[];
}

export interface KPI {
    label: string;
    value: string | number;
    change: number;
    trend: 'up' | 'down' | 'stable';
}
