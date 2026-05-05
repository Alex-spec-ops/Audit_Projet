import { BatteryWarning, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import type { MarketLandscape } from '../types';

export default function MarketLandscapeView({ landscape }: { landscape: MarketLandscape }) {
  const getSaturationColor = (level: string) => {
    switch (level) {
      case 'faible': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'moyen': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'élevé': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Saturation Card */}
      <div className="card p-5 border-l-4 border-l-primary-500 md:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <BatteryWarning size={18} className="text-primary-500" />
            Saturation du marché
          </h3>
          <span className={`text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full border ${getSaturationColor(landscape.saturation_marche)}`}>
            {landscape.saturation_marche}
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {landscape.saturation_justification}
        </p>
      </div>

      {/* Barrières à l'entrée */}
      <div className="card p-5 border-t-4 border-t-red-400">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-red-500" />
          Barrières à l'entrée
        </h3>
        <ul className="space-y-2">
          {landscape.barrieres_entree.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-red-400 mt-1 flex-shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Opportunités */}
      <div className="card p-5 border-t-4 border-t-emerald-400">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
          <Lightbulb size={18} className="text-emerald-500" />
          Opportunités de différenciation
        </h3>
        <ul className="space-y-2">
          {landscape.opportunites.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-emerald-400 mt-1 flex-shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tendances */}
      <div className="card p-5 md:col-span-2 border-t-4 border-t-blue-400">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
          <TrendingUp size={18} className="text-blue-500" />
          Tendances du secteur (2024-2025)
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {landscape.tendances.map((item, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex gap-3 items-start">
               <span className="text-blue-500 font-bold bg-blue-100 w-6 h-6 flex items-center justify-center rounded text-xs flex-shrink-0">
                 {i + 1}
               </span>
               <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
