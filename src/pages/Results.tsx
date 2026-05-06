import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, Share2, ArrowLeft, RefreshCw, ChevronRight,
  Calendar, Users, Target, CheckCircle2, Circle,
  Trophy, Lock,
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import CritiqueSection from '../components/CritiqueSection';
import CompetitorCard from '../components/CompetitorCard';
import ScoreBreakdown from '../components/ScoreBreakdown';
import RoadmapTimeline from '../components/RoadmapTimeline';
import MarketLandscapeView from '../components/MarketLandscape';
import { getScoreConfig, getPriorityConfig } from '../design-tokens';
import { mockAuditResult } from '../data/mockData';
import type { Recommendation } from '../types';

// ─── Top navigation ───────────────────────────────────────────────────────────

function ResultsNav({ projectName, score }: { projectName: string; score: number }) {
  const config = getScoreConfig(score);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/" className="flex-shrink-0 p-1.5 hover:bg-[#F8F9FA] transition-colors border border-[#E2E8F0]">
            <ArrowLeft size={18} className="text-[#94A3B8]" />
          </Link>
          <div className="w-px h-6 bg-[#E2E8F0]" />
          <div className="flex items-center gap-2 font-bold text-[#0F172A] min-w-0">
            <div className="w-7 h-7 bg-primary-500 flex items-center justify-center text-white text-xs font-black font-mono flex-shrink-0">
              ◈
            </div>
            <span className="truncate text-sm md:text-base font-display">{projectName}</span>
          </div>
          <span className={`hidden sm:inline-flex badge text-xs font-bold font-mono ${config.badgeClass}`}>
            {config.emoji} {score}/100
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleShare}
            className="btn-ghost text-sm py-1.5 px-3"
            aria-label="Partager le rapport"
          >
            <Share2 size={15} />
            <span className="hidden sm:inline">{copied ? 'Copié !' : 'Partager'}</span>
          </button>
          <button
            className="btn-primary text-sm py-1.5 px-4"
            aria-label="Télécharger le rapport PDF"
          >
            <Download size={15} />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Score header section ──────────────────────────────────────────────────────

function ScoreHeader({ result }: { result: typeof mockAuditResult }) {
  const config = getScoreConfig(result.globalScore);

  return (
    <section className="card p-8 md:p-12 text-center space-y-6 animate-scale-in" style={{ boxShadow: '6px 6px 0px rgba(230,57,70,0.12)' }}>
      <div className="flex flex-col items-center gap-6">
        <ScoreGauge score={result.globalScore} size="lg" animate showLabel />

        <div className="max-w-2xl">
          <p className="text-[#475569] leading-relaxed text-base md:text-lg">
            {result.executiveSummary}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="badge bg-[#F8F9FA] text-[#475569] border border-[#E2E8F0] text-sm font-mono">
            <Target size={14} />
            {result.industry}
          </span>
          <span className="badge bg-[#F8F9FA] text-[#475569] border border-[#E2E8F0] text-sm font-mono">
            <Calendar size={14} />
            {new Date(result.auditDate).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </span>
          <span className={`badge text-sm font-bold font-mono ${config.badgeClass}`}>
            {config.emoji} {config.label}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-primary">
            <Download size={16} />
            Télécharger le rapport PDF
          </button>
          <button className="btn-secondary">
            <Share2 size={16} />
            Partager ce rapport
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: string;
}

function Section({ id, title, subtitle, icon, children, badge }: SectionProps) {
  return (
    <section id={id} className="space-y-6 animate-slide-up">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#F8F9FA] border-2 border-[#E2E8F0] flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] font-display">{title}</h2>
            {subtitle && <p className="text-[#475569] text-sm mt-0.5 font-mono">{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <span className="badge bg-red-50 text-primary-600 border border-primary-200 text-xs font-semibold font-mono flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Competitors section ──────────────────────────────────────────────────────

function CompetitorsSection({ competitors }: { competitors: typeof mockAuditResult.competitors }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? competitors : competitors.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((c, i) => (
          <CompetitorCard key={c.id} competitor={c} rank={i + 1} />
        ))}
      </div>
      {competitors.length > 3 && (
        <button
          onClick={() => setShowAll(s => !s)}
          className="w-full btn-secondary justify-center py-2.5"
        >
          {showAll ? 'Voir moins' : `Voir tous les concurrents (${competitors.length})`}
          <ChevronRight size={16} className={`transition-transform ${showAll ? 'rotate-90' : ''}`} />
        </button>
      )}
    </div>
  );
}

// ─── Recommendations section ──────────────────────────────────────────────────

function RecommendationsSection({ recommendations }: { recommendations: Recommendation[] }) {
  const [items, setItems] = useState(recommendations);

  const toggle = (id: string) => {
    setItems(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const completedCount = items.filter(r => r.completed).length;

  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#0F172A] flex items-center gap-2 font-display text-sm">
          <CheckCircle2 size={18} className="text-primary-500" />
          Prochaines étapes prioritaires
        </h3>
        {completedCount > 0 && (
          <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
            {completedCount}/{items.length} complétées
          </span>
        )}
      </div>

      <ul className="space-y-3">
        {items.map(rec => {
          const priority = getPriorityConfig(rec.priority);
          return (
            <li
              key={rec.id}
              className={`flex items-start gap-3 p-3 transition-colors duration-150
                ${rec.completed ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-[#F8F9FA]'}`}
            >
              <button
                onClick={() => toggle(rec.id)}
                className={`flex-shrink-0 w-5 h-5 mt-0.5 border-2 flex items-center justify-center transition-all duration-200
                  ${rec.completed ? 'bg-primary-500 border-primary-500' : 'border-[#E2E8F0] hover:border-primary-400'}`}
                aria-label={rec.completed ? `Décocher : ${rec.action}` : `Cocher : ${rec.action}`}
              >
                {rec.completed && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.2 5.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-relaxed ${rec.completed ? 'line-through text-[#CBD5E1]' : 'text-[#475569]'}`}>
                  {rec.action}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-semibold flex items-center gap-1 font-mono ${priority.textClass}`}>
                    <span className={`w-1.5 h-1.5 ${priority.dotClass}`} />
                    {priority.label}
                  </span>
                  <span className="text-xs text-[#CBD5E1] font-mono">· {rec.category}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {completedCount === items.length && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-200 text-center">
          <p className="font-semibold text-emerald-700 font-display">
            ✅ Toutes les étapes complétées ! Passez à la phase suivante.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── PRO upsell card ─────────────────────────────────────────────────────────

function ProUpsell() {
  const proFeatures = [
    'Analyse mensuelle automatique des concurrents',
    'Alertes en temps réel (levées de fonds, lancements)',
    'Coaching 1h avec un expert secteur',
    'Export complet Notion / Trello / Excel',
    'Score comparé à 100+ projets similaires',
  ];

  return (
    <div className="border-2 border-amber-200 bg-amber-50" style={{ boxShadow: '6px 6px 0px rgba(15,23,42,0.08)' }}>
      <div className="p-8 space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-100 border border-amber-200 flex items-center justify-center">
            <Trophy size={24} className="text-secondary-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#0F172A] font-display">VeritAudit Pro</h3>
              <span className="badge bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold font-mono flex items-center gap-1">
                <Lock size={10} /> PRO
              </span>
            </div>
            <p className="text-[#475569] text-sm mt-1">
              Allez plus loin avec un suivi continu et un accompagnement expert.
            </p>
          </div>
        </div>

        <ul className="space-y-2.5">
          {proFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[#475569]">
              <CheckCircle2 size={16} className="text-secondary-600 mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button className="btn-secondary flex-1 justify-center">
            Obtenir du coaching
            <ChevronRight size={16} />
          </button>
          <span className="flex items-center justify-center text-sm font-semibold text-secondary-600 font-mono">
            À partir de 49€/mois
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard footer ─────────────────────────────────────────────────────────

function DashboardFooter({ result }: { result: typeof mockAuditResult }) {
  return (
    <footer className="card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-[#475569] font-mono">
          <Calendar size={16} className="text-[#CBD5E1]" />
          Audité le {new Date(result.auditDate).toLocaleDateString('fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
          })}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to="/submit"
            className="btn-ghost text-sm py-1.5 px-3"
          >
            <RefreshCw size={15} />
            Mettre à jour mon projet
          </Link>
          <button className="btn-secondary text-sm py-1.5 px-4">
            <Users size={15} />
            Partager à mon équipe
          </button>
          <button className="btn-primary text-sm py-1.5 px-4">
            <Download size={15} />
            Télécharger PDF
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t-2 border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#CBD5E1] font-mono">
        <span>© 2026 VeritAudit.ai — Tous droits réservés</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#475569] transition-colors">CGU</a>
          <a href="#" className="hover:text-[#475569] transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-[#475569] transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Anchor nav ───────────────────────────────────────────────────────────────

function AnchorNav() {
  const anchors = [
    { id: 'score',       label: 'Score global' },
    { id: 'critique',    label: 'Critique' },
    { id: 'breakdown',   label: 'Détail scores' },
    { id: 'competitors', label: 'Concurrents' },
    { id: 'roadmap',     label: 'Roadmap' },
    { id: 'actions',     label: 'Actions' },
  ];

  return (
    <nav
      className="hidden xl:flex flex-col gap-1 sticky top-20 self-start"
      aria-label="Navigation du rapport"
    >
      <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-2 px-3 font-mono">
        Sections
      </p>
      {anchors.map(a => (
        <a
          key={a.id}
          href={`#${a.id}`}
          className="px-3 py-2 text-sm text-[#475569] hover:text-[#0F172A] hover:bg-[#F8F9FA] border-l-2 border-transparent hover:border-primary-500 transition-all font-mono"
        >
          {a.label}
        </a>
      ))}
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Results() {
  let result = mockAuditResult;
  try {
    const stored = localStorage.getItem('auditResult');
    if (stored) {
      result = JSON.parse(stored);
    }
  } catch {
    // fallback to mock
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <ResultsNav projectName={result.projectName} score={result.globalScore} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar anchor nav */}
          <aside className="w-44 flex-shrink-0">
            <AnchorNav />
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-10">
            {/* Score */}
            <div id="score">
              <ScoreHeader result={result} />
            </div>

            {/* Critique */}
            <div id="critique">
              <Section
                title="Critique sans filtre"
                subtitle="Ce que vous devez vraiment savoir sur votre projet."
                icon={<span className="text-xl">⚠️</span>}
                badge={`${result.critique.faiblesses_majeures.length + result.critique.menaces_reelles.length} points`}
              >
                <CritiqueSection critique={result.critique} />
              </Section>
            </div>

            {/* Score breakdown */}
            <div id="breakdown">
              <Section
                title="Détail du scoring"
                subtitle="7 critères analysés et pondérés par notre IA."
                icon={<Target size={20} className="text-primary-500" />}
                badge="7 critères"
              >
                <ScoreBreakdown criteria={result.scoreBreakdown} />
              </Section>
            </div>

            {/* Competitors & Market Landscape */}
            <div id="competitors">
              <Section
                title="Paysage Concurrentiel"
                subtitle="Analyse du marché et des acteurs en place."
                icon={<span className="text-xl">🎯</span>}
                badge={`${result.competitors.length} concurrents`}
              >
                <div className="space-y-8">
                  <MarketLandscapeView landscape={result.landscape} />
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-4 font-display">Acteurs identifiés</h3>
                    <CompetitorsSection competitors={result.competitors} />
                  </div>
                </div>
              </Section>
            </div>

            {/* Roadmap */}
            <div id="roadmap">
              <Section
                title="Roadmap personnalisée"
                subtitle="6 phases pour passer de l'idée au scale."
                icon={<span className="text-xl">🗺️</span>}
                badge="6 phases"
              >
                <RoadmapTimeline data={result.roadmap} />
              </Section>
            </div>

            {/* Recommendations */}
            <div id="actions">
              <Section
                title="Actions recommandées"
                subtitle="Vos 5 prochaines étapes, classées par priorité."
                icon={<CheckCircle2 size={20} className="text-emerald-600" />}
                badge={`${result.recommendations.length} actions`}
              >
                <RecommendationsSection recommendations={result.recommendations} />
              </Section>
            </div>

            {/* Pro upsell */}
            <ProUpsell />

            {/* Footer */}
            <DashboardFooter result={result} />
          </main>
        </div>
      </div>
    </div>
  );
}
