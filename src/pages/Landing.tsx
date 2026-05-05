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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white text-sm font-black">
              ◈
            </div>
            <span className="text-lg">ProjectAudit<span className="text-primary-600">.ai</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Comment ça marche
            </a>
            <a href="#proof" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
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
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 animate-fade-in">
          {['Fonctionnalités', 'Comment ça marche', 'Exemples'].map(label => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(' ', '-')}`}
              className="block py-2 text-slate-700 font-medium"
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
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 60%, #0F172A 100%)',
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" aria-hidden />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
              <span className="text-white/80 text-sm font-medium">IA de pointe · Analyse en ~3 minutes</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Pas de
                <br />
                <span className="text-gradient">mensonge,</span>
                <br />
                que la réalité.
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-lg">
                Obtenez un audit brutal et honnête de votre projet en quelques minutes.
                Score objectif sur 100, critique sans filtre, roadmap personnalisée.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => navigate('/submit')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white text-lg font-bold rounded-xl
                           hover:bg-primary-700 active:bg-primary-800
                           shadow-glow-blue hover:shadow-xl
                           transition-all duration-200"
              >
                Auditer mon projet
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/results')}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors"
              >
                Voir un exemple de rapport
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {['🧑‍💻', '👩‍💼', '🧑‍🚀', '👩‍🔬'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-sm">
                <span className="text-white font-bold">2 847</span> projets audités cette semaine
              </p>
            </div>
          </div>

          {/* Right: Score preview */}
          <div className="hidden lg:flex justify-center animate-scale-in animation-delay-300">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl w-80">
                <div className="text-center mb-6">
                  <ScoreGauge score={72} size="md" animate={false} showLabel={true} />
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Innovation', score: 75, color: '#2563EB' },
                    { label: 'Marché cible', score: 85, color: '#10B981' },
                    { label: 'Concurrence', score: 40, color: '#DC2626' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-xs text-white/60 w-24 text-right flex-shrink-0">{item.label}</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.score}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white/80 w-7">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating tags */}
              <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce-slow">
                ⚠️ 3 risques critiques
              </div>
              <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                ✅ Bon potentiel
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
      icon: <Target size={28} className="text-primary-600" />,
      bg: 'bg-primary-50',
      title: 'Analyse objective par IA',
      description:
        'Notre IA analyse votre projet sans biais ni complaisance. Elle identifie les risques réels que votre entourage ne vous dira jamais.',
      detail: 'Propulsé par des LLMs de pointe',
    },
    {
      icon: <BarChart3 size={28} className="text-secondary-600" />,
      bg: 'bg-secondary-50',
      title: 'Score sur 100 détaillé',
      description:
        'Un score global calculé sur 7 critères essentiels — marché, innovation, concurrence, équipe, modèle économique et plus.',
      detail: '7 critères pondérés par secteur',
    },
    {
      icon: <Map size={28} className="text-emerald-600" />,
      bg: 'bg-emerald-50',
      title: 'Roadmap personnalisée',
      description:
        'Un plan d\'action concret en 6 phases, adapté à votre projet, avec des objectifs clairs et des KPIs mesurables.',
      detail: '6 phases avec actions prioritaires',
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge bg-primary-50 text-primary-700 mb-4">Fonctionnalités</span>
          <h2 className="section-title">Tout ce dont vous avez besoin</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Un audit complet qui vous donne la réalité de votre marché, pas des encouragements vides.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="card-hover p-8 rounded-2xl text-center space-y-4"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center mx-auto`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.description}</p>
              <span className="badge bg-slate-100 text-slate-500 text-xs mx-auto">
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
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge bg-secondary-50 text-secondary-700 mb-4">Comment ça marche</span>
          <h2 className="section-title">Simple. Rapide. Brutal.</h2>
          <p className="section-subtitle">3 étapes pour obtenir un audit que vous ne lirez pas sans une profonde respiration.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-slate-200" aria-hidden />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center gap-4">
              {/* Number circle */}
              <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl flex flex-col items-center justify-center shadow-sm relative z-10">
                <span className="text-3xl" role="img">{step.icon}</span>
                <span className="text-xs font-bold text-slate-300 font-mono">{step.number}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">{step.desc}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-slate-400">
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
    { name: 'SaaS B2B analytics', score: 84, industry: 'SaaS', emoji: '🚀' },
    { name: 'App lifestyle & bien-être', score: 41, industry: 'HealthTech', emoji: '⚠️' },
    { name: 'Marketplace artisanat', score: 67, industry: 'E-commerce', emoji: '⚡' },
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
    <section id="proof" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Score examples */}
        <div>
          <div className="text-center mb-12">
            <span className="badge bg-amber-50 text-amber-700 mb-4">Projets réels</span>
            <h2 className="section-title">Scores anonymisés de cette semaine</h2>
            <p className="section-subtitle">Tous les profils de projet. Toutes les réalités.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {exampleScores.map((item, i) => (
              <div key={i} className="card p-6 text-center space-y-4">
                <span className="badge bg-slate-100 text-slate-600 text-xs mx-auto">{item.industry}</span>
                <div className="mx-auto">
                  <ScoreGauge score={item.score} size="sm" animate={false} showLabel={false} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {item.score > 80 ? 'Excellent potentiel — investissement recommandé'
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
            <span className="badge bg-emerald-50 text-emerald-700 mb-4">Témoignages</span>
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
                <p className="text-slate-700 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-700">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1E3A8A, #7C3AED)' }}
        >
          <div className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Votre projet mérite la vérité.
            </h2>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">
              Gratuit, sans inscription, en 3 minutes. Arrêtez de deviner — sachez.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/submit')}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-primary-700 text-lg font-bold rounded-xl
                           hover:bg-primary-50 shadow-2xl transition-all duration-200"
              >
                Auditer mon projet gratuitement
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-blue-200 flex-wrap">
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
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-600 to-secondary-600 rounded flex items-center justify-center text-white text-xs font-black">
                ◈
              </div>
              ProjectAudit.ai
            </div>
            <p className="text-sm">Pas de mensonge, que la réalité.</p>
            <p className="text-xs mt-2 flex items-center gap-1.5">
              <TrendingUp size={12} />
              2 847 audits cette semaine · 98% satisfaction
            </p>
          </div>

          <div className="flex gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-semibold text-slate-300 text-xs uppercase tracking-wide">Produit</p>
              <ul className="space-y-1.5">
                {['Fonctionnalités', 'Tarifs', 'API', 'Statut'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-slate-300 text-xs uppercase tracking-wide">Légal</p>
              <ul className="space-y-1.5">
                {['CGU', 'Confidentialité', 'Cookies', 'Mentions légales'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 ProjectAudit.ai. Tous droits réservés.</p>
          <p>Propulsé par l'IA · Fabriqué en France 🇫🇷</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Landing() {
  return (
    <div className="min-h-screen">
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
