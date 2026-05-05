import { ExternalLink, Shield, ShieldAlert, ShieldX } from 'lucide-react';
import { getThreatConfig } from '../design-tokens';
import type { Competitor } from '../types';

interface CompetitorCardProps {
  competitor: Competitor;
  rank: number;
}

function ThreatIcon({ level }: { level: Competitor['threatLevel'] }) {
  if (level === 'high') return <ShieldX size={16} className="text-red-500" />;
  if (level === 'medium') return <ShieldAlert size={16} className="text-amber-500" />;
  return <Shield size={16} className="text-emerald-500" />;
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
    'bg-blue-100 text-blue-700',
    'bg-purple-100 text-purple-700',
    'bg-rose-100 text-rose-700',
    'bg-amber-100 text-amber-700',
    'bg-emerald-100 text-emerald-700',
    'bg-slate-100 text-slate-700',
  ];
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) % colors.length;
  return colors[Math.abs(hash) % colors.length];
}

export default function CompetitorCard({ competitor, rank }: CompetitorCardProps) {
  const threat = getThreatConfig(competitor.threatLevel);
  const initials = getInitials(competitor.name);
  const avatarBg = getAvatarBg(competitor.name);

  return (
    <div className="card p-5 flex flex-col gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${avatarBg}`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">#{rank}</span>
              <h4 className="font-semibold text-slate-900 leading-tight">{competitor.name}</h4>
            </div>
            <a
              href={`https://${competitor.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800 transition-colors mt-0.5"
              onClick={e => e.stopPropagation()}
            >
              {competitor.website}
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Threat badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${threat.badgeClass}`}>
          <ThreatIcon level={competitor.threatLevel} />
          {threat.label}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
        {competitor.description}
      </p>

      {/* Stats */}
      {(competitor.fundingAmount || competitor.userCount) && (
        <div className="flex gap-2 flex-wrap">
          {competitor.userCount && (
            <span className="badge bg-blue-50 text-blue-700 text-xs">
              👥 {competitor.userCount}
            </span>
          )}
          {competitor.fundingAmount && (
            <span className="badge bg-purple-50 text-purple-700 text-xs">
              💰 {competitor.fundingAmount}
            </span>
          )}
        </div>
      )}

      {/* Strengths */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Forces clés</p>
        <div className="flex flex-wrap gap-1.5">
          {competitor.strengths.map((strength, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-medium"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>

      {/* Threat bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-400 font-medium">Niveau de menace</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${threat.dotClass} transition-all duration-1000`}
            style={{
              width:
                competitor.threatLevel === 'high'
                  ? '90%'
                  : competitor.threatLevel === 'medium'
                  ? '55%'
                  : '25%',
            }}
          />
        </div>
      </div>
    </div>
  );
}
