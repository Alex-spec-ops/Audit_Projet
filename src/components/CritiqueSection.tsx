import { useState } from 'react';
import { ChevronDown, AlertTriangle, Zap, Skull, CheckCircle, Eye, EyeOff } from 'lucide-react';
import type { CritiqueData } from '../types';

interface CritiqueItemProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  borderColor: string;
  bgColor: string;
  isOpen: boolean;
  onToggle: () => void;
  locked: boolean;
}

function CritiqueItem({ icon, title, items, borderColor, bgColor, isOpen, onToggle, locked }: CritiqueItemProps) {
  return (
    <div className={`border-2 overflow-hidden transition-all duration-200 ${borderColor} ${bgColor}`}>
      <button
        onClick={onToggle}
        disabled={locked}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors disabled:cursor-not-allowed"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-white font-display text-sm">{title}</span>
          <span className="text-xs font-mono bg-[#1C2128] text-[#9CA3AF] px-2 py-0.5 border border-[#3F4753]">
            {items.length} points
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-[#6B7280] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className="accordion-content"
        style={{ maxHeight: isOpen ? `${items.length * 80 + 32}px` : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <ul className="px-5 pb-5 space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[#D1D5DB] text-sm leading-relaxed">
              <span className="mt-1.5 flex-shrink-0 w-1 h-1 bg-[#6B7280]" />
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
      icon: <AlertTriangle size={18} className="text-primary-500" />,
      title: 'Les angles morts (Ce qui ne va pas)',
      items: critique.faiblesses_majeures,
      borderColor: 'border-primary-700',
      bgColor: 'bg-primary-900/10',
    },
    {
      icon: <Zap size={18} className="text-amber-400" />,
      title: 'Les menaces réelles',
      items: critique.menaces_reelles,
      borderColor: 'border-amber-800',
      bgColor: 'bg-amber-900/10',
    },
    {
      icon: <Skull size={18} className="text-[#6B7280]" />,
      title: 'Pourquoi ça peut échouer',
      items: critique.scenarios_echec,
      borderColor: 'border-[#3F4753]',
      bgColor: 'bg-[#1C2128]',
    },
    {
      icon: <CheckCircle size={18} className="text-emerald-400" />,
      title: 'Ce qu\'il faut changer maintenant',
      items: critique.actions_correctrices,
      borderColor: 'border-emerald-800',
      bgColor: 'bg-emerald-900/10',
    },
  ];

  return (
    <section aria-label="Section critique" className="space-y-4">
      {/* Header card with critique banner */}
      <div className="border-2 border-primary-700 bg-primary-900/10 relative">
        {/* Banner "PAS DE MENSONGE" */}
        <div className="critique-banner">
          ⚠️ PAS DE MENSONGE, QUE LA RÉALITÉ
        </div>

        <div className="p-6 mt-0 flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-900/30 border border-primary-700 flex items-center justify-center text-2xl">
            {revealed ? '🔥' : '⚠️'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-primary-400 font-display">Critique sans filtre</h3>
            <p className="mt-1 text-[#9CA3AF] text-sm leading-relaxed">
              Cette section contient l'analyse non filtrée de votre projet. Elle peut être difficile à lire, mais c'est exactement ce dont vous avez besoin pour réussir.
            </p>
            {revealed && (
              <div className="mt-4 p-4 bg-[#1C2128] border-l-4 border-primary-500 animate-fade-in">
                <p className="text-sm font-bold text-white italic font-mono">
                  "{critique.verdict_final}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accordion items with blur reveal */}
      <div className={`space-y-2 transition-all duration-500 ${!revealed ? 'blur-reveal' : 'blur-reveal revealed'}`}>
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
          <p className="text-[#6B7280] text-sm text-center max-w-sm">
            Les résultats sont disponibles. Êtes-vous prêt·e à recevoir une analyse honnête ?
          </p>
          <button
            onClick={() => setRevealed(true)}
            className="btn-primary"
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
            className="inline-flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
          >
            <EyeOff size={14} />
            Masquer la critique
          </button>
        </div>
      )}
    </section>
  );
}
