import { useState } from 'react';
import { X, CheckCircle2, MapPin, Flag, Wallet, Users, Clock, Target, AlertTriangle, Package } from 'lucide-react';
import type { RoadmapData, RoadmapPhase } from '../types';

// ─── Phase node (horizontal timeline) ────────────────────────────────────────

interface PhaseNodeProps {
  phase: RoadmapPhase;
  isSelected: boolean;
  onClick: () => void;
  isLast: boolean;
}

function PhaseNode({ phase, isSelected, onClick, isLast }: PhaseNodeProps) {
  return (
    <div className="flex items-start gap-0">
      <div className="flex flex-col items-center">
        <button
          onClick={onClick}
          className={`relative flex-shrink-0 w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all duration-200
            ${phase.isCurrentPhase
              ? 'border-primary-500 bg-primary-50 shadow-glow-blue scale-110'
              : isSelected
              ? 'border-primary-400 bg-primary-50'
              : 'border-slate-200 bg-white hover:border-primary-300 hover:bg-primary-50'
            }`}
          aria-label={`Phase ${phase.id} : ${phase.name}`}
        >
          <span className="text-2xl leading-none" role="img" aria-hidden>{phase.icon}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">P{phase.id}</span>
          {phase.isCurrentPhase && (
            <span className="absolute -top-1.5 -right-1.5">
              <MapPin size={14} className="text-primary-600 fill-primary-600" />
            </span>
          )}
        </button>

        <div className="mt-2 text-center w-20">
          <p className={`text-xs font-semibold leading-tight ${phase.isCurrentPhase ? 'text-primary-700' : 'text-slate-700'}`}>
            {phase.name}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{phase.duration}</p>
          {phase.isCurrentPhase && (
            <span className="inline-block mt-1 text-[9px] font-bold bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-full">
              Vous êtes ici
            </span>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="flex-shrink-0 mt-8 w-6 md:w-10 h-0.5 bg-slate-200" aria-hidden />
      )}
    </div>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

interface DetailPanelProps {
  phase: RoadmapPhase;
  onClose: () => void;
}

function DetailPanel({ phase, onClose }: DetailPanelProps) {
  return (
    <div className="card p-6 border-primary-200 border-2 animate-slide-in-right space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={phase.name}>{phase.icon}</span>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Phase {phase.id}</p>
            <h4 className="font-bold text-slate-900 text-lg">{phase.name}</h4>
            <span className="text-sm text-slate-500">{phase.duration}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Fermer le détail"
        >
          <X size={18} className="text-slate-400" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Objectifs */}
          <div>
            <h5 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Target size={14} className="text-primary-500" />
              Objectifs SMART
            </h5>
            <ul className="space-y-2">
              {phase.objectifs.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Livrables */}
          <div>
            <h5 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Package size={14} className="text-emerald-500" />
              Livrables concrets
            </h5>
            <ul className="space-y-2">
              {phase.livrables.map((l, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="w-4 h-4 mt-0.5 flex-shrink-0 rounded bg-emerald-100 text-emerald-600 text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </div>

          {/* KPIs */}
          <div>
            <h5 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Flag size={14} className="text-blue-500" />
              KPIs de succès
            </h5>
            <ul className="space-y-1.5">
              {phase.kpis.map((kpi, i) => (
                <li key={i} className="text-sm text-slate-600 pl-3 border-l-2 border-blue-200">
                  {kpi}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Ressources */}
          <div>
            <h5 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <Wallet size={14} className="text-amber-500" />
              Ressources nécessaires
            </h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wallet size={13} className="text-amber-500" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Budget</span>
                  <span className="font-semibold text-slate-700">{phase.ressources.budget}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 bg-violet-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users size={13} className="text-violet-500" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Équipe</span>
                  <span className="font-semibold text-slate-700">{phase.ressources.personnes}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={13} className="text-sky-500" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Temps</span>
                  <span className="font-semibold text-slate-700">{phase.ressources.temps}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risques */}
          <div>
            <h5 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-orange-400" />
              Risques & points de vigilance
            </h5>
            <ul className="space-y-2">
              {phase.risques.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 p-2 bg-orange-50 rounded-lg border border-orange-100">
                  <AlertTriangle size={13} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Go / No-go */}
          <div className="p-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Point de décision GO / NO-GO</p>
            <p className="text-sm text-slate-700 font-medium">{phase.goNogo}</p>
          </div>

          {phase.isCurrentPhase && (
            <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg border border-primary-100">
              <MapPin size={14} className="text-primary-600" />
              <p className="text-xs font-medium text-primary-700">
                C'est la phase dans laquelle vous vous trouvez actuellement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Jalons critiques ─────────────────────────────────────────────────────────

function JalonsCritiques({ jalons, budget }: { jalons: string[]; budget: string }) {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
          <Flag size={18} className="text-primary-500" />
          Jalons critiques & budget global
        </h4>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl">
          <Wallet size={14} className="text-amber-500" />
          <span className="text-sm font-semibold text-amber-700">{budget}</span>
        </div>
      </div>
      <ol className="space-y-2">
        {jalons.map((j, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
            <span className="w-5 h-5 mt-0.5 rounded-full bg-primary-100 text-primary-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            {j}
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Phase 0 checklist ────────────────────────────────────────────────────────

function Phase0Checklist({ phase }: { phase: RoadmapPhase }) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="card p-6">
      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <CheckCircle2 size={18} className="text-primary-500" />
        Progression Phase 0 — Validation
      </h4>
      <p className="text-sm text-slate-500 mb-4">
        Cochez les objectifs au fur et à mesure de votre avancement.
      </p>
      <ul className="space-y-2.5">
        {phase.objectifs.map((obj, i) => (
          <li key={i} className="flex items-start gap-3">
            <button
              onClick={() => toggle(i)}
              className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-150
                ${completed.has(i) ? 'bg-primary-500 border-primary-500' : 'border-slate-300 hover:border-primary-400'}`}
              aria-label={completed.has(i) ? `Décocher : ${obj}` : `Cocher : ${obj}`}
            >
              {completed.has(i) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span className={`text-sm leading-relaxed ${completed.has(i) ? 'line-through text-slate-400' : 'text-slate-600'}`}>
              {obj}
            </span>
          </li>
        ))}
      </ul>
      {completed.size > 0 && (
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <p className="text-sm font-medium text-emerald-700">
            ✅ {completed.size}/{phase.objectifs.length} objectifs complétés
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface RoadmapTimelineProps {
  data: RoadmapData;
}

export default function RoadmapTimeline({ data }: RoadmapTimelineProps) {
  const { phases, jalons_critiques, budget_estime } = data;
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(
    phases.find(p => p.isCurrentPhase) ?? null
  );

  return (
    <section className="space-y-6" aria-label="Roadmap personnalisée">
      {/* Horizontal scrollable timeline */}
      <div className="card p-6 overflow-x-auto">
        <div className="flex items-start gap-0 min-w-max mx-auto px-2">
          {phases.map((phase, i) => (
            <PhaseNode
              key={phase.id}
              phase={phase}
              isSelected={selectedPhase?.id === phase.id}
              onClick={() => setSelectedPhase(prev => prev?.id === phase.id ? null : phase)}
              isLast={i === phases.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {selectedPhase && (
        <DetailPanel phase={selectedPhase} onClose={() => setSelectedPhase(null)} />
      )}

      {/* Jalons critiques + budget */}
      <JalonsCritiques jalons={jalons_critiques} budget={budget_estime} />

      {/* Phase 0 checklist */}
      <Phase0Checklist phase={phases[0]} />
    </section>
  );
}
