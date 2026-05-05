/**
 * auditOrchestrator.ts — Chef d'orchestre du pipeline d'audit
 *
 * Enchaîne les 5 prompts séquentiellement :
 *  1. Analyse concurrentielle  (extraction déjà fournie par Extract.tsx)
 *  2. Scoring IA               (nécessite extraction + concurrents)
 *  3. Critique sans filtre     (nécessite extraction + concurrents + score)
 *  4. Roadmap personnalisée    (nécessite tout)
 *
 * Conserve tous les JSON intermédiaires et assemble l'AuditResult final.
 */

import type {
  ProjectExtraction,
  AuditResult,
  ScoreLevel,
  Recommendation,
  Priority,
} from '../types';
import { generateCompetitiveAnalysis } from './competitorAnalyzer';
import { generateFeasibilityScore } from './scoreAnalyzer';
import { generateBrutalCritique } from './critiqueAnalyzer';
import { generateRoadmap } from './roadmapGenerator';
import { getScoreLevel } from '../design-tokens';

// ─── Progress callback ─────────────────────────────────────────────────────────

export interface OrchestratorStep {
  step: number;   // 1-4
  total: number;  // 4
  label: string;
  pct: number;    // 0-100 at start of this step
}

export type OnProgressFn = (update: OrchestratorStep) => void;

const STEPS = [
  { step: 1, label: 'Analyse du marché & concurrents', pct: 0  },
  { step: 2, label: 'Calcul du score de faisabilité',  pct: 25 },
  { step: 3, label: 'Critique sans filtre',            pct: 50 },
  { step: 4, label: 'Génération de la roadmap',        pct: 75 },
] as const;

// ─── Build recommendations from critique ─────────────────────────────────────

function buildRecommendations(actions: string[]): Recommendation[] {
  const priorities: Priority[] = ['urgent', 'urgent', 'important', 'important', 'secondary'];
  return actions.slice(0, 5).map((action, i) => ({
    id: `rec-${i + 1}`,
    action,
    priority: priorities[i] ?? 'secondary',
    completed: false,
    category: i === 0 ? 'Validation' : i === 1 ? 'Stratégie' : i === 2 ? 'Business Model' : 'Exécution',
  }));
}

// ─── Main orchestrator ────────────────────────────────────────────────────────

export async function runAuditOrchestration(
  extraction: ProjectExtraction,
  onProgress: OnProgressFn
): Promise<AuditResult> {

  // ── Step 1 : Competitive analysis ──────────────────────────────────────────
  onProgress({ ...STEPS[0], total: 4 });
  const competition = await generateCompetitiveAnalysis(extraction);

  // ── Step 2 : Scoring ────────────────────────────────────────────────────────
  onProgress({ ...STEPS[1], total: 4 });
  const scoring = await generateFeasibilityScore(extraction, competition);

  // ── Step 3 : Brutal critique ────────────────────────────────────────────────
  onProgress({ ...STEPS[2], total: 4 });
  const critique = await generateBrutalCritique(extraction, competition, scoring);

  // ── Step 4 : Roadmap ────────────────────────────────────────────────────────
  onProgress({ ...STEPS[3], total: 4 });
  const roadmap = await generateRoadmap(extraction, competition, scoring, critique);

  // ── Assemble final AuditResult ──────────────────────────────────────────────
  const scoreLevel: ScoreLevel = getScoreLevel(scoring.score_global);

  const result: AuditResult = {
    id: `audit-${Date.now()}`,
    projectName: extraction.titre_projet,
    industry: extraction.secteur,
    globalScore: scoring.score_global,
    scoreLevel,
    executiveSummary: scoring.resume_score,
    critique,
    scoreBreakdown: scoring.scoreBreakdown,
    competitors: competition.concurrents,
    landscape: competition.landscape,
    roadmap,
    recommendations: buildRecommendations(critique.actions_correctrices),
    auditDate: new Date().toISOString(),
  };

  // Persist to localStorage for Results page
  try {
    localStorage.setItem('auditResult', JSON.stringify(result));
  } catch {
    // localStorage might be full — ignore silently
  }

  return result;
}
