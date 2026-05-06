import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ANALYZING_STAGES, MOTIVATING_MESSAGES } from '../design-tokens';

const TOTAL_DURATION_MS = 9000;
const TICK_INTERVAL_MS = 60;
const TOTAL_TICKS = TOTAL_DURATION_MS / TICK_INTERVAL_MS;

function getCurrentStage(progress: number) {
  return (
    ANALYZING_STAGES.find(s => progress >= s.startPct && progress < s.endPct) ??
    ANALYZING_STAGES[ANALYZING_STAGES.length - 1]
  );
}

function ease(t: number): number {
  const breaks = [0.25, 0.5, 0.75, 1.0];
  for (const b of breaks) {
    const lower = b - 0.25;
    const relT = (t - lower) / 0.25;
    if (t <= b) {
      const adjusted = relT < 0.8 ? relT / 0.8 * 0.92 : 0.92 + (relT - 0.8) / 0.2 * 0.08;
      return (lower + adjusted * 0.25) * 100;
    }
  }
  return 100;
}

export default function Analyzing() {
  const navigate = useNavigate();
  const location = useLocation();
  const projectName = (location.state as { projectName?: string })?.projectName ?? 'votre projet';

  const [tick, setTick] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const doneRef = useRef(false);

  const progress = Math.min(ease(tick / TOTAL_TICKS), 100);
  const stage = getCurrentStage(progress);

  useEffect(() => {
    let extraction = null;
    try {
      extraction = JSON.parse(localStorage.getItem('auditExtraction') || 'null');
    } catch {
      // ignore
    }

    if (!extraction) {
      navigate('/submit', { replace: true });
      return;
    }

    let isDone = false;

    const interval = setInterval(() => {
      setTick(prev => {
        const next = prev + 1;
        if (next >= TOTAL_TICKS && !isDone) {
          return TOTAL_TICKS - 1;
        }
        return next;
      });
    }, TICK_INTERVAL_MS);

    import('../lib/auditOrchestrator').then(({ runAuditOrchestration }) => {
      runAuditOrchestration(extraction, (_step) => {}).then((_result) => {
        isDone = true;
        if (!doneRef.current) {
          doneRef.current = true;
          clearInterval(interval);
          setTick(TOTAL_TICKS);
          setTimeout(() => navigate('/results', { replace: true }), 600);
        }
      }).catch(_err => {
        isDone = true;
        clearInterval(interval);
        setTimeout(() => navigate('/results', { replace: true }), 600);
      });
    });

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MOTIVATING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const progressPct = Math.round(progress);
  const stageIndex = ANALYZING_STAGES.findIndex(s => s === stage);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#0A0E14]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden />

      {/* Top red accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary-500" />

      <div className="relative w-full max-w-md space-y-10 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 flex items-center justify-center text-white font-black text-lg font-mono border-2 border-primary-700">
              ◈
            </div>
            <span className="text-white font-bold text-xl font-display">VeritAudit<span className="text-primary-500">.ai</span></span>
          </div>
        </div>

        {/* Animated orbit icon */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            {/* Outer rotating ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-primary-900 border-t-primary-500 animate-spin-slow"
              style={{ animationDuration: '4s' }}
            />
            {/* Inner rotating ring */}
            <div
              className="absolute inset-3 rounded-full border-2 border-[#2D3541] border-b-secondary-500 animate-spin-slow"
              style={{ animationDuration: '3s', animationDirection: 'reverse' }}
            />
            {/* Center stage emoji */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-4xl transition-all duration-500"
                key={stage.emoji}
                role="img"
                aria-label={stage.label}
                style={{ animation: 'scaleIn 0.4s ease-out' }}
              >
                {stage.emoji}
              </span>
            </div>
          </div>
        </div>

        {/* Project name */}
        <div className="text-center">
          <p className="text-[#4B5563] text-xs font-bold uppercase tracking-widest font-mono">Analyse de</p>
          <h1 className="mt-1 text-2xl font-black text-white font-display">"{projectName}"</h1>
        </div>

        {/* Stage labels */}
        <div className="space-y-3">
          {ANALYZING_STAGES.map((s, i) => {
            const isDone = i < stageIndex;
            const isCurrent = i === stageIndex;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-500
                  ${isDone ? 'opacity-50' : isCurrent ? 'opacity-100' : 'opacity-25'}`}
              >
                {/* Status indicator — square */}
                <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all duration-300 border-2
                  ${isDone
                    ? 'bg-emerald-900/30 border-emerald-700'
                    : isCurrent
                    ? 'bg-primary-900/30 border-primary-600 animate-pulse-slow'
                    : 'bg-[#1C2128] border-[#2D3541]'}`}>
                  {isDone ? (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4 8L11 1" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span className="text-sm">{s.emoji}</span>
                  )}
                </div>

                <span className={`text-sm font-medium font-mono ${isCurrent ? 'text-white' : isDone ? 'text-emerald-400' : 'text-[#4B5563]'}`}>
                  {s.label}
                  {isCurrent && (
                    <span className="ml-2 inline-block">
                      <span className="inline-flex gap-0.5">
                        {[0, 1, 2].map(j => (
                          <span
                            key={j}
                            className="inline-block w-1 h-1 bg-primary-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${j * 0.15}s` }}
                          />
                        ))}
                      </span>
                    </span>
                  )}
                </span>

                {isDone && (
                  <span className="ml-auto text-xs text-emerald-400 font-bold font-mono">✓</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[#4B5563] font-mono">
            <span>Progression</span>
            <span className="text-white font-bold">{progressPct}%</span>
          </div>
          <div className="h-2 bg-[#1C2128] border border-[#2D3541] overflow-hidden">
            <div
              className="h-full transition-all duration-150 ease-linear bg-primary-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Rotating motivating message */}
        <div className="text-center min-h-[3rem] flex items-center justify-center">
          <p
            key={msgIndex}
            className="text-[#6B7280] text-sm italic leading-relaxed animate-fade-in max-w-xs font-mono"
          >
            "{MOTIVATING_MESSAGES[msgIndex]}"
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[#2D3541] text-xs font-mono border-t border-[#1C2128] pt-4">
          Ne fermez pas cette fenêtre · L'analyse est en cours
        </p>
      </div>
    </div>
  );
}
