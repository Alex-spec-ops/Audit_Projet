import { ExternalLink, Shield, ShieldAlert, ShieldX, Target, Zap, TrendingUp, DollarSign, Crosshair, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getThreatConfig } from '../design-tokens';
import type { Competitor } from '../types';

interface CompetitorCardProps {
  competitor: Competitor;
  rank: number;
}

function ThreatIcon({ level }: { level: Competitor['threatLevel'] }) {
  if (level === 'high')   return <ShieldX size={16} className="text-red-600" />;
  if (level === 'medium') return <ShieldAlert size={16} className="text-amber-600" />;
  return <Shield size={16} className="text-emerald-600" />;
}

function getTypeLabel(type: Competitor['type']) {
  switch (type) {
    case 'direct':      return { label: 'Direct',      color: 'bg-red-50 text-red-600 border-red-200' };
    case 'indirect':    return { label: 'Indirect',    color: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'alternative': return { label: 'Alternative', color: 'bg-[#F8F9FA] text-[#475569] border-[#E2E8F0]' };
    default:            return { label: 'Direct',      color: 'bg-red-50 text-red-600 border-red-200' };
  }
}

function getInitials(name: string) {
  return name
    .split(/[\s.]+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

function getAvatarBg(name: string) {
  const colors = [
    'bg-blue-50 text-blue-700',
    'bg-purple-50 text-purple-700',
    'bg-rose-50 text-rose-700',
    'bg-amber-50 text-amber-700',
    'bg-emerald-50 text-emerald-700',
    'bg-[#F8F9FA] text-[#475569]',
  ];
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) % colors.length;
  return colors[Math.abs(hash) % colors.length];
}

export default function CompetitorCard({ competitor, rank }: CompetitorCardProps) {
  const threat = getThreatConfig(competitor.threatLevel);
  const initials = getInitials(competitor.name);
  const avatarBg = getAvatarBg(competitor.name);
  const typeConfig = getTypeLabel(competitor.type);

  return (
    <div className="card p-5 flex flex-col gap-4 transition-all duration-200 hover:border-primary-500 hover:shadow-card-hover"
      style={{ transition: 'all 0.2s' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex-shrink-0 w-10 h-10 flex items-center justify-center text-sm font-bold font-mono ${avatarBg} border border-[#E2E8F0]`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#94A3B8]">#{rank}</span>
              <h4 className="font-semibold text-[#0F172A] leading-tight font-display text-sm">{competitor.name}</h4>
            </div>
            <a
              href={`https://${competitor.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 transition-colors mt-0.5"
              onClick={e => e.stopPropagation()}
            >
              {competitor.website}
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold font-mono ${threat.badgeClass}`}>
            <ThreatIcon level={competitor.threatLevel} />
            {threat.label}
          </div>
          <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 border ${typeConfig.color}`}>
            {typeConfig.label}
          </span>
        </div>
      </div>

      <div className="text-sm text-[#475569] border-l-4 border-primary-300 pl-3 py-0.5 my-1 italic">
        "{competitor.propositionValeur}"
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-1">
        <div className="col-span-2">
           <p className="text-xs font-semibold text-[#94A3B8] mb-1 flex items-center gap-1 font-mono uppercase tracking-wider">
             <Crosshair size={13} /> Positionnement
           </p>
           <p className="text-sm text-[#0F172A]">{competitor.positioning}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#94A3B8] mb-1 flex items-center gap-1 font-mono uppercase tracking-wider">
            <DollarSign size={13} /> Pricing
          </p>
          <p className="text-sm text-[#0F172A]">{competitor.pricing}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#94A3B8] mb-1 flex items-center gap-1 font-mono uppercase tracking-wider">
            <TrendingUp size={13} /> Traction
          </p>
          <p className="text-sm text-[#0F172A]">{competitor.traction}</p>
        </div>

        <div className="col-span-2">
          <p className="text-xs font-semibold text-[#94A3B8] mb-1 flex items-center gap-1 font-mono uppercase tracking-wider">
            <Zap size={13} /> Fonctionnalités clés
          </p>
          <div className="flex flex-wrap gap-1">
            {competitor.fonctionnalitesCles.map((feat, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 bg-[#F8F9FA] text-[#475569] border border-[#E2E8F0] font-mono">
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SWOT mini */}
      <div className="grid grid-cols-2 gap-3 mt-2 pt-4 border-t-2 border-[#E2E8F0]">
        <div>
          <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mb-1.5 font-mono uppercase">
            <ThumbsUp size={12} /> Forces
          </p>
          <ul className="text-xs text-[#475569] space-y-1">
            {competitor.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-emerald-500 mt-0.5">▸</span> <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-red-600 flex items-center gap-1 mb-1.5 font-mono uppercase">
            <ThumbsDown size={12} /> Faiblesses
          </p>
          <ul className="text-xs text-[#475569] space-y-1">
            {competitor.weaknesses.slice(0, 3).map((w, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-red-500 mt-0.5">▸</span> <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
