# 🐠 FocusFish — Pomodoro Timer

A beautiful underwater aquarium-themed Pomodoro Timer built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

### Timer
- **Focus** (25 min), **Short Break** (5 min), **Long Break** (15 min after every 4 sessions)
- Start, Pause, Reset, and Skip controls
- Auto-switches to the next mode when a session ends (waits for you to press Start)
- Timestamp-based timing (`Date.now`) — stays accurate even when the tab is in the background
- Tab title shows remaining time (e.g. `24:13 — Focus | FocusFish`)

### Fish Theme
- Full-screen ocean gradient background with animated rising bubbles
- Glassy "fish tank" card with draining water level during focus, refilling during breaks
- Cute SVG fish that swims calmly during focus, does a happy flip during breaks, and floats still when paused
- **My Aquarium** — collect a colorful fish for each completed focus session!
- Mode tabs styled as glowing bubbles, buttons with soft gradient glows

### Sound & Notifications
- Bubble chime sound when a session ends (Web Audio API — no external files)
- Mute/unmute toggle remembered across reloads
- Browser notifications when time is up

### Customization
- Settings modal to change focus/break durations
- Session counter persisted in localStorage, resets daily
- Keyboard shortcuts: `Space` = Start/Pause, `R` = Reset
- Respects `prefers-reduced-motion` by disabling animations

## 🚀 Setup

### Prerequisites
- [Node.js](https://nodejs.org/) 18+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.tsx                    # Root layout & state orchestration
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + animations
├── components/
│   ├── Aquarium.tsx           # Bottom strip of collected fish
│   ├── Bubbles.tsx            # Background bubble particles
│   ├── Controls.tsx           # Start/Pause/Reset/Skip buttons
│   ├── Fish.tsx               # SVG fish with animation states
│   ├── FishTank.tsx           # Glassy card with water level
│   ├── ModeTabs.tsx           # Focus/Short Break/Long Break tabs
│   ├── SessionCounter.tsx     # "X sessions today" badge
│   ├── SettingsModal.tsx      # Duration settings
│   └── SoundToggle.tsx        # Mute/unmute button
├── hooks/
│   ├── useLocalStorage.ts     # Persistent state with daily reset
│   └── useTimer.ts            # Timestamp-based timer logic
└── lib/
    ├── sound.ts               # Web Audio API chime generation
    └── types.ts               # Shared types & constants
```

## ⌨️ Keyboard Shortcuts

| Key     | Action       |
|---------|-------------|
| `Space` | Start/Pause |
| `R`     | Reset       |

## 🎨 Colors

| Token       | Hex       |
|------------|-----------|
| Deep Navy  | `#0a1628` |
| Ocean      | `#0f2847` |
| Teal       | `#14b8a6` |
| Aqua       | `#22d3ee` |
| Coral      | `#f97316` |
| Sand Yellow| `#fbbf24` |

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (with Rolldown)
- **Tailwind CSS v4**
- **Web Audio API** for sound
- **Notification API** for browser alerts

## 📄 License

MIT
