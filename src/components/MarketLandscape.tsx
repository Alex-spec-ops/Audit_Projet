import { BatteryWarning, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import type { MarketLandscape } from '../types';

export default function MarketLandscapeView({ landscape }: { landscape: MarketLandscape }) {
  const getSaturationStyle = (level: string) => {
    switch (level) {
      case 'faible': return 'bg-emerald-900/20 text-emerald-400 border border-emerald-800';
      case 'moyen':  return 'bg-amber-900/20 text-amber-400 border border-amber-800';
      case 'élevé':  return 'bg-red-900/20 text-red-400 border border-red-800';
      default:       return 'bg-[#1C2128] text-[#9CA3AF] border border-[#3F4753]';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Saturation Card */}
      <div className="card p-5 border-l-4 border-l-primary-500 md:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-white flex items-center gap-2 font-display text-sm">
            <BatteryWarning size={18} className="text-primary-500" />
            Saturation du marché
          </h3>
          <span className={`text-xs font-bold font-mono px-3 py-1 uppercase tracking-wider ${getSaturationStyle(landscape.saturation_marche)}`}>
            {landscape.saturation_marche}
          </span>
        </div>
        <p className="text-sm text-[#9CA3AF] leading-relaxed">
          {landscape.saturation_justification}
        </p>
      </div>

      {/* Barrières à l'entrée */}
      <div className="card p-5 border-t-4 border-t-primary-500">
        <h3 className="font-bold text-white flex items-center gap-2 mb-3 font-display text-sm">
          <AlertTriangle size={18} className="text-primary-500" />
          Barrières à l'entrée
        </h3>
        <ul className="space-y-2">
          {landscape.barrieres_entree.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#D1D5DB]">
              <span className="text-primary-500 mt-1 flex-shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Opportunités */}
      <div className="card p-5 border-t-4 border-t-emerald-600">
        <h3 className="font-bold text-white flex items-center gap-2 mb-3 font-display text-sm">
          <Lightbulb size={18} className="text-emerald-400" />
          Opportunités de différenciation
        </h3>
        <ul className="space-y-2">
          {landscape.opportunites.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#D1D5DB]">
              <span className="text-emerald-500 mt-1 flex-shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tendances */}
      <div className="card p-5 md:col-span-2 border-t-4 border-t-secondary-500">
        <h3 className="font-bold text-white flex items-center gap-2 mb-3 font-display text-sm">
          <TrendingUp size={18} className="text-secondary-500" />
          Tendances du secteur (2024-2025)
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {landscape.tendances.map((item, i) => (
            <div key={i} className="bg-[#1C2128] border border-[#2D3541] p-3 flex gap-3 items-start">
              <span className="text-secondary-500 font-bold bg-[#2D3541] w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 font-mono">
                {i + 1}
              </span>
              <p className="text-sm text-[#D1D5DB]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
