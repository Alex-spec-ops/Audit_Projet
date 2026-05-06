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
    <div ref={ref} className="border-2 border-[#E2E8F0] overflow-hidden bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-5 py-4 flex items-center gap-4 hover:bg-[#F8F9FA] transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-[#0F172A] text-sm font-display">{criteria.name}</span>
            <span className={`font-bold text-sm tabular-nums font-mono ${config.textClass}`}>
              {criteria.score}<span className="text-[#94A3B8] font-normal text-xs">/{criteria.maxScore}</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-[#F1F5F9] overflow-hidden">
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{
                width: animated ? `${pct}%` : '0%',
                backgroundColor: config.color,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed line-clamp-1">
            {criteria.justification}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-[#CBD5E1] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className="accordion-content"
        style={{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-4 border-t-2 border-[#E2E8F0]">
          <div className="flex items-start gap-2 mt-3">
            <Info size={14} className="text-[#CBD5E1] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#475569] leading-relaxed">{criteria.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { subject: string; rawScore: number; maxScore: number; score: number } }> }) => {
  if (active && payload && payload.length) {
    const { payload: p } = payload[0];
    const config = getScoreConfig(p.score);
    return (
      <div className="bg-white border-2 border-[#E2E8F0] px-3 py-2 shadow-md">
        <p className="text-xs text-[#94A3B8] font-mono">{p.subject}</p>
        <p className={`text-lg font-bold font-mono ${config.textClass}`}>{p.rawScore}<span className="text-xs text-[#CBD5E1]">/{p.maxScore}</span></p>
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
    score: (c.score / c.maxScore) * 100,
    rawScore: c.score,
    maxScore: c.maxScore,
    fullMark: 100,
  }));

  return (
    <section className="space-y-6" aria-label="Détail des scores">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar chart */}
        <div className="card p-6">
          <h4 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2 font-display text-sm">
            <span className="w-2 h-2 bg-primary-500" />
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
                tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Inter' }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: '#CBD5E1' }}
                tickCount={4}
                stroke="#E2E8F0"
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#E63946"
                fill="#E63946"
                fillOpacity={0.12}
                strokeWidth={2}
                dot={{ fill: '#E63946', r: 3 }}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Criteria list */}
        <div className="space-y-3">
          <h4 className="font-semibold text-[#0F172A] flex items-center gap-2 font-display text-sm">
            <span className="w-2 h-2 bg-primary-500" />
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
      <div className="border-2 border-[#E2E8F0] overflow-hidden bg-white">
        <button
          onClick={() => setShowMethodology(m => !m)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-[#94A3B8] hover:bg-[#F8F9FA] hover:text-[#0F172A] transition-colors font-mono"
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
          <div className="px-5 pb-5 space-y-3 border-t-2 border-[#E2E8F0]">
            <p className="text-sm text-[#475569] leading-relaxed mt-3">
              Notre score global sur 100 est calculé à partir de <strong className="text-[#0F172A]">7 critères pondérés</strong> par l'importance
              stratégique de chaque dimension pour la viabilité d'un projet early-stage.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Pertinence du problème', weight: '20%' },
                { name: 'Différenciation',         weight: '20%' },
                { name: 'Faisabilité technique',   weight: '15%' },
                { name: 'Viabilité économique',    weight: '15%' },
                { name: 'Timing marché',           weight: '10%' },
                { name: 'Barrières concurrentielles', weight: '10%' },
                { name: 'Scalabilité',             weight: '10%' },
              ].map(item => (
                <div key={item.name} className="flex justify-between text-xs px-3 py-2 bg-[#F8F9FA] border border-[#E2E8F0]">
                  <span className="text-[#475569] truncate mr-2" title={item.name}>{item.name}</span>
                  <span className="font-bold text-[#0F172A] font-mono flex-shrink-0">{item.weight}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#CBD5E1] font-mono">
              L'IA ajuste les pondérations selon le secteur d'activité et le stade du projet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
