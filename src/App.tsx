import { useEffect, useCallback, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTimer } from './hooks/useTimer';
import {
  type TimerSettings,
  DEFAULT_SETTINGS,
  FISH_COLORS,
  type CollectedFish,
  MODE_LABELS,
} from './lib/types';
import { playBubbleChime } from './lib/sound';
import Bubbles from './components/Bubbles';
import FishTank from './components/FishTank';
import ModeTabs from './components/ModeTabs';
import Controls from './components/Controls';
import SessionCounter from './components/SessionCounter';
import Aquarium from './components/Aquarium';
import SoundToggle from './components/SoundToggle';
import SettingsModal from './components/SettingsModal';

function App() {
  // Persisted state
  const [settings, setSettings] = useLocalStorage<TimerSettings>(
    'focusfish-settings',
    DEFAULT_SETTINGS
  );
  const [sessionsToday, setSessionsToday] = useLocalStorage<number>(
    'focusfish-sessions',
    0,
    true // reset daily
  );
  const [collectedFish, setCollectedFish] = useLocalStorage<CollectedFish[]>(
    'focusfish-fish',
    [],
    true // reset daily
  );
  const [isMuted, setIsMuted] = useLocalStorage<boolean>(
    'focusfish-muted',
    false
  );

  // UI state
  const [showSettings, setShowSettings] = useState(false);

  // Timer
  const timer = useTimer(settings, sessionsToday, setSessionsToday);

  // Handle session end
  const handleSessionEnd = useCallback(() => {
    // Play sound
    if (!isMuted) {
      playBubbleChime();
    }

    // Show notification
    if (Notification.permission === 'granted') {
      const modeLabel = MODE_LABELS[timer.mode];
      new Notification('FocusFish 🐠', {
        body: `${modeLabel} session complete! Time for ${
          timer.mode === 'focus' ? 'a break' : 'focus'
        }.`,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐠</text></svg>',
      });
    }

    // Add fish if focus session completed
    if (timer.mode === 'focus') {
      const newFish: CollectedFish = {
        id: `fish-${Date.now()}`,
        type: collectedFish.length % FISH_COLORS.length,
        color: FISH_COLORS[collectedFish.length % FISH_COLORS.length],
        earnedAt: Date.now(),
      };
      setCollectedFish((prev) => [...prev, newFish]);
    }
  }, [isMuted, timer.mode, collectedFish.length, setCollectedFish]);

  // Wire up onSessionEnd callback
  useEffect(() => {
    timer.onSessionEnd.current = handleSessionEnd;
  }, [handleSessionEnd, timer.onSessionEnd]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.code === 'Space') {
        e.preventDefault();
        timer.isRunning ? timer.pause() : timer.start();
      } else if (e.code === 'KeyR' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        timer.reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [timer]);

  return (
    <div className="min-h-screen min-h-dvh bg-gradient-to-b from-[#0c4a6e] via-[#0f2847] to-[#0a1628] relative overflow-hidden flex flex-col">
      {/* Bubbles background */}
      <Bubbles />

      {/* Seaweed decorations at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,120 Q50,60 100,90 Q150,120 200,80 Q250,40 300,100 Q350,120 400,70 Q450,30 500,90 Q550,120 600,60 Q650,20 700,80 Q750,120 800,50 Q850,10 900,70 Q950,120 1000,40 Q1050,0 1100,80 Q1150,120 1200,60 L1200,120 Z"
            fill="rgba(20,184,166,0.15)"
          />
        </svg>
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
        <h1 className="text-xl sm:text-2xl font-bold text-white/80 tracking-tight flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">🐠</span>
          <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
            FocusFish
          </span>
        </h1>

        <div className="flex items-center gap-2">
          <SoundToggle
            isMuted={isMuted}
            onToggle={() => setIsMuted((prev) => !prev)}
          />
          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50 hover:bg-white/[0.12] hover:text-white/80 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
            aria-label="Open settings"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-8">
        <ModeTabs
          currentMode={timer.mode}
          onModeChange={timer.setMode}
          isRunning={timer.isRunning}
        />

        <FishTank
          mode={timer.mode}
          isRunning={timer.isRunning}
          progress={timer.progress}
          remainingSeconds={timer.remainingSeconds}
          totalSeconds={timer.totalSeconds}
        />

        <Controls
          isRunning={timer.isRunning}
          onStart={timer.start}
          onPause={timer.pause}
          onReset={timer.reset}
          onSkip={timer.skip}
        />

        <SessionCounter sessionsToday={sessionsToday} />

        <Aquarium collectedFish={collectedFish} />
      </main>

      {/* Keyboard hints */}
      <footer className="relative z-10 text-center pb-4 sm:pb-6">
        <p className="text-xs text-white/20">
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-white/30 text-[10px]">Space</kbd>
          {' '}Start/Pause{' · '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-white/30 text-[10px]">R</kbd>
          {' '}Reset
        </p>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={setSettings}
      />
    </div>
  );
}

export default App;
