import { useEffect, useState, useRef } from 'react';
import { getScoreConfig } from '../design-tokens';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  showLabel?: boolean;
}

const SIZE_MAP = {
  sm: { svgSize: 120, radius: 46, strokeWidth: 8, fontSize: 22, subFontSize: 11 },
  md: { svgSize: 180, radius: 70, strokeWidth: 10, fontSize: 34, subFontSize: 13 },
  lg: { svgSize: 240, radius: 96, strokeWidth: 12, fontSize: 48, subFontSize: 16 },
};

export default function ScoreGauge({
  score,
  size = 'lg',
  animate = true,
  showLabel = true,
}: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const [strokeOffset, setStrokeOffset] = useState<number | null>(null);
  const hasAnimated = useRef(false);

  const { svgSize, radius, strokeWidth, fontSize, subFontSize } = SIZE_MAP[size];
  const circumference = 2 * Math.PI * radius;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  const config = getScoreConfig(displayScore);
  const targetOffset = circumference * (1 - score / 100);

  useEffect(() => {
    if (!animate) return;
    
    // Reset score for re-runs
    setDisplayScore(0);

    // Number counter
    const duration = 2000;
    const steps = 80;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * score);
      setDisplayScore(current);
      if (step >= steps) {
        clearInterval(timer);
        setDisplayScore(score); // ensure exact target is reached
      }
    }, interval);

    // Trigger SVG animation after 1 frame
    requestAnimationFrame(() => {
      setStrokeOffset(targetOffset);
    });

    return () => clearInterval(timer);
  }, [animate, score, targetOffset]);

  // Non-animated: set offset immediately
  useEffect(() => {
    if (!animate) setStrokeOffset(targetOffset);
  }, [animate, targetOffset]);

  const currentOffset = strokeOffset ?? circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          aria-label={`Score : ${score} sur 100`}
          role="img"
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />

          {/* Score arc */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={currentOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            filter="url(#glow)"
            style={{
              transition: animate
                ? 'stroke-dashoffset 2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                : 'none',
            }}
          />

          {/* Score number */}
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontWeight="800"
            fontFamily="Inter, sans-serif"
            fill={config.color}
          >
            {displayScore}
          </text>

          {/* /100 label */}
          <text
            x={cx}
            y={cy + fontSize * 0.6 + 4}
            textAnchor="middle"
            fontSize={subFontSize}
            fontWeight="500"
            fontFamily="Inter, sans-serif"
            fill="#94A3B8"
          >
            /100
          </text>
        </svg>
      </div>

      {showLabel && (
        <div className="text-center">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${config.badgeClass}`}
          >
            {config.emoji} {config.label}
          </span>
          <p className="mt-1.5 text-slate-400 text-sm font-medium tracking-wide uppercase">
            Niveau : {config.levelLabel}
          </p>
        </div>
      )}
    </div>
  );
}
