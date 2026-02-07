import { AgentActivity } from '../types/agents';

export const mockAgents: AgentActivity[] = [
    {
        id: 'agent-1',
        agentName: 'Agent Scraping ARMP',
        agentType: 'scraper',
        status: 'running',
        lastRun: '2026-02-07T17:55:00Z',
        nextRun: '2026-02-08T06:00:00Z',
        tasksCompleted: 1247,
        tasksToday: 12,
        successRate: 98.5,
        currentTask: 'Scraping nouveaux appels d\'offres ARMP Sénégal...',
        logs: [
            {
                id: 'log-1',
                timestamp: '2026-02-07T17:55:23Z',
                type: 'success',
                message: '12 nouveaux AO détectés',
                details: 'Construction: 8, Énergie: 2, Mines: 2'
            },
            {
                id: 'log-2',
                timestamp: '2026-02-07T17:55:15Z',
                type: 'info',
                message: 'Connexion au portail ARMP',
                details: 'https://www.armp.sn/appels-offres'
            },
            {
                id: 'log-3',
                timestamp: '2026-02-07T17:55:10Z',
                type: 'info',
                message: 'Démarrage scraping quotidien',
            },
        ]
    },
    {
        id: 'agent-2',
        agentName: 'Agent Enrichissement Clients',
        agentType: 'enrichment',
        status: 'success',
        lastRun: '2026-02-07T17:45:00Z',
        nextRun: '2026-02-07T18:45:00Z',
        tasksCompleted: 3842,
        tasksToday: 156,
        successRate: 99.2,
        currentTask: undefined,
        logs: [
            {
                id: 'log-4',
                timestamp: '2026-02-07T17:45:42Z',
                type: 'success',
                message: '156 profils clients enrichis',
                details: 'Salesforce: 89, ERP: 67, Web: 45 signaux détectés'
            },
            {
                id: 'log-5',
                timestamp: '2026-02-07T17:45:20Z',
                type: 'info',
                message: 'Fusion données Salesforce + ERP',
            },
            {
                id: 'log-6',
                timestamp: '2026-02-07T17:45:05Z',
                type: 'warning',
                message: '3 clients avec données incomplètes',
                details: 'Clients sans email ou téléphone'
            },
        ]
    },
    {
        id: 'agent-3',
        agentName: 'Agent Scoring Opportunités',
        agentType: 'scoring',
        status: 'idle',
        lastRun: '2026-02-07T17:30:00Z',
        nextRun: '2026-02-07T18:30:00Z',
        tasksCompleted: 2156,
        tasksToday: 87,
        successRate: 97.8,
        currentTask: undefined,
        logs: [
            {
                id: 'log-7',
                timestamp: '2026-02-07T17:30:45Z',
                type: 'success',
                message: '87 opportunités scorées',
                details: 'Haute priorité: 12, Moyenne: 45, Basse: 30'
            },
            {
                id: 'log-8',
                timestamp: '2026-02-07T17:30:30Z',
                type: 'info',
                message: 'Calcul scores avec historique ERP',
            },
            {
                id: 'log-9',
                timestamp: '2026-02-07T17:30:15Z',
                type: 'info',
                message: 'Analyse concurrence (SMT, Bia)',
            },
        ]
    },
    {
        id: 'agent-4',
        agentName: 'Agent Génération Alertes',
        agentType: 'alerts',
        status: 'success',
        lastRun: '2026-02-07T18:00:00Z',
        nextRun: '2026-02-07T19:00:00Z',
        tasksCompleted: 1893,
        tasksToday: 23,
        successRate: 99.8,
        currentTask: undefined,
        logs: [
            {
                id: 'log-10',
                timestamp: '2026-02-07T18:00:34Z',
                type: 'success',
                message: '5 alertes haute priorité générées',
                details: 'SMT approche Eiffage, APIX nouveau projet 280M'
            },
            {
                id: 'log-11',
                timestamp: '2026-02-07T18:00:20Z',
                type: 'info',
                message: 'Analyse patterns comportementaux',
            },
            {
                id: 'log-12',
                timestamp: '2026-02-07T18:00:10Z',
                type: 'success',
                message: 'Emails envoyés à 3 commerciaux',
            },
        ]
    },
    {
        id: 'agent-5',
        agentName: 'Agent NLP Analyse Documents',
        agentType: 'nlp',
        status: 'running',
        lastRun: '2026-02-07T18:10:00Z',
        nextRun: '2026-02-07T18:40:00Z',
        tasksCompleted: 567,
        tasksToday: 8,
        successRate: 94.3,
        currentTask: 'Analyse PDF AO Extension Port Dakar (450M CFA)...',
        logs: [
            {
                id: 'log-13',
                timestamp: '2026-02-07T18:10:45Z',
                type: 'info',
                message: 'Extraction entités: Client, Montant, Deadline',
            },
            {
                id: 'log-14',
                timestamp: '2026-02-07T18:10:30Z',
                type: 'success',
                message: 'Document analysé: Extension Port Dakar',
                details: 'Équipements: Grues, Chargeuses. Concurrent: Bia détecté'
            },
            {
                id: 'log-15',
                timestamp: '2026-02-07T18:10:15Z',
                type: 'warning',
                message: 'PDF de mauvaise qualité (scan)',
                details: 'OCR appliqué avec 87% confiance'
            },
        ]
    },
    {
        id: 'agent-6',
        agentName: 'Agent Scraping SMT',
        agentType: 'scraper',
        status: 'error',
        lastRun: '2026-02-07T17:20:00Z',
        nextRun: '2026-02-07T18:20:00Z',
        tasksCompleted: 892,
        tasksToday: 0,
        successRate: 91.2,
        currentTask: undefined,
        logs: [
            {
                id: 'log-16',
                timestamp: '2026-02-07T17:20:45Z',
                type: 'error',
                message: 'Timeout connexion site SMT',
                details: 'Retry prévu dans 1h. Erreur: Connection timeout after 30s'
            },
            {
                id: 'log-17',
                timestamp: '2026-02-07T17:20:30Z',
                type: 'info',
                message: 'Tentative connexion https://smt.sn',
            },
            {
                id: 'log-18',
                timestamp: '2026-02-07T16:20:23Z',
                type: 'success',
                message: 'Dernière exécution réussie',
                details: '3 nouveaux projets détectés'
            },
        ]
    },
];

// Simulate real-time updates
export function getAgentUpdates(): AgentActivity[] {
    return mockAgents.map(agent => ({
        ...agent,
        // Simulate progress for running agents
        currentTask: agent.status === 'running' ? agent.currentTask : undefined,
    }));
}
