// ─── Core domain types ────────────────────────────────────────────────────────

export type ScoreLevel = 'low' | 'medium' | 'good' | 'excellent';
export type ThreatLevel = 'low' | 'medium' | 'high';
export type Priority = 'urgent' | 'important' | 'secondary';

export interface ScoreCriteria {
  id: string;
  name: string;
  score: number;       // 0-100
  maxScore: number;    // always 100
  justification: string;
  details: string;
}

export type CompetitorType = 'direct' | 'indirect' | 'alternative';

export interface Competitor {
  id: string;
  name: string;
  website: string;
  description: string;
  propositionValeur: string;
  fonctionnalitesCles: string[];
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  traction: string;
  positioning: string;
  type: CompetitorType;
  threatLevel: ThreatLevel;
  fundingAmount?: string;
  userCount?: string;
}

export type MarketSaturation = 'faible' | 'moyen' | 'élevé';

export interface MarketLandscape {
  saturation_marche: MarketSaturation;
  saturation_justification: string;
  barrieres_entree: string[];
  opportunites: string[];
  tendances: string[];
}

export interface CompetitiveAnalysis {
  concurrents: Competitor[];
  landscape: MarketLandscape;
  generatedAt: string;
}

export interface RoadmapRessources {
  budget: string;
  personnes: string;
  temps: string;
}

export interface RoadmapPhase {
  id: number;
  name: string;
  duration: string;
  icon: string;
  objectifs: string[];
  livrables: string[];
  ressources: RoadmapRessources;
  kpis: string[];
  risques: string[];
  goNogo: string;
  isCurrentPhase: boolean;
}

export interface RoadmapData {
  phases: RoadmapPhase[];
  jalons_critiques: string[];
  budget_estime: string;
}

export interface Recommendation {
  id: string;
  action: string;
  priority: Priority;
  completed: boolean;
  category: string;
}

export interface CritiqueData {
  faiblesses_majeures: string[];
  menaces_reelles: string[];
  scenarios_echec: string[];
  actions_correctrices: string[];
  verdict_final: string;
}

export interface AuditResult {
  id: string;
  projectName: string;
  industry: string;
  globalScore: number;  // 0-100
  scoreLevel: ScoreLevel;
  executiveSummary: string;
  critique: CritiqueData;
  scoreBreakdown: ScoreCriteria[];
  competitors: Competitor[];
  landscape: MarketLandscape;
  roadmap: RoadmapData;
  recommendations: Recommendation[];
  auditDate: string;   // ISO 8601
}

// ─── Form types ────────────────────────────────────────────────────────────────

export interface SubmitFormData {
  projectName: string;
  industry: string;
  description: string;
  files: File[];
}

// ─── UI state types ────────────────────────────────────────────────────────────

export type AnalyzingStage = {
  label: string;
  emoji: string;
  startPct: number;
  endPct: number;
};

export type InputMode = 'text' | 'file';

// ─── Project Extraction types ──────────────────────────────────────────────────

export interface ProjectExtraction {
  titre_projet: string;
  problematique: string;
  cible: string;
  proposition_valeur: string;
  fonctionnalites: string[];
  modele_economique: string;
  secteur: string;
  mots_cles_recherche: string[];
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  placeholder: string;
  category: 'cible' | 'modele' | 'fonctionnalites' | 'problematique' | 'valeur';
}

export interface ExtractionState {
  status: 'idle' | 'extracting' | 'clarifying' | 'confirmed';
  extraction: ProjectExtraction | null;
  questions: ClarificationQuestion[];
  answers: Record<string, string>;
  confidence: number; // 0-100
}
