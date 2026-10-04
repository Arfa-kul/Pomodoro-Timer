interface SessionCounterProps {
  sessionsToday: number;
}

export default function SessionCounter({ sessionsToday }: SessionCounterProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm">
        <svg className="w-4 h-4 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className="text-sm text-white/60">
          <span className="text-white/90 font-semibold">{sessionsToday}</span>{' '}
          {sessionsToday === 1 ? 'session' : 'sessions'} today
        </span>
      </div>
    </div>
  );
}
