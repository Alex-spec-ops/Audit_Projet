import type { ProjectExtraction, CompetitiveAnalysis, ScoreCriteria } from '../types';

export interface ScoreAnalysisResult {
  score_global: number;
  niveau: 'Faible' | 'Moyen' | 'Bon' | 'Excellent';
  resume_score: string;
  scoreBreakdown: ScoreCriteria[];
}

export async function generateFeasibilityScore(
  extraction: ProjectExtraction,
  competition: CompetitiveAnalysis
): Promise<ScoreAnalysisResult> {
  // Simuler un appel API LLM pour le scoring
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulation d'une réponse de l'investisseur IA
  return {
    score_global: 72,
    niveau: 'Bon',
    resume_score: `Le projet "${extraction.titre_projet || 'analysé'}" présente un potentiel réel sur le marché de ${extraction.secteur || 'la tech'}. Le concept est pertinent pour la cible identifiée. Cependant, la concurrence est forte et le modèle économique prévu nécessite d'être testé avant tout développement.`,
    scoreBreakdown: [
      {
        id: 'pertinence_probleme',
        name: 'Pertinence du problème',
        score: 17,
        maxScore: 20,
        justification: `Le problème ("${extraction.problematique || 'identifié'}") est réel et crée un besoin clair de solution pour ${extraction.cible || 'votre cible'}.`,
        details: 'Le TAM (Total Addressable Market) semble intéressant, bien que la volonté de payer reste à valider précisément.'
      },
      {
        id: 'differenciation',
        name: 'Différenciation',
        score: 11,
        maxScore: 20,
        justification: `La proposition ("${extraction.proposition_valeur || 'concept'}") reste basique. La différenciation face aux acteurs existants est floue.`,
        details: 'Aucun avantage défendable clair n\'est défini à ce stade. Il faudra créer un effet de réseau fort ou une approche radicalement différente.'
      },
      {
        id: 'faisabilite_technique',
        name: 'Faisabilité technique',
        score: 12,
        maxScore: 15,
        justification: `Le développement des fonctionnalités (ex: ${extraction.fonctionnalites[0] || 'core feature'}) est réalisable avec les technologies actuelles.`,
        details: 'Attention cependant à ne pas sous-estimer le temps et les coûts liés aux fonctionnalités avancées dès le V1.'
      },
      {
        id: 'viabilite_economique',
        name: 'Viabilité économique',
        score: 8,
        maxScore: 15,
        justification: `Le modèle envisagé (${extraction.modele_economique || 'actuel'}) est risqué et potentiellement inadapté à la cible.`,
        details: 'Le LTV/CAC actuel est impossible à calculer sans tester l\'acquisition réelle via une landing page.'
      },
      {
        id: 'timing_marche',
        name: 'Timing marché',
        score: 8,
        maxScore: 10,
        justification: `Momentum correct. Les attentes des utilisateurs de ce secteur évoluent vers plus de simplicité.`,
        details: 'La digitalisation de ces usages s\'accélère, la fenêtre est donc bonne mais pourrait se refermer rapidement.'
      },
      {
        id: 'barrieres_concurrentielles',
        name: 'Barrières concurrentielles',
        score: 6,
        maxScore: 10,
        justification: 'Le projet est relativement facile à copier pour un acteur établi. Le succès dépendra de l\'exécution.',
        details: 'Créer de l\'engagement et une base utilisateur très fidèle sera le seul vrai moat au démarrage.'
      },
      {
        id: 'scalabilite',
        name: 'Scalabilité',
        score: 10,
        maxScore: 10,
        justification: 'Une fois le produit développé, le modèle logiciel permet en principe un coût marginal faible.',
        details: 'Une expansion est possible si le processus d\'onboarding est suffisamment automatisé.'
      }
    ]
  };
}
