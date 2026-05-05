import type { ScoreLevel, ThreatLevel, Priority } from './types';

// ─── Score helpers ──────────────────────────────────────────────────────────────

export function getScoreLevel(score: number): ScoreLevel {
  if (score <= 40) return 'low';
  if (score <= 60) return 'medium';
  if (score <= 80) return 'good';
  return 'excellent';
}

interface ScoreConfig {
  color: string;
  trackColor: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeClass: string;
  label: string;
  emoji: string;
  levelLabel: string;
}

export function getScoreConfig(score: number): ScoreConfig {
  const level = getScoreLevel(score);
  const map: Record<ScoreLevel, ScoreConfig> = {
    low: {
      color: '#DC2626',
      trackColor: '#FEE2E2',
      bgClass: 'bg-red-50',
      borderClass: 'border-red-200',
      textClass: 'text-red-600',
      badgeClass: 'bg-red-100 text-red-700',
      label: 'Projet à risque élevé',
      emoji: '⚠️',
      levelLabel: 'Faible',
    },
    medium: {
      color: '#F59E0B',
      trackColor: '#FEF3C7',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-200',
      textClass: 'text-amber-600',
      badgeClass: 'bg-amber-100 text-amber-700',
      label: 'Potentiel moyen',
      emoji: '⚡',
      levelLabel: 'Moyen',
    },
    good: {
      color: '#10B981',
      trackColor: '#D1FAE5',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-200',
      textClass: 'text-emerald-600',
      badgeClass: 'bg-emerald-100 text-emerald-700',
      label: 'Bon potentiel',
      emoji: '✅',
      levelLabel: 'Bon',
    },
    excellent: {
      color: '#059669',
      trackColor: '#A7F3D0',
      bgClass: 'bg-green-50',
      borderClass: 'border-green-200',
      textClass: 'text-green-700',
      badgeClass: 'bg-green-100 text-green-800',
      label: 'Excellent potentiel',
      emoji: '🚀',
      levelLabel: 'Excellent',
    },
  };
  return map[level];
}

// ─── Threat level helpers ───────────────────────────────────────────────────────

interface ThreatConfig {
  label: string;
  badgeClass: string;
  dotClass: string;
}

export function getThreatConfig(level: ThreatLevel): ThreatConfig {
  const map: Record<ThreatLevel, ThreatConfig> = {
    low: {
      label: 'Faible',
      badgeClass: 'bg-emerald-100 text-emerald-700',
      dotClass: 'bg-emerald-500',
    },
    medium: {
      label: 'Moyen',
      badgeClass: 'bg-amber-100 text-amber-700',
      dotClass: 'bg-amber-500',
    },
    high: {
      label: 'Élevé',
      badgeClass: 'bg-red-100 text-red-700',
      dotClass: 'bg-red-500',
    },
  };
  return map[level];
}

// ─── Priority helpers ──────────────────────────────────────────────────────────

interface PriorityConfig {
  label: string;
  textClass: string;
  dotClass: string;
}

export function getPriorityConfig(priority: Priority): PriorityConfig {
  const map: Record<Priority, PriorityConfig> = {
    urgent: {
      label: 'Urgent',
      textClass: 'text-red-600',
      dotClass: 'bg-red-500',
    },
    important: {
      label: 'Important',
      textClass: 'text-amber-600',
      dotClass: 'bg-amber-500',
    },
    secondary: {
      label: 'Secondaire',
      textClass: 'text-emerald-600',
      dotClass: 'bg-emerald-500',
    },
  };
  return map[priority];
}

// ─── Industry list ─────────────────────────────────────────────────────────────

export const INDUSTRIES = [
  'SaaS / Logiciel',
  'E-commerce',
  'FoodTech',
  'HealthTech',
  'EdTech',
  'FinTech',
  'PropTech',
  'MarTech',
  'LegalTech',
  'CleanTech',
  'Mobilité',
  'Gaming',
  'Média / Contenu',
  'Marketplace',
  'Intelligence Artificielle',
  'Services B2B',
  'Services B2C',
  'Blockchain / Web3',
  'Autre',
] as const;

// ─── Analyzing stages ─────────────────────────────────────────────────────────

export const ANALYZING_STAGES = [
  { label: 'Analyse de votre idée', emoji: '🔍', startPct: 0,  endPct: 25 },
  { label: 'Recherche de concurrents', emoji: '🌐', startPct: 25, endPct: 50 },
  { label: 'Calcul du score',    emoji: '📊', startPct: 50, endPct: 75 },
  { label: 'Rédaction de la critique', emoji: '✍️', startPct: 75, endPct: 100 },
] as const;

export const MOTIVATING_MESSAGES = [
  'Votre projet mérite une analyse honnête.',
  'La vérité fait parfois mal, mais elle sauve des projets.',
  'Des milliers d\'entrepreneurs ont audité leur idée ici.',
  'L\'IA analyse 7 dimensions clés de votre projet.',
  'Bientôt, vous saurez exactement où vous en êtes.',
  'Pas de flatterie. Que des données et de la réalité.',
];
