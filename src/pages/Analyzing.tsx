import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ANALYZING_STAGES, MOTIVATING_MESSAGES } from '../design-tokens';

const TOTAL_DURATION_MS = 9000;  // 9 seconds total
const TICK_INTERVAL_MS = 60;     // update every 60ms
const TOTAL_TICKS = TOTAL_DURATION_MS / TICK_INTERVAL_MS; // 150 ticks

function getCurrentStage(progress: number) {
  return (
    ANALYZING_STAGES.find(s => progress >= s.startPct && progress < s.endPct) ??
    ANALYZING_STAGES[ANALYZING_STAGES.length - 1]
  );
}

// Smooth easing function for the progress bar — slows down at key stage transitions
function ease(t: number): number {
  // Slow down at 25, 50, 75 to simulate "real" processing pauses
  const breaks = [0.25, 0.5, 0.75, 1.0];
  for (const b of breaks) {
    const lower = b - 0.25;
    const relT = (t - lower) / 0.25;
    if (t <= b) {
      // Ease-out within this segment, with a slight pause at 80-100% of segment
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

  // Progress ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => {
        const next = prev + 1;
        if (next >= TOTAL_TICKS && !doneRef.current) {
          doneRef.current = true;
          clearInterval(interval);
          setTimeout(() => navigate('/results', { replace: true }), 600);
        }
        return next;
      });
    }, TICK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [navigate]);

  // Rotate motivating messages every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MOTIVATING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const progressPct = Math.round(progress);
  const stageIndex = ANALYZING_STAGES.findIndex(s => s === stage);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0F172A, #1E1B4B)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden />

      <div className="relative w-full max-w-md space-y-10 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center text-white font-black text-lg">
              ◈
            </div>
            <span className="text-white font-bold text-xl">ProjectAudit<span className="text-primary-400">.ai</span></span>
          </div>
        </div>

        {/* Animated orbit icon */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            {/* Outer rotating ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin-slow"
              style={{ animationDuration: '4s' }}
            />
            {/* Inner rotating ring (opposite) */}
            <div
              className="absolute inset-3 rounded-full border-2 border-secondary-500/30 border-b-secondary-500 animate-spin-slow"
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
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Analyse de</p>
          <h1 className="mt-1 text-2xl font-black text-white">"{projectName}"</h1>
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
                {/* Status dot */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${isDone ? 'bg-emerald-500' : isCurrent ? 'bg-primary-500 animate-pulse-slow' : 'bg-slate-700'}`}>
                  {isDone ? (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span className="text-sm">{s.emoji}</span>
                  )}
                </div>

                <span className={`text-sm font-medium ${isCurrent ? 'text-white' : isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
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
                  <span className="ml-auto text-xs text-emerald-400 font-semibold">✓</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Progression</span>
            <span className="text-white font-bold">{progressPct}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150 ease-linear"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
              }}
            />
          </div>
        </div>

        {/* Rotating motivating message */}
        <div className="text-center min-h-[3rem] flex items-center justify-center">
          <p
            key={msgIndex}
            className="text-slate-400 text-sm italic leading-relaxed animate-fade-in max-w-xs"
          >
            "{MOTIVATING_MESSAGES[msgIndex]}"
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-slate-600 text-xs">
          Ne fermez pas cette fenêtre · L'analyse est en cours
        </p>
      </div>
    </div>
  );
}
