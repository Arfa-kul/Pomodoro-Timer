import { useRef, useMemo } from 'react';

interface Bubble {
  id: number;
  x: number;      // % from left
  size: number;    // px
  duration: number; // seconds
  delay: number;   // seconds
  opacity: number;
}

export default function Bubbles() {
  const containerRef = useRef<HTMLDivElement>(null);

  const bubbles: Bubble[] = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 4 + Math.random() * 16,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-white bubble-rise"
          style={{
            left: `${b.x}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
