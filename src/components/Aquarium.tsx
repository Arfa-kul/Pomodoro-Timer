import type { CollectedFish } from '../lib/types';

interface AquariumProps {
  collectedFish: CollectedFish[];
}

function SmallFish({ color, index }: { color: string; index: number }) {
  const delay = index * 0.3;
  const yOffset = Math.sin(index * 1.5) * 8;

  return (
    <div
      className="inline-block aquarium-fish-enter"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg
        viewBox="0 0 48 32"
        className="w-10 h-7 sm:w-12 sm:h-8 drop-shadow-md"
        style={{ transform: `translateY(${yOffset}px)` }}
      >
        {/* Body */}
        <ellipse cx="24" cy="16" rx="14" ry="9" fill={color} />
        {/* Tail */}
        <path d="M10 16 L2 8 L4 16 L2 24 Z" fill={color} opacity="0.8" />
        {/* Eye */}
        <circle cx="31" cy="14" r="2" fill="white" />
        <circle cx="32" cy="13.5" r="1" fill="#1e293b" />
        {/* Belly */}
        <ellipse cx="25" cy="19" rx="10" ry="3.5" fill="rgba(255,255,255,0.2)" />
        {/* Fin */}
        <path d="M22 7 Q24 2 28 7" fill={color} opacity="0.7" />
      </svg>
    </div>
  );
}

export default function Aquarium({ collectedFish }: AquariumProps) {
  if (collectedFish.length === 0) {
    return (
      <div className="mt-6 sm:mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06]">
          <span className="text-xs sm:text-sm text-white/30">
            🐠 Complete focus sessions to collect fish!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-8">
      <div className="text-center mb-3">
        <span className="text-xs sm:text-sm text-white/40 uppercase tracking-wider font-medium">
          My Aquarium
        </span>
      </div>
      <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm max-w-lg mx-auto">
        {collectedFish.map((fish, i) => (
          <SmallFish key={fish.id} color={fish.color} index={i} />
        ))}
      </div>
    </div>
  );
}
