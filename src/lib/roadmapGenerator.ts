/**
 * roadmapGenerator.ts — Prompt 5 : Génération de la Roadmap
 *
 * Génère une RoadmapData complète en 6 phases adaptée au score :
 *  - Score < 50  → focus validation intensive (durées allongées, budgets réduits)
 *  - Score 50-70 → approche équilibrée
 *  - Score > 70  → roadmap agressive
 */

import type {
  ProjectExtraction,
  CompetitiveAnalysis,
  RoadmapData,
  RoadmapPhase,
} from '../types';
import type { ScoreAnalysisResult } from './scoreAnalyzer';
import type { CritiqueData } from '../types';

// ─── Tier helpers ─────────────────────────────────────────────────────────────

type Tier = 'low' | 'medium' | 'high';

function getTier(score: number): Tier {
  if (score < 50) return 'low';
  if (score <= 70) return 'medium';
  return 'high';
}

// Durations adapt to tier
const DURATIONS: Record<Tier, string[]> = {
  low:    ['Semaines 1-6', 'Mois 2-3', 'Mois 4-7', 'Mois 8-11', 'Mois 12-15', 'Mois 16-24'],
  medium: ['Semaines 1-4', 'Mois 1-2', 'Mois 3-5', 'Mois 6-8',  'Mois 9-12',  'Mois 13-18'],
  high:   ['Semaines 1-3', 'Mois 1-2', 'Mois 2-4', 'Mois 5-7',  'Mois 8-11',  'Mois 12-16'],
};

const BUDGETS: Record<Tier, string[]> = {
  low: [
    '200 – 800 €', '1 000 – 3 000 €', '8 000 – 18 000 €',
    '3 000 – 8 000 €', '10 000 – 25 000 €', '150 000 – 400 000 €',
  ],
  medium: [
    '500 – 2 000 €', '1 000 – 5 000 €', '15 000 – 30 000 €',
    '5 000 – 15 000 €', '15 000 – 40 000 €', '200 000 – 500 000 €',
  ],
  high: [
    '500 – 1 500 €', '2 000 – 6 000 €', '20 000 – 40 000 €',
    '8 000 – 20 000 €', '20 000 – 60 000 €', '500 000 – 1 500 000 €',
  ],
};

const BUDGET_GLOBAL: Record<Tier, string> = {
  low:    '25 000 – 60 000 € sur 18-24 mois (validation obligatoire avant tout investissement)',
  medium: '45 000 – 100 000 € sur 18 mois (bootstrappable avec 2 fondateurs tech)',
  high:   '80 000 – 200 000 € sur 16 mois (levée de fonds conseillée dès le mois 9)',
};

// ─── Phase builders ────────────────────────────────────────────────────────────

function buildPhase0(
  tier: Tier,
  extraction: ProjectExtraction,
  critique: CritiqueData,
  idx: number
): RoadmapPhase {
  const dur = DURATIONS[tier][idx];
  const budget = BUDGETS[tier][idx];

  const interviewCount = tier === 'low' ? 50 : tier === 'medium' ? 30 : 20;
  const preSignupTarget = tier === 'low' ? 5 : tier === 'medium' ? 10 : 15;

  return {
    id: 0,
    name: 'Validation',
    duration: dur,
    icon: '🔍',
    isCurrentPhase: true,
    objectifs: [
      `Interviewer ${interviewCount} ${extraction.cible || 'utilisateurs cibles'} pour valider le problème et le willingness to pay`,
      'Créer une landing page et A/B tester 3 propositions de valeur différentes',
      `Obtenir ${preSignupTarget} pré-inscriptions payantes comme preuve de demande réelle`,
      `Identifier les failles exploitables dans : ${critique.menaces_reelles.slice(0, 2).map(m => m.split(':')[0]).join(', ')}`,
    ],
    livrables: [
      `Synthèse de ${interviewCount} entretiens utilisateurs (problèmes, motivations, budget)`,
      'Landing page A/B testée avec résultats de conversion par variante',
      `Liste de ${preSignupTarget} pré-inscrits avec accord de paiement`,
      'Matrice concurrentielle annotée avec failles identifiées',
    ],
    ressources: { budget, personnes: '1-2 fondateurs', temps: dur },
    kpis: [
      `${preSignupTarget} pré-inscriptions à prix cible validé`,
      'Taux de réponse aux interviews > 60%',
      'Taux de conversion landing page > 3%',
      `NPS intention d'achat ≥ 7/10 sur ${interviewCount} interrogés`,
    ],
    risques: [
      `${critique.faiblesses_majeures[0] ?? 'Refus de payer — pivoter le modèle de monétisation'}`,
      'Toutes les variantes de landing échouent → retravailler la proposition de valeur',
      'Marché trop fragmenté géographiquement → concentrer sur 1 zone pilote',
    ],
    goNogo: tier === 'low'
      ? `STOP si < 3 pré-inscriptions après 6 semaines. PIVOT obligatoire avant toute dépense dev.`
      : `GO si ${preSignupTarget} pré-inscriptions obtenues. NO-GO si < ${Math.floor(preSignupTarget / 2)} après la durée impartie.`,
  };
}

function buildPhase1(
  tier: Tier,
  extraction: ProjectExtraction,
  idx: number
): RoadmapPhase {
  const dur = DURATIONS[tier][idx];
  const budget = BUDGETS[tier][idx];

  const features = extraction.fonctionnalites.slice(0, 3).join(', ') || '3 fonctionnalités core';

  return {
    id: 1,
    name: 'Pré-dev',
    duration: dur,
    icon: '📐',
    isCurrentPhase: false,
    objectifs: [
      `Rédiger les spécifications fonctionnelles pour : ${features}`,
      'Choisir et documenter la stack technique définitive',
      'Produire les wireframes des 5 écrans critiques validés par 5 utilisateurs',
      'Mettre en place le repo, CI/CD et environnement staging opérationnel',
    ],
    livrables: [
      'Cahier des charges fonctionnel (10-15 pages, features priorisées MoSCoW)',
      'ADR (Architecture Decision Records) justifiant les choix techniques',
      'Wireframes Figma basse fidélité testés avec des vrais utilisateurs',
      'Infrastructure cloud configurée (repo + pipeline + monitoring de base)',
    ],
    ressources: { budget, personnes: '1 dev + 1 product', temps: dur },
    kpis: [
      'Specs validées par ≥ 3 pré-inscrits de la phase 0',
      'Stack décidée et documentée (pas de dette immédiate)',
      'Wireframes validés avec < 2 cycles de révision',
      'Environnement de dev opérationnel en < 30 min pour un nouveau dev',
    ],
    risques: [
      'Feature creep — scope limité strictement à 3 fonctionnalités core',
      'Stack trop complexe pour l\'équipe actuelle → privilégier la simplicité',
      'Wireframes rejetés en boucle → limiter à 2 itérations max',
    ],
    goNogo: 'GO si specs finalisées et stack validée dans les délais. STOP si désaccord fondateur persistant sur la vision.',
  };
}

function buildPhase2(
  tier: Tier,
  extraction: ProjectExtraction,
  idx: number
): RoadmapPhase {
  const dur = DURATIONS[tier][idx];
  const budget = BUDGETS[tier][idx];

  const maxFeatures = 3;
  const betaUsers = tier === 'low' ? 10 : tier === 'medium' ? 20 : 30;
  const topFeatures = extraction.fonctionnalites.slice(0, maxFeatures);

  return {
    id: 2,
    name: 'MVP',
    duration: dur,
    icon: '🛠️',
    isCurrentPhase: false,
    objectifs: [
      `Livrer ${maxFeatures} features core : ${topFeatures.join(', ') || 'fonctionnalités principales'}`,
      `Onboarding autonome de l'utilisateur cible en < 10 minutes`,
      `Lancer une beta privée avec ${betaUsers} utilisateurs recrutés en phase 0`,
      'Atteindre un NPS bêta ≥ 7/10 avant tout lancement public',
    ],
    livrables: [
      `Application ${extraction.secteur === 'FoodTech' || extraction.secteur === 'HealthTech' ? 'mobile' : 'web'} déployée en production`,
      'Backend API + authentification + données persistantes',
      `Onboarding testé sur ${betaUsers} sessions enregistrées`,
      'Rapport de bêta : bugs critiques, NPS, intentions d\'usage',
    ],
    ressources: { budget, personnes: '1-2 devs + 1 product', temps: dur },
    kpis: [
      `${betaUsers} utilisateurs actifs en bêta`,
      'Rétention D7 > 40%',
      'Onboarding < 10 min (mesuré sur sessions réelles)',
      'NPS bêta ≥ 7/10',
    ],
    risques: [
      'Scope qui dépasse les 3 features → couper sans négociation',
      'Performance dégradée → profiling avant lancement (Core Web Vitals)',
      'Zéro engagement bêta → incentiver les early testers (accès gratuit 6 mois)',
    ],
    goNogo: `GO lancement public si NPS ≥ 7 et rétention D7 ≥ 40%. PIVOT si usage réel < 50% de ce qu'attendait le product dans les 6 semaines post-bêta.`,
  };
}

function buildPhase3(
  tier: Tier,
  extraction: ProjectExtraction,
  competition: CompetitiveAnalysis,
  idx: number
): RoadmapPhase {
  const dur = DURATIONS[tier][idx];
  const budget = BUDGETS[tier][idx];

  const userTarget = tier === 'low' ? 50 : tier === 'medium' ? 100 : 200;
  const channels = competition.landscape.opportunites.slice(0, 2).join(', ') || 'SEO local, partenariats';

  return {
    id: 3,
    name: 'Early Adopters',
    duration: dur,
    icon: '🚀',
    isCurrentPhase: false,
    objectifs: [
      `Acquérir les ${userTarget} premiers utilisateurs/clients actifs`,
      `Activer les canaux prioritaires : ${channels}`,
      'Mettre en place une boucle de feedback bi-hebdomadaire documentée',
      'Itérer avec au moins 2 releases majeures basées sur le feedback terrain',
    ],
    livrables: [
      `Programme early adopters (avantages exclusifs contre feedback actif)`,
      'Dashboard métriques : DAU, rétention, churn, NPS hebdo',
      'Changelog public et newsletter bi-mensuelle',
      '2 releases majeures documentées avec motifs de changement',
    ],
    ressources: { budget, personnes: '2 fondateurs + 1 growth freelance', temps: dur },
    kpis: [
      `${userTarget} utilisateurs/clients actifs`,
      `MRR prouvé (même symbolique : ${tier === 'low' ? '500' : tier === 'medium' ? '2 000' : '5 000'}€)`,
      'Churn mensuel < 8%',
      `CAC < ${tier === 'low' ? '150' : tier === 'medium' ? '100' : '80'}€`,
    ],
    risques: [
      'Acquisition trop lente → tester les canaux offline (salons, meetups)',
      'Churn élevé → audit qualité des profils et contenu onboarding',
      'Feedback contradictoire → segmenter par type d\'utilisateur',
    ],
    goNogo: `GO phase croissance si churn < 8% ET MRR en croissance MoM. STOP si ${Math.floor(userTarget / 2)} utilisateurs non atteints à fin de phase.`,
  };
}

function buildPhase4(
  tier: Tier,
  extraction: ProjectExtraction,
  idx: number
): RoadmapPhase {
  const dur = DURATIONS[tier][idx];
  const budget = BUDGETS[tier][idx];

  const mrrTarget = tier === 'low' ? '5 000' : tier === 'medium' ? '10 000' : '20 000';

  return {
    id: 4,
    name: 'Croissance',
    duration: dur,
    icon: '📈',
    isCurrentPhase: false,
    objectifs: [
      'Scaler l\'infrastructure pour supporter 10x le trafic actuel sans dégradation',
      'Optimiser le funnel de conversion (taux de conversion +30% vs phase précédente)',
      `Atteindre ${mrrTarget}€ MRR`,
      `Expansion géographique ou de segment : ${extraction.secteur !== 'Autre' ? '2 nouvelles zones/verticales' : 'ouverture B2B ou B2C selon modèle initial'}`,
    ],
    livrables: [
      'Architecture scalable documentée (auto-scaling, CDN, monitoring avancé)',
      'Funnel A/B testé avec résultats documentés',
      `Nouvelle offre tarifaire : tier Pro ou Enterprise à ${tier === 'low' ? '79€' : tier === 'medium' ? '99€' : '149€'}/mois`,
      'Playbook de lancement nouveau segment/zone (90 jours, checklists)',
    ],
    ressources: { budget, personnes: '2-3 devs + 1 growth + 1 sales', temps: dur },
    kpis: [
      `${mrrTarget}€ MRR`,
      'Croissance MoM > 15%',
      'Temps de chargement < 1.5s (P95)',
      'Taux d\'essai → payant > 20%',
    ],
    risques: [
      'Scalabilité insuffisante aux pics de charge → load testing obligatoire',
      'Concurrence agressive sur les nouveaux segments → veille hebdo',
      'Burn rate trop élevé → allonger la runway avant d\'embaucher',
    ],
    goNogo: `GO levée de fonds ou expansion si ${mrrTarget}€ MRR ET croissance MoM > 15%. PAUSE si taux de conversion stagne après 2 mois d'optimisation.`,
  };
}

function buildPhase5(
  tier: Tier,
  extraction: ProjectExtraction,
  idx: number
): RoadmapPhase {
  const dur = DURATIONS[tier][idx];
  const budget = BUDGETS[tier][idx];

  const arrTarget = tier === 'low' ? '200 000' : tier === 'medium' ? '500 000' : '1 000 000';
  const fundraiseTarget = tier === 'low' ? '500K – 1M€' : tier === 'medium' ? '1 – 2M€' : '2 – 5M€';

  return {
    id: 5,
    name: 'Scale',
    duration: dur,
    icon: '🌍',
    isCurrentPhase: false,
    objectifs: [
      `Lever ${fundraiseTarget} (Seed/Série A) ou atteindre la profitabilité en bootstrapping`,
      `Atteindre ${arrTarget}€ ARR`,
      'Automatiser l\'acquisition (SEO programmatique, intégrations, partenariats)',
      'Constituer l\'équipe cœur : Head of Sales, Head of Growth, CTO/Lead Dev',
    ],
    livrables: [
      `Pitch deck investisseurs + data room (ou P&L positif bootstrapped)`,
      `Présence dans ${tier === 'low' ? '2' : tier === 'medium' ? '3' : '5'} pays ou marchés`,
      'Pipeline d\'acquisition automatisé avec attribution multi-canal',
      'Reporting OKRs trimestriels et KPIs investisseurs',
    ],
    ressources: { budget, personnes: `${tier === 'low' ? '4-6' : tier === 'medium' ? '6-10' : '10-20'} personnes`, temps: dur },
    kpis: [
      `${arrTarget}€ ARR`,
      'LTV/CAC ≥ 3x',
      'NPS produit global ≥ 8/10',
      'Churn annuel < 10%',
    ],
    risques: [
      `Levée de fonds échoue → recentrer sur profitabilité bootstrappée immédiate`,
      `Expansion internationale sous-estimée → partenaire local obligatoire par marché`,
      `Équipe insuffisante → recruter un Head of Sales avant Head of Growth`,
    ],
    goNogo: `SCALE si LTV/CAC ≥ 3x ET MRR croît > 10% MoM sur 3 mois consécutifs. PIVOT business model si unit economics négatifs à ce stade.`,
  };
}

// ─── Jalons critiques ─────────────────────────────────────────────────────────

function buildJalons(tier: Tier, extraction: ProjectExtraction): string[] {
  const preSignup = tier === 'low' ? 5 : tier === 'medium' ? 10 : 15;
  const betaRetention = tier === 'low' ? '30%' : tier === 'medium' ? '40%' : '50%';
  const mrrSeed = tier === 'low' ? '2 000' : tier === 'medium' ? '5 000' : '10 000';
  const mrrScale = tier === 'low' ? '10 000' : tier === 'medium' ? '20 000' : '50 000';

  return [
    `Phase 0 : ${preSignup} pré-inscriptions payantes obtenues → GO développement`,
    `Phase 2 : MVP livré + rétention D7 > ${betaRetention} → GO lancement public`,
    `Phase 3 : ${mrrSeed}€ MRR prouvé + churn < 8% → GO décision levée de fonds`,
    `Phase 4 : ${mrrScale}€ MRR + croissance MoM > 15% → GO expansion internationale`,
  ];
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function generateRoadmap(
  extraction: ProjectExtraction,
  competition: CompetitiveAnalysis,
  scoring: ScoreAnalysisResult,
  critique: CritiqueData
): Promise<RoadmapData> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const tier = getTier(scoring.score_global);

  const phases: RoadmapPhase[] = [
    buildPhase0(tier, extraction, critique, 0),
    buildPhase1(tier, extraction, 1),
    buildPhase2(tier, extraction, 2),
    buildPhase3(tier, extraction, competition, 3),
    buildPhase4(tier, extraction, 4),
    buildPhase5(tier, extraction, 5),
  ];

  return {
    phases,
    jalons_critiques: buildJalons(tier, extraction),
    budget_estime: BUDGET_GLOBAL[tier],
  };
}
