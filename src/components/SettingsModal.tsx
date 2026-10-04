import { useState } from 'react';
import { type TimerSettings, DEFAULT_SETTINGS } from '../lib/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TimerSettings;
  onSave: (settings: TimerSettings) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: SettingsModalProps) {
  const [draft, setDraft] = useState<TimerSettings>(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    // Clamp values to reasonable ranges
    const clamped: TimerSettings = {
      focus: Math.max(1, Math.min(120, draft.focus)),
      shortBreak: Math.max(1, Math.min(60, draft.shortBreak)),
      longBreak: Math.max(1, Math.min(60, draft.longBreak)),
    };
    onSave(clamped);
    onClose();
  };

  const handleReset = () => {
    setDraft(DEFAULT_SETTINGS);
  };

  const fields = [
    { key: 'focus' as const, label: 'Focus', emoji: '🎯' },
    { key: 'shortBreak' as const, label: 'Short Break', emoji: '☕' },
    { key: 'longBreak' as const, label: 'Long Break', emoji: '🌊' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-3xl bg-[#0f2847]/95 border border-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8 animate-modal-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white/80 transition-all flex items-center justify-center"
          aria-label="Close settings"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-white/90 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Timer Settings
        </h2>

        <div className="space-y-4">
          {fields.map(({ key, label, emoji }) => (
            <div key={key}>
              <label className="block text-sm text-white/50 mb-1.5 font-medium">
                {emoji} {label} (minutes)
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={draft[key]}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    [key]: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/90 text-sm focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/30 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/50 text-sm font-medium hover:bg-white/[0.1] hover:text-white/70 transition-all"
          >
            Reset Defaults
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
