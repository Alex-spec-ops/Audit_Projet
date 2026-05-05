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

export interface Competitor {
  id: string;
  name: string;
  website: string;
  strengths: string[];
  threatLevel: ThreatLevel;
  description: string;
  fundingAmount?: string;
  userCount?: string;
}

export interface RoadmapPhase {
  id: number;
  name: string;
  duration: string;
  icon: string;
  objectives: string[];
  isCurrentPhase: boolean;
  details: string;
}

export interface Recommendation {
  id: string;
  action: string;
  priority: Priority;
  completed: boolean;
  category: string;
}

export interface CritiqueData {
  whatIsWrong: string[];
  realThreats: string[];
  whyItCanFail: string[];
  whatToChangeNow: string[];
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
  roadmap: RoadmapPhase[];
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
