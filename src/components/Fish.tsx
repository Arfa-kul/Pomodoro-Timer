import type { TimerMode } from '../lib/types';

interface FishProps {
  mode: TimerMode;
  isRunning: boolean;
  /** 0..1 progress within the tank to position the fish vertically */
  waterLevel: number;
}

export default function Fish({ mode, isRunning }: FishProps) {
  // Determine animation class based on state
  let animClass = 'fish-idle';
  if (isRunning && mode === 'focus') animClass = 'fish-swim';
  else if (isRunning && (mode === 'shortBreak' || mode === 'longBreak'))
    animClass = 'fish-happy';

  const fishColor =
    mode === 'focus' ? '#f97316' : mode === 'shortBreak' ? '#22d3ee' : '#fbbf24';
  const finColor =
    mode === 'focus' ? '#ea580c' : mode === 'shortBreak' ? '#06b6d4' : '#f59e0b';

  return (
    <div className={`absolute inset-0 pointer-events-none ${animClass}`}>
      <svg
        viewBox="0 0 120 80"
        className="w-16 h-10 sm:w-20 sm:h-14 md:w-24 md:h-16 drop-shadow-lg absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        aria-label="Fish"
      >
        {/* Body */}
        <ellipse cx="60" cy="40" rx="35" ry="22" fill={fishColor} />

        {/* Tail */}
        <path
          d="M25 40 L5 20 L10 40 L5 60 Z"
          fill={finColor}
        />

        {/* Dorsal Fin */}
        <path
          d="M55 18 Q60 5 70 18"
          fill={finColor}
          stroke="none"
        />

        {/* Eye */}
        <circle cx="78" cy="35" r="5" fill="white" />
        <circle cx="80" cy="34" r="2.5" fill="#1e293b" />

        {/* Eye highlight */}
        <circle cx="81" cy="33" r="1" fill="white" />

        {/* Mouth */}
        <path
          d="M92 42 Q95 44 92 46"
          stroke="#1e293b"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Belly stripe */}
        <ellipse cx="62" cy="48" rx="25" ry="8" fill="rgba(255,255,255,0.2)" />

        {/* Pectoral fin */}
        <path
          d="M70 50 Q75 60 65 58"
          fill={finColor}
          opacity="0.8"
        />

        {/* Bubbles from mouth */}
        {isRunning && (
          <>
            <circle cx="98" cy="36" r="2" fill="rgba(255,255,255,0.5)" className="fish-bubble-1" />
            <circle cx="103" cy="30" r="1.5" fill="rgba(255,255,255,0.4)" className="fish-bubble-2" />
          </>
        )}
      </svg>
    </div>
  );
}
