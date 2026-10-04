import { useState, useEffect, useRef, useCallback } from 'react';
import { type TimerMode, type TimerSettings, DEFAULT_SETTINGS, LONG_BREAK_INTERVAL } from '../lib/types';

export interface UseTimerReturn {
  mode: TimerMode;
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  sessionsCompleted: number;
  progress: number; // 0 to 1 (0 = full, 1 = empty)
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  setMode: (mode: TimerMode) => void;
  onSessionEnd: React.MutableRefObject<(() => void) | null>;
}

export function useTimer(
  settings: TimerSettings,
  sessionsToday: number,
  setSessionsToday: (val: number | ((prev: number) => number)) => void
): UseTimerReturn {
  const getSeconds = useCallback(
    (mode: TimerMode) => settings[mode] * 60,
    [settings]
  );

  const [mode, setModeState] = useState<TimerMode>('focus');
  const [remainingSeconds, setRemainingSeconds] = useState(() => getSeconds('focus'));
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const totalSeconds = getSeconds(mode);
  const endTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const onSessionEnd = useRef<(() => void) | null>(null);

  // Compute progress (0 = full tank, 1 = empty)
  const progress = totalSeconds > 0 ? 1 - remainingSeconds / totalSeconds : 0;

  // Update tab title
  useEffect(() => {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const modeLabel = mode === 'focus' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break';
    document.title = `${timeStr} — ${modeLabel} | FocusFish`;
  }, [remainingSeconds, mode]);

  // Determine next mode
  const getNextMode = useCallback((): TimerMode => {
    if (mode === 'focus') {
      const nextSessions = sessionsCompleted + 1;
      return nextSessions % LONG_BREAK_INTERVAL === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'focus';
  }, [mode, sessionsCompleted]);

  // Switch mode (no auto-start)
  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setModeState(newMode);
      setRemainingSeconds(getSeconds(newMode));
      setIsRunning(false);
      endTimeRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [getSeconds]
  );

  // Handle timer completion
  const handleComplete = useCallback(() => {
    setIsRunning(false);
    endTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (mode === 'focus') {
      setSessionsCompleted((s) => s + 1);
      setSessionsToday((s: number) => s + 1);
    }

    // Notify parent
    onSessionEnd.current?.();

    // Auto-switch to next mode but don't start
    const nextMode = getNextMode();
    setModeState(nextMode);
    setRemainingSeconds(getSeconds(nextMode));
  }, [mode, getNextMode, getSeconds, setSessionsToday]);

  // Timer tick using requestAnimationFrame + timestamp
  const tick = useCallback(() => {
    if (!endTimeRef.current) return;

    const now = Date.now();
    const remaining = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

    setRemainingSeconds(remaining);

    if (remaining <= 0) {
      handleComplete();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [handleComplete]);

  // Start/resume
  const start = useCallback(() => {
    if (isRunning) return;
    endTimeRef.current = Date.now() + remainingSeconds * 1000;
    setIsRunning(true);
  }, [isRunning, remainingSeconds]);

  // Pause
  const pause = useCallback(() => {
    setIsRunning(false);
    endTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // Reset current mode
  const reset = useCallback(() => {
    setIsRunning(false);
    endTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRemainingSeconds(getSeconds(mode));
  }, [getSeconds, mode]);

  // Skip to next mode
  const skip = useCallback(() => {
    const nextMode = getNextMode();
    switchMode(nextMode);
  }, [getNextMode, switchMode]);

  // Set mode manually
  const setMode = useCallback(
    (newMode: TimerMode) => {
      switchMode(newMode);
    },
    [switchMode]
  );

  // Run the tick loop when running
  useEffect(() => {
    if (isRunning) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning, tick]);

  // When settings change, update remaining seconds if timer is not running
  useEffect(() => {
    if (!isRunning) {
      const newTotal = getSeconds(mode);
      // Only reset if the current remaining equals the old total (i.e., hasn't been started)
      setRemainingSeconds((prev) => {
        // If timer hasn't been partially used, reset to new duration
        if (prev === totalSeconds || prev > newTotal) {
          return newTotal;
        }
        return prev;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return {
    mode,
    remainingSeconds,
    totalSeconds,
    isRunning,
    sessionsCompleted,
    progress,
    start,
    pause,
    reset,
    skip,
    setMode,
    onSessionEnd,
  };
}
