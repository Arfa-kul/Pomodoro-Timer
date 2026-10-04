export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  focus: number;       // minutes
  shortBreak: number;  // minutes
  longBreak: number;   // minutes
}

export interface TimerState {
  mode: TimerMode;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  sessionsCompleted: number;
  sessionsToday: number;
  lastSessionDate: string; // ISO date string (YYYY-MM-DD)
}

export interface CollectedFish {
  id: string;
  type: number;    // fish variant (0-5)
  color: string;
  earnedAt: number; // timestamp
}

export const DEFAULT_SETTINGS: TimerSettings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
};

export const MODE_LABELS: Record<TimerMode, string> = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

export const MODE_COLORS: Record<TimerMode, { primary: string; glow: string }> = {
  focus: { primary: '#14b8a6', glow: 'rgba(20, 184, 166, 0.4)' },
  shortBreak: { primary: '#22d3ee', glow: 'rgba(34, 211, 238, 0.4)' },
  longBreak: { primary: '#f97316', glow: 'rgba(249, 115, 22, 0.4)' },
};

export const FISH_COLORS = [
  '#f97316', // coral orange
  '#14b8a6', // teal
  '#22d3ee', // aqua
  '#fbbf24', // sand yellow
  '#a78bfa', // lavender
  '#f472b6', // pink
  '#34d399', // emerald
  '#fb923c', // light orange
];

export const LONG_BREAK_INTERVAL = 4; // every 4 focus sessions
