import { useState, useEffect, useRef } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ChevronDown, Info } from 'lucide-react';
import { getScoreConfig } from '../design-tokens';
import type { ScoreCriteria } from '../types';

interface CriteriaRowProps {
  criteria: ScoreCriteria;
  delay: number;
}

function CriteriaRow({ criteria, delay }: CriteriaRowProps) {
  const [open, setOpen] = useState(false);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const config = getScoreConfig(criteria.score);
  const pct = (criteria.score / criteria.maxScore) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div ref={ref} className="border border-slate-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
        aria-expanded={open}
      >
        {/* Criterion name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-800 text-sm">{criteria.name}</span>
            <span className={`font-bold text-sm tabular-nums ${config.textClass}`}>
              {criteria.score}<span className="text-slate-400 font-normal text-xs">/{criteria.maxScore}</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: animated ? `${pct}%` : '0%',
                backgroundColor: config.color,
              }}
            />
          </div>

          {/* Justification */}
          <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-1">
            {criteria.justification}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable details */}
      <div
        className="accordion-content"
        style={{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-4 border-t border-slate-100">
          <div className="flex items-start gap-2 mt-3">
            <Info size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-600 leading-relaxed">{criteria.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { subject: string } }> }) => {
  if (active && payload && payload.length) {
    const { value, payload: p } = payload[0];
    const config = getScoreConfig(value);
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs text-slate-500 font-medium">{p.subject}</p>
        <p className={`text-lg font-bold ${config.textClass}`}>{value}<span className="text-xs text-slate-400">/100</span></p>
      </div>
    );
  }
  return null;
};

interface ScoreBreakdownProps {
  criteria: ScoreCriteria[];
}

export default function ScoreBreakdown({ criteria }: ScoreBreakdownProps) {
  const [showMethodology, setShowMethodology] = useState(false);

  const radarData = criteria.map(c => ({
    subject: c.name,
    score: c.score,
    fullMark: 100,
  }));

  return (
    <section className="space-y-6" aria-label="Détail des scores">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar chart */}
        <div className="card p-6">
          <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            Vue d'ensemble radar
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} outerRadius="70%">
              <PolarGrid
                gridType="polygon"
                stroke="#E2E8F0"
                strokeWidth={1}
              />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'Inter' }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: '#94A3B8' }}
                tickCount={4}
                stroke="#E2E8F0"
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{ fill: '#2563EB', r: 3 }}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Criteria list */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            Score par critère
          </h4>
          <div className="space-y-2">
            {criteria.map((c, i) => (
              <CriteriaRow key={c.id} criteria={c} delay={i * 120} />
            ))}
          </div>
        </div>
      </div>

      {/* Methodology toggle */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowMethodology(m => !m)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <span>Voir la méthodologie de scoring</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${showMethodology ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className="accordion-content"
          style={{ maxHeight: showMethodology ? '400px' : '0px', opacity: showMethodology ? 1 : 0 }}
        >
          <div className="px-5 pb-5 space-y-3 border-t border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              Notre score global sur 100 est calculé à partir de <strong>7 critères pondérés</strong> par l'importance
              stratégique de chaque dimension pour la viabilité d'un projet early-stage.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Marché cible', weight: '20%' },
                { name: 'Modèle économique', weight: '20%' },
                { name: 'Innovation', weight: '15%' },
                { name: 'Faisabilité tech', weight: '15%' },
                { name: 'Équipe', weight: '15%' },
                { name: 'Concurrence', weight: '10%' },
                { name: 'Timing', weight: '5%' },
              ].map(item => (
                <div key={item.name} className="flex justify-between text-xs px-3 py-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">{item.name}</span>
                  <span className="font-semibold text-slate-800">{item.weight}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              L'IA ajuste les pondérations selon le secteur d'activité et le stade du projet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
