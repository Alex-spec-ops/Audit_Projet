import { useState } from 'react';
import { X, CheckCircle2, MapPin, Flag, Wallet, Users, Clock, Target, AlertTriangle, Package } from 'lucide-react';
import type { RoadmapData, RoadmapPhase } from '../types';

// ─── Phase node ───────────────────────────────────────────────────────────────

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
          className={`relative flex-shrink-0 w-16 h-16 border-2 flex flex-col items-center justify-center gap-0.5 transition-all duration-200
            ${phase.isCurrentPhase
              ? 'border-primary-500 bg-primary-900/20 shadow-md'
              : isSelected
              ? 'border-primary-600 bg-primary-900/10'
              : 'border-[#3F4753] bg-[#151921] hover:border-primary-700 hover:bg-primary-900/10'
            }`}
          aria-label={`Phase ${phase.id} : ${phase.name}`}
        >
          <span className="text-2xl leading-none" role="img" aria-hidden>{phase.icon}</span>
          <span className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wide font-mono">P{phase.id}</span>
          {phase.isCurrentPhase && (
            <span className="absolute -top-1.5 -right-1.5">
              <MapPin size={14} className="text-primary-500 fill-primary-500" />
            </span>
          )}
        </button>

        <div className="mt-2 text-center w-20">
          <p className={`text-xs font-semibold leading-tight font-display ${phase.isCurrentPhase ? 'text-primary-400' : 'text-white'}`}>
            {phase.name}
          </p>
          <p className="text-[10px] text-[#4B5563] mt-0.5 leading-tight font-mono">{phase.duration}</p>
          {phase.isCurrentPhase && (
            <span className="inline-block mt-1 text-[9px] font-bold bg-primary-900/30 text-primary-400 px-1.5 py-0.5 border border-primary-800 font-mono">
              Vous êtes ici
            </span>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="flex-shrink-0 mt-8 w-6 md:w-10 h-0.5 bg-[#2D3541]" aria-hidden />
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
    <div className="card p-6 border-primary-700 border-2 animate-slide-in-right space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={phase.name}>{phase.icon}</span>
          <div>
            <p className="text-xs font-semibold text-[#4B5563] uppercase tracking-wide font-mono">Phase {phase.id}</p>
            <h4 className="font-bold text-white text-lg font-display">{phase.name}</h4>
            <span className="text-sm text-[#6B7280] font-mono">{phase.duration}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-[#1C2128] transition-colors border border-[#2D3541]"
          aria-label="Fermer le détail"
        >
          <X size={18} className="text-[#6B7280]" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          <div>
            <h5 className="text-sm font-semibold text-[#9CA3AF] mb-2 flex items-center gap-1.5 font-display uppercase tracking-wider">
              <Target size={14} className="text-primary-500" />
              Objectifs SMART
            </h5>
            <ul className="space-y-2">
              {phase.objectifs.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#D1D5DB]">
                  <CheckCircle2 size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-[#9CA3AF] mb-2 flex items-center gap-1.5 font-display uppercase tracking-wider">
              <Package size={14} className="text-emerald-400" />
              Livrables concrets
            </h5>
            <ul className="space-y-2">
              {phase.livrables.map((l, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#D1D5DB]">
                  <span className="w-4 h-4 mt-0.5 flex-shrink-0 bg-emerald-900/30 text-emerald-400 text-[10px] font-bold font-mono flex items-center justify-center border border-emerald-800">
                    {i + 1}
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-[#9CA3AF] mb-2 flex items-center gap-1.5 font-display uppercase tracking-wider">
              <Flag size={14} className="text-secondary-500" />
              KPIs de succès
            </h5>
            <ul className="space-y-1.5">
              {phase.kpis.map((kpi, i) => (
                <li key={i} className="text-sm text-[#D1D5DB] pl-3 border-l-4 border-secondary-700">
                  {kpi}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <div>
            <h5 className="text-sm font-semibold text-[#9CA3AF] mb-3 flex items-center gap-1.5 font-display uppercase tracking-wider">
              <Wallet size={14} className="text-secondary-500" />
              Ressources nécessaires
            </h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 bg-[#1C2128] border border-[#3F4753] flex items-center justify-center flex-shrink-0">
                  <Wallet size={13} className="text-secondary-500" />
                </div>
                <div>
                  <span className="text-[#4B5563] text-xs block font-mono uppercase">Budget</span>
                  <span className="font-semibold text-white font-mono">{phase.ressources.budget}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 bg-[#1C2128] border border-[#3F4753] flex items-center justify-center flex-shrink-0">
                  <Users size={13} className="text-primary-500" />
                </div>
                <div>
                  <span className="text-[#4B5563] text-xs block font-mono uppercase">Équipe</span>
                  <span className="font-semibold text-white font-mono">{phase.ressources.personnes}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 bg-[#1C2128] border border-[#3F4753] flex items-center justify-center flex-shrink-0">
                  <Clock size={13} className="text-[#9CA3AF]" />
                </div>
                <div>
                  <span className="text-[#4B5563] text-xs block font-mono uppercase">Temps</span>
                  <span className="font-semibold text-white font-mono">{phase.ressources.temps}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-[#9CA3AF] mb-2 flex items-center gap-1.5 font-display uppercase tracking-wider">
              <AlertTriangle size={14} className="text-secondary-500" />
              Risques & points de vigilance
            </h5>
            <ul className="space-y-2">
              {phase.risques.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#D1D5DB] p-2 bg-secondary-900/10 border border-secondary-900">
                  <AlertTriangle size={13} className="text-secondary-500 mt-0.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 border-2 border-dashed border-[#3F4753] bg-[#1C2128]">
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-1 font-mono">Point de décision GO / NO-GO</p>
            <p className="text-sm text-white font-medium">{phase.goNogo}</p>
          </div>

          {phase.isCurrentPhase && (
            <div className="flex items-center gap-2 p-3 bg-primary-900/20 border border-primary-800">
              <MapPin size={14} className="text-primary-500" />
              <p className="text-xs font-medium text-primary-400">
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
        <h4 className="font-semibold text-white flex items-center gap-2 font-display text-sm">
          <Flag size={18} className="text-primary-500" />
          Jalons critiques & budget global
        </h4>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary-900/20 border border-secondary-800">
          <Wallet size={14} className="text-secondary-500" />
          <span className="text-sm font-semibold text-secondary-400 font-mono">{budget}</span>
        </div>
      </div>
      <ol className="space-y-2">
        {jalons.map((j, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#D1D5DB]">
            <span className="w-5 h-5 mt-0.5 bg-primary-900/30 text-primary-400 text-[11px] font-bold font-mono flex items-center justify-center flex-shrink-0 border border-primary-800">
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
      <h4 className="font-semibold text-white mb-4 flex items-center gap-2 font-display text-sm">
        <CheckCircle2 size={18} className="text-primary-500" />
        Progression Phase 0 — Validation
      </h4>
      <p className="text-sm text-[#6B7280] mb-4">
        Cochez les objectifs au fur et à mesure de votre avancement.
      </p>
      <ul className="space-y-2.5">
        {phase.objectifs.map((obj, i) => (
          <li key={i} className="flex items-start gap-3">
            <button
              onClick={() => toggle(i)}
              className={`flex-shrink-0 w-5 h-5 mt-0.5 border-2 flex items-center justify-center transition-all duration-150
                ${completed.has(i) ? 'bg-primary-500 border-primary-500' : 'border-[#3F4753] hover:border-primary-500'}`}
              aria-label={completed.has(i) ? `Décocher : ${obj}` : `Cocher : ${obj}`}
            >
              {completed.has(i) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span className={`text-sm leading-relaxed ${completed.has(i) ? 'line-through text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
              {obj}
            </span>
          </li>
        ))}
      </ul>
      {completed.size > 0 && (
        <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-800">
          <p className="text-sm font-medium text-emerald-400 font-mono">
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
