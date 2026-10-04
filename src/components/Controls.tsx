interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export default function Controls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
      {/* Reset */}
      <button
        onClick={onReset}
        className="control-btn w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.08] border border-white/10 text-white/60 hover:bg-white/[0.14] hover:text-white/90 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
        aria-label="Reset timer (R)"
        title="Reset (R)"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Start / Pause */}
      <button
        onClick={isRunning ? onPause : onStart}
        className="control-btn-primary w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_40px_rgba(20,184,166,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
        aria-label={isRunning ? 'Pause timer (Space)' : 'Start timer (Space)'}
        title={isRunning ? 'Pause (Space)' : 'Start (Space)'}
      >
        {isRunning ? (
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-7 h-7 sm:w-8 sm:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="control-btn w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.08] border border-white/10 text-white/60 hover:bg-white/[0.14] hover:text-white/90 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
        aria-label="Skip to next session"
        title="Skip"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 4l10 8-10 8V4zm12 0v16h2V4h-2z" />
        </svg>
      </button>
    </div>
  );
}
