import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Edit3,
  Target, DollarSign, Users, Zap, Tag, Search, ChevronDown,
  ChevronUp, HelpCircle, RefreshCw, Sparkles,
} from 'lucide-react';
import type { ProjectExtraction, ClarificationQuestion, ExtractionState } from '../types';
import { extractProjectData, enrichExtractionWithAnswers } from '../lib/projectExtractor';

// ─── Sub-components ─────────────────────────────────────────────────────────────

interface FieldCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | string[];
  color: string;
  editable?: boolean;
  onEdit?: (value: string) => void;
  isList?: boolean;
  confidence?: 'high' | 'medium' | 'low';
}

function FieldCard({ icon, label, value, color, editable, onEdit, isList, confidence }: FieldCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(isList ? (value as string[]).join('\n') : value as string);

  const displayValue = isList ? (value as string[]) : [value as string];
  const isEmpty = isList ? (value as string[]).length === 0 : !value;

  const confidenceDot =
    confidence === 'high' ? 'bg-emerald-400' :
    confidence === 'medium' ? 'bg-amber-400' :
    'bg-red-400';

  const handleSave = () => {
    if (onEdit) {
      if (isList) {
        onEdit(draft);
      } else {
        onEdit(draft);
      }
    }
    setEditing(false);
  };

  return (
    <div className={`card p-4 border-l-4 ${color} group relative`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">{icon}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span>
          {confidence && (
            <span className={`w-2 h-2 rounded-full ${confidenceDot} inline-block`} title={`Confiance : ${confidence}`} />
          )}
        </div>
        {editable && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded-md"
            title="Modifier"
          >
            <Edit3 size={13} className="text-slate-400" />
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-2">
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={isList ? 4 : 2}
            className="input-field text-sm resize-none w-full"
            autoFocus
            placeholder={isList ? 'Une fonctionnalité par ligne' : ''}
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(false)} className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-50">
              Annuler
            </button>
            <button onClick={handleSave} className="text-xs text-white px-3 py-1 rounded-md bg-primary-600 hover:bg-primary-700">
              Enregistrer
            </button>
          </div>
        </div>
      ) : (
        <div>
          {isEmpty ? (
            <p className="text-sm text-slate-400 italic">Non détecté — à préciser</p>
          ) : isList ? (
            <ul className="space-y-1.5">
              {(value as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-primary-400 mt-1 flex-shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-700 leading-relaxed">{value as string}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Clarification question card ────────────────────────────────────────────────

const CATEGORY_COLORS: Record<ClarificationQuestion['category'], string> = {
  cible: 'border-blue-400 bg-blue-50',
  modele: 'border-emerald-400 bg-emerald-50',
  fonctionnalites: 'border-purple-400 bg-purple-50',
  problematique: 'border-amber-400 bg-amber-50',
  valeur: 'border-rose-400 bg-rose-50',
};

const CATEGORY_ICONS: Record<ClarificationQuestion['category'], React.ReactNode> = {
  cible: <Users size={16} className="text-blue-500" />,
  modele: <DollarSign size={16} className="text-emerald-500" />,
  fonctionnalites: <Zap size={16} className="text-purple-500" />,
  problematique: <AlertCircle size={16} className="text-amber-500" />,
  valeur: <Target size={16} className="text-rose-500" />,
};

interface QuestionCardProps {
  q: ClarificationQuestion;
  value: string;
  onChange: (val: string) => void;
}

function QuestionCard({ q, value, onChange }: QuestionCardProps) {
  return (
    <div className={`rounded-xl border-l-4 p-4 ${CATEGORY_COLORS[q.category]}`}>
      <div className="flex items-start gap-2 mb-3">
        {CATEGORY_ICONS[q.category]}
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">{q.question}</p>
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={q.placeholder}
        rows={2}
        className="input-field text-sm resize-none w-full bg-white"
      />
    </div>
  );
}

// ─── Extraction loading animation ───────────────────────────────────────────────

function ExtractionLoader({ projectName }: { projectName: string }) {
  const steps = [
    { emoji: '📖', label: 'Lecture de votre description...' },
    { emoji: '🧩', label: 'Extraction des éléments clés...' },
    { emoji: '🔍', label: 'Identification des zones floues...' },
    { emoji: '✨', label: 'Structuration des données...' },
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 450);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8 animate-fade-in">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-2 border-primary-200 border-t-primary-600 animate-spin" style={{ animationDuration: '1.2s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl transition-all duration-500" key={step}>{steps[step].emoji}</span>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-slate-400 text-sm uppercase tracking-widest font-medium">Analyse de</p>
        <h2 className="text-xl font-black text-slate-900">"{projectName}"</h2>
      </div>
      <div className="space-y-2 w-full max-w-sm">
        {steps.map((s, i) => (
          <div key={i} className={`flex items-center gap-3 transition-all duration-400 ${i <= step ? 'opacity-100' : 'opacity-25'}`}>
            <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300
              ${i < step ? 'bg-emerald-500' : i === step ? 'bg-primary-600 animate-pulse' : 'bg-slate-200'}`}>
              {i < step && <CheckCircle size={12} className="text-white" />}
            </div>
            <span className={`text-sm ${i === step ? 'text-slate-900 font-semibold' : i < step ? 'text-emerald-600' : 'text-slate-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Confidence indicator ────────────────────────────────────────────────────────

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 70 ? 'bg-emerald-500' : value >= 45 ? 'bg-amber-500' : 'bg-red-500';
  const label = value >= 70 ? 'Bonne confiance' : value >= 45 ? 'Données partielles' : 'Précisions nécessaires';
  const textColor = value >= 70 ? 'text-emerald-600' : value >= 45 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-bold ${textColor} whitespace-nowrap`}>{value}% · {label}</span>
    </div>
  );
}


// ─── Main Extract page ──────────────────────────────────────────────────────────

export default function Extract() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read submission from localStorage
  const submission = (() => {
    try { return JSON.parse(localStorage.getItem('auditSubmission') || '{}'); }
    catch { return {}; }
  })();
  const projectName = submission.projectName || location.state?.projectName || 'Mon Projet';
  const description = submission.description || '';
  const industry = submission.industry || '';
  const fileNames: string[] = submission.fileNames || [];

  const [state, setState] = useState<ExtractionState>({
    status: 'extracting',
    extraction: null,
    questions: [],
    answers: {},
    confidence: 0,
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAllFields, setShowAllFields] = useState(false);

  // Run extraction on mount
  useEffect(() => {
    let cancelled = false;
    extractProjectData(description, projectName, industry, fileNames).then(result => {
      if (cancelled) return;
      setState({
        status: result.questions.length > 0 ? 'clarifying' : 'confirmed',
        extraction: result.extraction,
        questions: result.questions,
        answers: {},
        confidence: result.confidence,
      });
    });
    return () => { cancelled = true; };
  }, []);

  const updateField = useCallback(<K extends keyof ProjectExtraction>(key: K, rawValue: string) => {
    setState(prev => {
      if (!prev.extraction) return prev;
      const value = key === 'fonctionnalites'
        ? rawValue.split('\n').map(s => s.trim()).filter(Boolean)
        : key === 'mots_cles_recherche'
        ? rawValue.split(',').map(s => s.trim()).filter(Boolean)
        : rawValue;
      return { ...prev, extraction: { ...prev.extraction, [key]: value } };
    });
  }, []);

  const handleConfirm = () => {
    if (!state.extraction) return;
    // Enrich with user answers if in clarifying mode
    const enriched = enrichExtractionWithAnswers(state.extraction, answers);
    setState(prev => ({ ...prev, extraction: enriched, status: 'confirmed', answers }));
  };

  const handleLaunchAudit = () => {
    if (!state.extraction) return;
    localStorage.setItem('auditExtraction', JSON.stringify(state.extraction));
    navigate('/analyzing', { state: { projectName: state.extraction.titre_projet || projectName } });
  };

  // ── Redirect if no submission ────────────────────────────────────────────────
  if (!description && fileNames.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-500">Aucune donnée de projet trouvée.</p>
          <Link to="/submit" className="btn-primary">Retour au formulaire</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/submit" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft size={18} />
            <div className="w-7 h-7 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white text-xs font-black">◈</div>
            <span className="font-bold text-slate-800 hidden sm:block">ProjectAudit.ai</span>
          </Link>
          {/* Step indicator */}
          <div className="flex items-center gap-2 text-sm">
            {[
              { n: 1, label: 'Soumission', done: true },
              { n: 2, label: 'Extraction', current: true },
              { n: 3, label: 'Analyse' },
              { n: 4, label: 'Résultats' },
            ].map((s, i, arr) => (
              <div key={s.n} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${s.done ? 'bg-emerald-500 text-white' : s.current ? 'bg-primary-600 text-white shadow-glow-blue' : 'bg-slate-100 text-slate-400'}`}>
                  {s.done ? '✓' : s.n}
                </div>
                {i < arr.length - 1 && <div className={`h-0.5 w-5 ${s.done ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
              </div>
            ))}
            <span className="ml-2 text-xs text-slate-500 hidden sm:block">Extraction IA</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Loading state */}
        {state.status === 'extracting' && (
          <ExtractionLoader projectName={projectName} />
        )}

        {/* Results */}
        {(state.status === 'clarifying' || state.status === 'confirmed') && state.extraction && (
          <div className="space-y-8 animate-fade-in">
            {/* Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-primary-500" />
                <h1 className="text-2xl font-black text-slate-900">Extraction IA terminée</h1>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Voici les éléments clés détectés dans votre description. Vérifiez et corrigez si nécessaire avant de lancer l'audit complet.
              </p>
              <div className="mt-4">
                <ConfidenceBar value={state.confidence} />
              </div>
            </div>

            {/* Extracted data cards */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Données extraites</h2>

              <div className="grid gap-4">
                <FieldCard
                  icon={<Target size={15} />}
                  label="Titre du projet"
                  value={state.extraction.titre_projet}
                  color="border-primary-400"
                  editable
                  onEdit={v => updateField('titre_projet', v)}
                  confidence="high"
                />
                <FieldCard
                  icon={<AlertCircle size={15} />}
                  label="Problématique résolue"
                  value={state.extraction.problematique}
                  color="border-amber-400"
                  editable
                  onEdit={v => updateField('problematique', v)}
                  confidence={state.extraction.problematique.length > 30 ? 'high' : 'low'}
                />
                <FieldCard
                  icon={<Users size={15} />}
                  label="Public cible"
                  value={state.extraction.cible}
                  color="border-blue-400"
                  editable
                  onEdit={v => updateField('cible', v)}
                  confidence={state.extraction.cible.length > 20 ? 'high' : state.extraction.cible ? 'medium' : 'low'}
                />
                <FieldCard
                  icon={<Zap size={15} />}
                  label="Proposition de valeur unique"
                  value={state.extraction.proposition_valeur}
                  color="border-rose-400"
                  editable
                  onEdit={v => updateField('proposition_valeur', v)}
                  confidence={state.extraction.proposition_valeur ? 'medium' : 'low'}
                />
                <FieldCard
                  icon={<Zap size={15} />}
                  label="Fonctionnalités principales"
                  value={state.extraction.fonctionnalites}
                  color="border-purple-400"
                  editable
                  isList
                  onEdit={v => updateField('fonctionnalites', v)}
                  confidence={state.extraction.fonctionnalites.length >= 3 ? 'high' : 'medium'}
                />

                {(showAllFields) && (
                  <>
                    <FieldCard
                      icon={<DollarSign size={15} />}
                      label="Modèle économique"
                      value={state.extraction.modele_economique}
                      color="border-emerald-400"
                      editable
                      onEdit={v => updateField('modele_economique', v)}
                      confidence={state.extraction.modele_economique ? 'high' : 'low'}
                    />
                    <FieldCard
                      icon={<Tag size={15} />}
                      label="Secteur d'activité"
                      value={state.extraction.secteur}
                      color="border-indigo-400"
                      editable
                      onEdit={v => updateField('secteur', v)}
                      confidence="high"
                    />
                    <FieldCard
                      icon={<Search size={15} />}
                      label="Mots-clés pour recherche de concurrents"
                      value={state.extraction.mots_cles_recherche}
                      color="border-slate-400"
                      editable
                      isList
                      onEdit={v => updateField('mots_cles_recherche', v)}
                      confidence="medium"
                    />
                  </>
                )}
              </div>

              <button
                onClick={() => setShowAllFields(o => !o)}
                className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {showAllFields ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                {showAllFields ? 'Masquer les champs avancés' : 'Voir tous les champs extraits'}
              </button>
            </div>


            {/* Clarification questions */}
            {state.status === 'clarifying' && state.questions.length > 0 && (
              <div className="space-y-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl animate-fade-in">
                <div className="flex items-start gap-3">
                  <HelpCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-bold text-amber-800 text-base">
                      {state.questions.length} zone{state.questions.length > 1 ? 's' : ''} floue{state.questions.length > 1 ? 's' : ''} détectée{state.questions.length > 1 ? 's' : ''}
                    </h2>
                    <p className="text-amber-700 text-sm mt-0.5">
                      Répondez à ces questions pour enrichir votre audit. Vous pouvez aussi les ignorer et continuer.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {state.questions.map(q => (
                    <QuestionCard
                      key={q.id}
                      q={q}
                      value={answers[q.id] || ''}
                      onChange={v => setAnswers(prev => ({ ...prev, [q.id]: v }))}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => navigate('/submit')}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium"
              >
                <RefreshCw size={15} />
                Modifier ma description
              </button>

              <div className="flex items-center gap-3">
                {state.status === 'clarifying' && (
                  <button
                    onClick={handleConfirm}
                    className="inline-flex items-center gap-2 px-5 py-3 border-2 border-primary-600 text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-all text-sm"
                  >
                    <CheckCircle size={16} />
                    Valider les précisions
                  </button>
                )}
                <button
                  onClick={handleLaunchAudit}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md hover:shadow-glow-blue transition-all duration-200"
                >
                  <Sparkles size={16} />
                  Lancer l'audit complet
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {state.status === 'clarifying' && (
              <p className="text-center text-xs text-slate-400">
                Vous pouvez ignorer les questions et lancer l'audit directement — les données partielles seront utilisées
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
