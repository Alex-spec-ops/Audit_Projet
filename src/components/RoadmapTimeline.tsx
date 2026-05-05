import { useState } from 'react';
import { X, CheckCircle2, MapPin } from 'lucide-react';
import type { RoadmapPhase } from '../types';

interface RoadmapPhaseNodeProps {
  phase: RoadmapPhase;
  isSelected: boolean;
  onClick: () => void;
  isLast: boolean;
}

function PhaseNode({ phase, isSelected, onClick, isLast }: RoadmapPhaseNodeProps) {
  return (
    <div className="flex items-start gap-0">
      <div className="flex flex-col items-center">
        {/* Node button */}
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
          <span className="text-2xl leading-none" role="img" aria-hidden>
            {phase.icon}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            P{phase.id}
          </span>

          {/* Current phase indicator */}
          {phase.isCurrentPhase && (
            <span className="absolute -top-1.5 -right-1.5">
              <MapPin size={14} className="text-primary-600 fill-primary-600" />
            </span>
          )}
        </button>

        {/* Phase label + duration */}
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

      {/* Connector line */}
      {!isLast && (
        <div className="flex-shrink-0 mt-8 w-6 md:w-10 h-0.5 bg-slate-200" aria-hidden />
      )}
    </div>
  );
}

interface DetailPanelProps {
  phase: RoadmapPhase;
  onClose: () => void;
}

function DetailPanel({ phase, onClose }: DetailPanelProps) {
  return (
    <div className="card p-6 border-primary-200 border-2 animate-slide-in-right">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={phase.name}>
            {phase.icon}
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Phase {phase.id}
            </p>
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

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-semibold text-slate-700 mb-2">Objectifs clés</h5>
          <ul className="space-y-2">
            {phase.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <h5 className="text-sm font-semibold text-slate-700 mb-2">Détails & conseils</h5>
          <p className="text-sm text-slate-600 leading-relaxed">{phase.details}</p>
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
  );
}

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

export default function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(
    phases.find(p => p.isCurrentPhase) ?? null
  );
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());

  const toggleComplete = (id: number) => {
    setCompletedPhases(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
              onClick={() =>
                setSelectedPhase(prev => (prev?.id === phase.id ? null : phase))
              }
              isLast={i === phases.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {selectedPhase && (
        <DetailPanel phase={selectedPhase} onClose={() => setSelectedPhase(null)} />
      )}

      {/* Phase completion checklist */}
      <div className="card p-6">
        <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-primary-500" />
          Progression de la Phase 0 — Validation
        </h4>
        <p className="text-sm text-slate-500 mb-4">
          Cochez les objectifs au fur et à mesure de votre avancement. Vos progrès sont sauvegardés.
        </p>
        <ul className="space-y-2.5">
          {phases[0].objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3">
              <button
                onClick={() => toggleComplete(i)}
                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-150
                  ${completedPhases.has(i)
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-slate-300 hover:border-primary-400'
                  }`}
                aria-label={completedPhases.has(i) ? `Décocher : ${obj}` : `Cocher : ${obj}`}
              >
                {completedPhases.has(i) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className={`text-sm leading-relaxed ${completedPhases.has(i) ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                {obj}
              </span>
            </li>
          ))}
        </ul>
        {completedPhases.size > 0 && (
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="text-sm font-medium text-emerald-700">
              ✅ {completedPhases.size}/{phases[0].objectives.length} objectifs complétés
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
