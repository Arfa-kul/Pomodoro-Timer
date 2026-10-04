import { type TimerMode, MODE_LABELS } from '../lib/types';

interface ModeTabsProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  isRunning: boolean;
}

const modes: TimerMode[] = ['focus', 'shortBreak', 'longBreak'];

export default function ModeTabs({ currentMode, onModeChange, isRunning }: ModeTabsProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
      {modes.map((mode) => {
        const isActive = currentMode === mode;
        return (
          <button
            key={mode}
            onClick={() => !isRunning && onModeChange(mode)}
            disabled={isRunning}
            className={`
              px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold
              transition-all duration-300 ease-out
              ${
                isActive
                  ? mode === 'focus'
                    ? 'bg-teal-500/30 text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] border border-teal-400/30'
                    : mode === 'shortBreak'
                    ? 'bg-cyan-500/30 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] border border-cyan-400/30'
                    : 'bg-orange-500/30 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] border border-orange-400/30'
                  : 'bg-white/[0.06] text-white/40 border border-white/[0.06] hover:bg-white/[0.1] hover:text-white/60'
              }
              disabled:cursor-not-allowed disabled:opacity-50
              backdrop-blur-sm
            `}
            aria-pressed={isActive}
            aria-label={`Switch to ${MODE_LABELS[mode]} mode`}
          >
            {MODE_LABELS[mode]}
          </button>
        );
      })}
    </div>
  );
}
