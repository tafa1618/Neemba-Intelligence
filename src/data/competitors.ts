import { Competitor } from '../types';

export const competitors: Competitor[] = [
    {
        id: 'comp-1',
        name: 'SMT',
        brand: 'Komatsu',
        marketShare: 35,
        recentWins: 8,
        strengths: [
            'Prix agressifs sur segments terrassement',
            'Stock de pièces détachées important à Rufisque',
            'Service après-vente réactif (< 24h)',
            'Partenariats avec entreprises chinoises (CRBC, CGCOC)',
        ],
        weaknesses: [
            'Gamme limitée en équipements de levage',
            'Moins de présence en régions',
            'Formation techniciens insuffisante',
            'Délais de livraison parfois longs (importations Asie)',
        ],
    },
    {
        id: 'comp-2',
        name: 'Bia',
        brand: 'Volvo',
        marketShare: 28,
        recentWins: 6,
        strengths: [
            'Excellente réputation qualité Volvo',
            'Machines à faible consommation (argument écologique)',
            'Présence forte sur projets BTP premium',
            'Contrats de maintenance tout-inclus attractifs',
        ],
        weaknesses: [
            'Prix élevés (premium pricing)',
            'Gamme excavateurs moins complète que Caterpillar',
            'Réseau de distribution limité hors Dakar',
            'Temps de réponse SAV plus lent en régions',
        ],
    },
    {
        id: 'comp-3',
        name: 'Neemba Cat',
        brand: 'Caterpillar',
        marketShare: 37,
        recentWins: 11,
        strengths: [
            'Leader historique au Sénégal (depuis 1985)',
            'Gamme la plus complète (construction, mines, énergie)',
            'Réseau national (Dakar, Thiès, Saint-Louis, Kaolack)',
            'Expertise technique reconnue',
            'Support groupe Neemba (financement facilité)',
        ],
        weaknesses: [
            'Prix perçus comme élevés',
            'Concurrence accrue sur marchés publics',
            'Veille concurrentielle insuffisante (en cours d\'amélioration)',
        ],
    },
];
