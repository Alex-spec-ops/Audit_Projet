import { useState } from 'react';
import { ChevronDown, AlertTriangle, Zap, Skull, CheckCircle, Eye, EyeOff } from 'lucide-react';
import type { CritiqueData } from '../types';

interface CritiqueItemProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  accentColor: string;
  isOpen: boolean;
  onToggle: () => void;
  locked: boolean;
}

function CritiqueItem({ icon, title, items, accentColor, isOpen, onToggle, locked }: CritiqueItemProps) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${accentColor}`}>
      <button
        onClick={onToggle}
        disabled={locked}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-black/5 transition-colors disabled:cursor-not-allowed"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-slate-800">{title}</span>
          <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
            {items.length} points
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className="accordion-content"
        style={{ maxHeight: isOpen ? `${items.length * 80 + 32}px` : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <ul className="px-5 pb-5 space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-slate-700 text-sm leading-relaxed">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface CritiqueSectionProps {
  critique: CritiqueData;
}

export default function CritiqueSection({ critique }: CritiqueSectionProps) {
  const [revealed, setRevealed] = useState(false);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const toggle = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const sections = [
    {
      icon: <AlertTriangle size={18} className="text-red-500" />,
      title: 'Ce qui ne va pas',
      items: critique.whatIsWrong,
      accentColor: 'border-red-200 bg-red-50/40',
    },
    {
      icon: <Zap size={18} className="text-amber-500" />,
      title: 'Les menaces réelles',
      items: critique.realThreats,
      accentColor: 'border-amber-200 bg-amber-50/40',
    },
    {
      icon: <Skull size={18} className="text-slate-500" />,
      title: 'Pourquoi ça peut échouer',
      items: critique.whyItCanFail,
      accentColor: 'border-slate-200 bg-slate-50/40',
    },
    {
      icon: <CheckCircle size={18} className="text-emerald-500" />,
      title: 'Ce qu\'il faut changer maintenant',
      items: critique.whatToChangeNow,
      accentColor: 'border-emerald-200 bg-emerald-50/40',
    },
  ];

  return (
    <section aria-label="Section critique" className="space-y-4">
      {/* Header card */}
      <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
            ⚠️
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-800">Pas de mensonge, que la réalité</h3>
            <p className="mt-1 text-red-600 text-sm leading-relaxed">
              Cette section contient l'analyse non filtrée de votre projet. Elle peut être difficile à lire,
              mais c'est exactement ce dont vous avez besoin pour réussir.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion items with blur reveal */}
      <div className={`space-y-3 transition-all duration-500 ${!revealed ? 'blur-reveal' : 'blur-reveal revealed'}`}>
        {sections.map((section, i) => (
          <CritiqueItem
            key={i}
            {...section}
            isOpen={openItems.has(i)}
            onToggle={() => toggle(i)}
            locked={!revealed}
          />
        ))}
      </div>

      {/* Reveal button */}
      {!revealed && (
        <div className="flex flex-col items-center gap-3 py-4">
          <p className="text-slate-500 text-sm text-center max-w-sm">
            Les résultats sont disponibles. Êtes-vous prêt·e à recevoir une analyse honnête ?
          </p>
          <button
            onClick={() => setRevealed(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-xl
                       hover:bg-slate-800 active:bg-slate-950
                       shadow-lg hover:shadow-xl
                       transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <Eye size={18} />
            J'accepte la réalité
          </button>
        </div>
      )}

      {revealed && (
        <div className="flex justify-center">
          <button
            onClick={() => setRevealed(false)}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            <EyeOff size={14} />
            Masquer la critique
          </button>
        </div>
      )}
    </section>
  );
}
