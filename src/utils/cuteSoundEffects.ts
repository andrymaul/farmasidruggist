// Web Audio API Synthesizer for pleasant, gentle pharmacy sound effects
// 100% offline, zero external MP3 dependencies, zero latency

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const isSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('farmasidruggist_sfx_enabled');
  return saved === null ? true : saved === 'true';
};

export const setSoundEnabled = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('farmasidruggist_sfx_enabled', String(enabled));
};

/**
 * Play a cute gentle 'pop' sound (when adding drug or clicking pill buttons)
 */
export const playCutePop = (): void => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    
    // Quick pitch drop creates sweet bubble pop
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // AudioContext blocked by browser policy until interaction
  }
};

/**
 * Play a gentle crystal chime (when safe result is achieved or task completed)
 */
export const playCuteChime = (): void => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major arpeggio)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.36);
    });
  } catch {
    // Silent fallback
  }
};

/**
 * Play a celebratory fanfare (used with confetti when 0 interactions)
 */
export const playCuteFanfare = (): void => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // C5, E5, G5, B5, C6 triumphant chord
    const sequence = [
      { freq: 523.25, delay: 0.0, dur: 0.15 },
      { freq: 659.25, delay: 0.1, dur: 0.15 },
      { freq: 783.99, delay: 0.2, dur: 0.2 },
      { freq: 1046.50, delay: 0.32, dur: 0.45 }
    ];

    sequence.forEach(({ freq, delay, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.01, now + delay);
      gain.gain.linearRampToValueAtTime(0.1, now + delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.02);
    });
  } catch {
    // Silent fallback
  }
};

/**
 * Play gentle alert chime for warning/major interactions
 */
export const playCuteAlert = (): void => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [698.46, 554.37]; // F5 down to C#5

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.08, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.22);
    });
  } catch {
    // Silent fallback
  }
};
