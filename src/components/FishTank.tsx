import type { TimerMode } from '../lib/types';
import Fish from './Fish';

interface FishTankProps {
  mode: TimerMode;
  isRunning: boolean;
  progress: number; // 0 (full) to 1 (empty)
  remainingSeconds: number;
  totalSeconds: number;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function FishTank({
  mode,
  isRunning,
  progress,
  remainingSeconds,
  totalSeconds,
}: FishTankProps) {
  // During breaks, water refills — invert the progress
  const isBreak = mode !== 'focus';
  const waterHeight = isBreak ? `${(progress) * 100}%` : `${(1 - progress) * 100}%`;

  const waterColor =
    mode === 'focus'
      ? 'rgba(20, 184, 166, 0.25)'
      : mode === 'shortBreak'
      ? 'rgba(34, 211, 238, 0.25)'
      : 'rgba(249, 115, 22, 0.2)';

  const waterColorDeep =
    mode === 'focus'
      ? 'rgba(20, 184, 166, 0.45)'
      : mode === 'shortBreak'
      ? 'rgba(34, 211, 238, 0.45)'
      : 'rgba(249, 115, 22, 0.35)';

  return (
    <div className="fish-tank-container relative w-full max-w-md mx-auto">
      {/* Glassy card */}
      <div className="fish-tank relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-2xl">
        {/* Water fill */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-linear"
          style={{
            height: waterHeight,
            background: `linear-gradient(to top, ${waterColorDeep}, ${waterColor})`,
          }}
        >
          {/* Water surface wave */}
          <div className="water-surface absolute top-0 left-0 right-0 h-3 opacity-60" />
        </div>

        {/* Fish */}
        <div className="absolute inset-0">
          <Fish mode={mode} isRunning={isRunning} waterLevel={1 - progress} />
        </div>

        {/* Timer display */}
        <div className="relative z-10 flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-6">
          <span className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white/90 tabular-nums drop-shadow-lg font-timer">
            {formatTime(remainingSeconds)}
          </span>
          <span className="mt-3 text-sm sm:text-base text-white/50 uppercase tracking-widest font-medium">
            {mode === 'focus'
              ? 'Focus Time'
              : mode === 'shortBreak'
              ? 'Short Break'
              : 'Long Break'}
          </span>
        </div>

        {/* Glass shine overlay */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

        {/* Tank rim highlight */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}
