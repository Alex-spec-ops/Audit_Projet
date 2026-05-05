import type { ProjectExtraction, CompetitiveAnalysis, Competitor, MarketLandscape } from '../types';

export async function generateCompetitiveAnalysis(extraction: ProjectExtraction): Promise<CompetitiveAnalysis> {
  // Simuler un délai d'appel à une API LLM / Recherche Web
  await new Promise(resolve => setTimeout(resolve, 2500));

  const concurrents: Competitor[] = [
    {
      id: 'comp-1',
      name: `Leader ${extraction.secteur || 'du secteur'}`,
      website: 'leader-historique.com',
      description: `Acteur dominant sur le marché de ${extraction.proposition_valeur ? 'la ' + extraction.proposition_valeur.toLowerCase() : 'ce secteur'} avec une solution complète.`,
      propositionValeur: 'Une suite logicielle complète pour les professionnels.',
      fonctionnalitesCles: [extraction.fonctionnalites[0] || 'Dashboard avancé', 'API publique', 'Gestion multi-comptes'],
      strengths: ['Notoriété', 'Base client existante', 'Richesse fonctionnelle'],
      weaknesses: ['Prix élevé', 'Interface vieillissante', 'Lenteur d\'itération'],
      pricing: 'Premium',
      traction: '10k+ clients, CA important',
      positioning: 'Premium / Enterprise',
      type: 'direct',
      threatLevel: 'high'
    },
    {
      id: 'comp-2',
      name: `Startup ${extraction.titre_projet ? extraction.titre_projet + ' Clone' : 'Agile'}`,
      website: 'startup-agile.io',
      description: `Nouvel acteur agile ciblant le public de ${extraction.cible || 'la niche'} avec une approche moderne.`,
      propositionValeur: `La simplicité pour ${extraction.cible || 'les indépendants'}.`,
      fonctionnalitesCles: [extraction.fonctionnalites[1] || 'App native', 'Support 24/7'],
      strengths: ['UX moderne', 'Prix agressif', 'Croissance rapide'],
      weaknesses: ['Manque de fonctionnalités avancées', 'Peu de crédibilité Enterprise'],
      pricing: extraction.modele_economique || 'Freemium',
      traction: '5000 users',
      positioning: 'Entrée de gamme',
      type: 'direct',
      threatLevel: 'medium'
    },
    {
      id: 'comp-3',
      name: 'Solution Alternative',
      website: 'outil-generique.com',
      description: `Utilisation détournée d'outils généralistes pour résoudre le problème : ${extraction.problematique || 'le besoin actuel'}.`,
      propositionValeur: 'Gratuit et flexible, tout le monde sait l\'utiliser.',
      fonctionnalitesCles: ['Collaboration temps réel', 'Templates flexibles'],
      strengths: ['Coût zéro', 'Flexibilité totale', 'Zéro friction'],
      weaknesses: ['Pas automatisé', 'Erreurs manuelles', 'Ne passe pas à l\'échelle'],
      pricing: 'Gratuit',
      traction: 'Des millions d\'utilisateurs (détourné)',
      positioning: 'Outil généraliste',
      type: 'alternative',
      threatLevel: 'low'
    }
  ];

  const landscape: MarketLandscape = {
    saturation_marche: 'moyen',
    saturation_justification: `Le marché du ${extraction.secteur || 'SaaS'} est compétitif, mais la cible (${extraction.cible || 'votre niche'}) reste souvent mal desservie par les outils existants.`,
    barrieres_entree: [
      `Développement des fonctionnalités clés : ${extraction.fonctionnalites.slice(0, 2).join(', ')}`,
      `Acquisition de la cible : ${extraction.cible || 'les utilisateurs finaux'}`,
      'Création d\'un moat défendable technologiquement'
    ],
    opportunites: [
      `Créer une UX vraiment pensée pour ${extraction.cible || 'cette cible'}`,
      `Mieux monétiser via le modèle : ${extraction.modele_economique || 'SaaS'}`,
      'Profiter de la lenteur des acteurs établis'
    ],
    tendances: [
      'Attente croissante de simplicité (Product-Led Growth)',
      `L'IA pour automatiser le besoin : ${extraction.problematique || 'le processus métier'}`,
      'Consolidation des outils'
    ]
  };

  return {
    concurrents,
    landscape,
    generatedAt: new Date().toISOString()
  };
}
