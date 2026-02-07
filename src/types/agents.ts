export interface AgentActivity {
    id: string;
    agentName: string;
    agentType: 'scraper' | 'enrichment' | 'scoring' | 'alerts' | 'nlp';
    status: 'running' | 'idle' | 'success' | 'error';
    lastRun: string;
    nextRun?: string;
    tasksCompleted: number;
    tasksToday: number;
    successRate: number;
    currentTask?: string;
    logs: AgentLog[];
}

export interface AgentLog {
    id: string;
    timestamp: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    details?: string;
}
