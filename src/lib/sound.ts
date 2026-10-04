// Web Audio API sound generation — no external files needed

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/**
 * Plays a soft bubble "bloop" chime using the Web Audio API.
 * Three staggered tones create a pleasant water-chime effect.
 */
export function playBubbleChime(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Three ascending tones for a pleasant chime
  const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
  const delays = [0, 0.12, 0.24];

  frequencies.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, now + delays[i]);

    // Soft attack, gentle decay
    gainNode.gain.setValueAtTime(0, now + delays[i]);
    gainNode.gain.linearRampToValueAtTime(0.15, now + delays[i] + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + delays[i] + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now + delays[i]);
    oscillator.stop(now + delays[i] + 0.85);
  });

  // Add a subtle bubble "bloop" (low frequency pop)
  const bloop = ctx.createOscillator();
  const bloopGain = ctx.createGain();

  bloop.type = 'sine';
  bloop.frequency.setValueAtTime(180, now);
  bloop.frequency.exponentialRampToValueAtTime(400, now + 0.08);

  bloopGain.gain.setValueAtTime(0.2, now);
  bloopGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  bloop.connect(bloopGain);
  bloopGain.connect(ctx.destination);

  bloop.start(now);
  bloop.stop(now + 0.2);
}

/**
 * Play a small tick/bubble sound for button feedback.
 */
export function playTick(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.05);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);
}
