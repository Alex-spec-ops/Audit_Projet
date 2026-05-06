import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, Target, BarChart3, Map, Star, CheckCircle, Menu, X,
  Zap, Shield, Clock, ChevronRight, TrendingUp,
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#E2E8F0]" style={{ boxShadow: '0 2px 0 rgba(15,23,42,0.04)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-[#0F172A]">
            <div className="w-8 h-8 bg-primary-500 flex items-center justify-center text-white text-sm font-black font-mono border border-primary-700">
              ◈
            </div>
            <span className="text-lg font-display">VeritAudit<span className="text-primary-500">.ai</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-[#475569] hover:text-[#0F172A] font-medium transition-colors">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="text-sm text-[#475569] hover:text-[#0F172A] font-medium transition-colors">
              Comment ça marche
            </a>
            <a href="#proof" className="text-sm text-[#475569] hover:text-[#0F172A] font-medium transition-colors">
              Exemples
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/submit')}
              className="btn-primary text-sm py-2 px-5"
            >
              Auditer gratuitement
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 hover:bg-[#F8F9FA] transition-colors border border-[#E2E8F0]"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? <X size={20} className="text-[#0F172A]" /> : <Menu size={20} className="text-[#0F172A]" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t-2 border-[#E2E8F0] px-4 py-4 space-y-3 animate-fade-in">
          {['Fonctionnalités', 'Comment ça marche', 'Exemples'].map(label => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(' ', '-')}`}
              className="block py-2 text-[#475569] hover:text-[#0F172A] font-medium border-b border-[#E2E8F0]"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => navigate('/submit')}
            className="w-full btn-primary justify-center"
          >
            Auditer gratuitement <ArrowRight size={16} />
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-[#F8F9FA]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" aria-hidden />

      {/* Red accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary-500" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E2E8F0]" style={{ boxShadow: '4px 4px 0px rgba(15,23,42,0.06)' }}>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-slow" />
              <span className="text-[#475569] text-sm font-mono">IA de pointe · Analyse en ~3 minutes</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#0F172A] leading-[1.05] tracking-tight font-display">
                Pas de
                <br />
                <span className="text-primary-500">mensonge,</span>
                <br />
                que la réalité.
              </h1>
              <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-lg">
                Obtenez un audit brutal et honnête de votre projet en quelques minutes.
                Score objectif sur 100, critique sans filtre, roadmap personnalisée.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => navigate('/submit')}
                className="btn-primary text-lg px-8 py-4"
              >
                Auditer mon projet
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate('/results')}
                className="inline-flex items-center gap-2 text-[#475569] hover:text-[#0F172A] font-medium transition-colors"
              >
                Voir un exemple de rapport
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-1">
                {['🧑‍💻', '👩‍💼', '🧑‍🚀', '👩‍🔬'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-[#F8F9FA] border-2 border-white flex items-center justify-center text-sm"
                    style={{ boxShadow: '0 0 0 2px #E2E8F0' }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-[#475569] text-sm font-mono">
                <span className="text-[#0F172A] font-bold">2 847</span> projets audités cette semaine
              </p>
            </div>
          </div>

          {/* Right: Score preview */}
          <div className="hidden lg:flex justify-center animate-scale-in animation-delay-300">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white border-2 border-[#E2E8F0] p-8 w-80" style={{ boxShadow: '8px 8px 0px rgba(230,57,70,0.12)' }}>
                <div className="text-center mb-6">
                  <ScoreGauge score={72} size="md" animate={false} showLabel={true} />
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Innovation',    score: 75, color: '#E63946' },
                    { label: 'Marché cible',  score: 85, color: '#2A9D8F' },
                    { label: 'Concurrence',   score: 40, color: '#D97706' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-xs text-[#94A3B8] w-24 text-right flex-shrink-0 font-mono">{item.label}</span>
                      <div className="flex-1 h-1.5 bg-[#F1F5F9] overflow-hidden">
                        <div
                          className="h-full"
                          style={{ width: `${item.score}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#0F172A] w-7 font-mono">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating tags — square */}
              <div className="absolute -top-4 -right-4 bg-primary-500 text-white text-xs font-bold font-mono px-3 py-1.5 border-2 border-primary-700">
                ⚠️ 3 risques critiques
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-emerald-700 text-xs font-bold font-mono px-3 py-1.5 border-2 border-emerald-200" style={{ boxShadow: '4px 4px 0px rgba(15,23,42,0.08)' }}>
                ✓ Bon potentiel
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function Features() {
  const features = [
    {
      icon: <Target size={28} className="text-primary-500" />,
      title: 'Analyse objective par IA',
      description:
        'Notre IA analyse votre projet sans biais ni complaisance. Elle identifie les risques réels que votre entourage ne vous dira jamais.',
      detail: 'Propulsé par des LLMs de pointe',
    },
    {
      icon: <BarChart3 size={28} className="text-secondary-500" />,
      title: 'Score sur 100 détaillé',
      description:
        'Un score global calculé sur 7 critères essentiels — marché, innovation, concurrence, équipe, modèle économique et plus.',
      detail: '7 critères pondérés par secteur',
    },
    {
      icon: <Map size={28} className="text-emerald-600" />,
      title: 'Roadmap personnalisée',
      description:
        'Un plan d\'action concret en 6 phases, adapté à votre projet, avec des objectifs clairs et des KPIs mesurables.',
      detail: '6 phases avec actions prioritaires',
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge bg-red-50 text-primary-600 border border-primary-200 mb-4 font-mono text-xs uppercase tracking-wider">
            Fonctionnalités
          </span>
          <h2 className="section-title">Tout ce dont vous avez besoin</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Un audit complet qui vous donne la réalité de votre marché, pas des encouragements vides.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="card-hover p-8 text-center space-y-4"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-[#F8F9FA] border-2 border-[#E2E8F0] flex items-center justify-center mx-auto">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] font-display">{f.title}</h3>
              <p className="text-[#475569] leading-relaxed">{f.description}</p>
              <span className="badge bg-[#F8F9FA] text-[#94A3B8] border border-[#E2E8F0] text-xs font-mono mx-auto">
                {f.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '✍️',
      title: 'Décrivez votre projet',
      desc: 'Collez votre pitch, uploadez un PDF ou un deck. Plus vous êtes précis, plus l\'analyse est pertinente.',
      duration: '2 minutes',
    },
    {
      number: '02',
      icon: '🤖',
      title: 'L\'IA analyse 7 dimensions',
      desc: 'Notre IA scrute le marché, identifie les concurrents, évalue la viabilité technique et économique.',
      duration: '~3 minutes',
    },
    {
      number: '03',
      icon: '📊',
      title: 'Recevez votre rapport complet',
      desc: 'Score détaillé, critique sans filtre, concurrents identifiés, roadmap sur 6 phases. Téléchargeable en PDF.',
      duration: 'Instantané',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge bg-amber-50 text-amber-700 border border-amber-200 mb-4 font-mono text-xs uppercase tracking-wider">
            Comment ça marche
          </span>
          <h2 className="section-title">Simple. Rapide. Brutal.</h2>
          <p className="section-subtitle">3 étapes pour obtenir un audit que vous ne lirez pas sans une profonde respiration.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-[#E2E8F0]" aria-hidden />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-white border-2 border-[#E2E8F0] flex flex-col items-center justify-center gap-1 relative z-10" style={{ boxShadow: '4px 4px 0px rgba(230,57,70,0.12)' }}>
                <span className="text-3xl leading-none" role="img">{step.icon}</span>
                <span className="text-xs font-bold text-primary-500 font-mono">{step.number}</span>
              </div>

              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display">{step.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed mt-2">{step.desc}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#94A3B8] font-mono">
                  <Clock size={12} />
                  {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social proof ─────────────────────────────────────────────────────────────

function SocialProof() {
  const navigate = useNavigate();

  const exampleScores = [
    { name: 'SaaS B2B analytics',       score: 84, industry: 'SaaS' },
    { name: 'App lifestyle & bien-être', score: 41, industry: 'HealthTech' },
    { name: 'Marketplace artisanat',     score: 67, industry: 'E-commerce' },
  ];

  const testimonials = [
    {
      quote: "L'audit m'a évité de perdre 18 mois sur un projet qui allait dans le mur. Je recommande.",
      author: 'Thomas D.',
      role: 'Fondateur SaaS B2B',
      stars: 5,
    },
    {
      quote: "Beaucoup plus utile qu'une validation de potes. L'IA a identifié 3 concurrents que je ne connaissais pas.",
      author: 'Marie L.',
      role: 'Entrepreneureure FoodTech',
      stars: 5,
    },
    {
      quote: "La roadmap a structuré mes 6 prochains mois. J'avais besoin de ça, pas de compliments.",
      author: 'Karim A.',
      role: 'CTO & Co-fondateur',
      stars: 5,
    },
  ];

  return (
    <section id="proof" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Score examples */}
        <div>
          <div className="text-center mb-12">
            <span className="badge bg-amber-50 text-amber-700 border border-amber-200 mb-4 font-mono text-xs uppercase tracking-wider">
              Projets réels
            </span>
            <h2 className="section-title">Scores anonymisés de cette semaine</h2>
            <p className="section-subtitle">Tous les profils de projet. Toutes les réalités.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {exampleScores.map((item, i) => (
              <div key={i} className="card p-6 text-center space-y-4">
                <span className="badge bg-[#F8F9FA] text-[#475569] border border-[#E2E8F0] text-xs font-mono mx-auto uppercase">{item.industry}</span>
                <div className="mx-auto">
                  <ScoreGauge score={item.score} size="sm" animate={false} showLabel={false} />
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A] font-display text-sm">{item.name}</p>
                  <p className="text-sm text-[#475569] mt-1 font-mono">
                    {item.score > 80 ? 'Excellent — investissement recommandé'
                      : item.score > 60 ? 'Bon potentiel — ajustements nécessaires'
                      : 'Risque élevé — pivot recommandé'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4 font-mono text-xs uppercase tracking-wider">
              Témoignages
            </span>
            <h2 className="section-title">Ils ont affronté la réalité</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6 space-y-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }, (_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[#475569] text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t-2 border-[#E2E8F0]">
                  <div className="w-8 h-8 bg-red-50 border border-primary-200 flex items-center justify-center text-xs font-bold text-primary-600 font-mono">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A] font-display">{t.author}</p>
                    <p className="text-xs text-[#94A3B8] font-mono">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-primary-500 border-2 border-primary-700" style={{ boxShadow: '8px 8px 0px rgba(15,23,42,0.12)' }}>
          <div className="p-12 text-center space-y-6">
            <div className="critique-banner mx-auto w-fit">
              ⚠️ PAS DE MENSONGE, QUE LA RÉALITÉ
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white font-display">
              Votre projet mérite la vérité.
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Gratuit, sans inscription, en 3 minutes. Arrêtez de deviner — sachez.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/submit')}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#0F172A] text-lg font-bold transition-all duration-200 font-display uppercase tracking-[0.05em]"
                style={{ boxShadow: '4px 4px 0px rgba(15,23,42,0.2)' }}
              >
                Auditer mon projet gratuitement
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-white/70 flex-wrap font-mono">
              <span className="flex items-center gap-1.5"><CheckCircle size={14} /> 100% gratuit</span>
              <span className="flex items-center gap-1.5"><Shield size={14} /> Sans inscription</span>
              <span className="flex items-center gap-1.5"><Zap size={14} /> Résultats en 3 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t-2 border-[#1E293B] text-[#475569] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <div className="w-6 h-6 bg-primary-500 flex items-center justify-center text-white text-xs font-black font-mono">
                ◈
              </div>
              <span className="font-display">VeritAudit.ai</span>
            </div>
            <p className="text-sm font-mono">Pas de mensonge, que la réalité.</p>
            <p className="text-xs mt-2 flex items-center gap-1.5 font-mono">
              <TrendingUp size={12} />
              2 847 audits cette semaine · 98% satisfaction
            </p>
          </div>

          <div className="flex gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-bold text-[#94A3B8] text-xs uppercase tracking-wider font-mono">Produit</p>
              <ul className="space-y-1.5">
                {['Fonctionnalités', 'Tarifs', 'API', 'Statut'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors font-mono">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-[#94A3B8] text-xs uppercase tracking-wider font-mono">Légal</p>
              <ul className="space-y-1.5">
                {['CGU', 'Confidentialité', 'Cookies', 'Mentions légales'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors font-mono">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t-2 border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© 2026 VeritAudit.ai. Tous droits réservés.</p>
          <p>Propulsé par l'IA · Fabriqué en France 🇫🇷</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
