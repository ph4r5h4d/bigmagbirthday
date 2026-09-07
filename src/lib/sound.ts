type SoundStateListener = (isPlaying: boolean, isMuted: boolean) => void;

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private currentTrack: 'ambient' | 'theme' = 'ambient';
  private targetVolume: number = 0.35;
  private listeners: Set<SoundStateListener> = new Set();

  constructor() {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('er_sound_muted') : null;
    this.isMuted = saved === 'true';
    if (typeof window !== 'undefined') {
      this.initBgm();
    }
  }

  public subscribe(listener: SoundStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.isMuted);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying, this.isMuted));
  }

  private getAudioUrl(filename: string): string {
    if (typeof window === 'undefined') return `./audio/${filename}`;
    const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
    return `${window.location.origin}${basePath}audio/${filename}`;
  }

  private initBgm() {
    if (this.bgmAudio) return;
    try {
      this.bgmAudio = new Audio(this.getAudioUrl('elden_ring_ambient.mp3'));
      this.bgmAudio.loop = true;
      this.bgmAudio.preload = 'auto';
      this.bgmAudio.volume = this.isMuted ? 0 : this.targetVolume;

      this.bgmAudio.addEventListener('playing', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.bgmAudio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.bgmAudio.addEventListener('error', () => {
        // Fallback to streaming mirror if local file fails
        if (this.bgmAudio && !this.bgmAudio.src.includes('archive.org')) {
          this.bgmAudio.src = 'https://archive.org/download/shoi-miyazawa-yuka-kitamura-yoshimi-kudo-tai-tomisawa-elden-ring-original-game-soundtrack/1-08%20Roundtable%20Hold.mp3';
          if (!this.isMuted) {
            this.bgmAudio.play().catch(() => {});
          }
        }
      });
    } catch {
      // Audio not supported
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Starts background music if not muted
   */
  public startBgm() {
    this.initBgm();
    this.initContext();

    if (this.isMuted) return;

    if (this.bgmAudio) {
      this.bgmAudio.volume = this.targetVolume;
      this.bgmAudio.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {
        // Autoplay policy prevented immediate playback
      });
    }
  }

  public pauseBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  /**
   * Single definitive toggle method for the UI button
   */
  public toggleMute(): boolean {
    this.initBgm();
    this.initContext();

    if (this.isMuted || !this.isPlaying) {
      // Turn ON: unmute and play
      this.isMuted = false;
      localStorage.setItem('er_sound_muted', 'false');

      if (this.bgmAudio) {
        this.bgmAudio.volume = this.targetVolume;
        this.bgmAudio.play().then(() => {
          this.isPlaying = true;
          this.notify();
        }).catch(() => {
          this.isPlaying = false;
          this.notify();
        });
      }
    } else {
      // Turn OFF: mute and pause
      this.isMuted = true;
      localStorage.setItem('er_sound_muted', 'true');

      if (this.bgmAudio) {
        this.bgmAudio.pause();
        this.isPlaying = false;
      }
    }

    this.notify();
    return this.isMuted;
  }

  public playEndingTheme() {
    this.initBgm();
    if (!this.bgmAudio) return;
    this.currentTrack = 'theme';

    const fadeOut = setInterval(() => {
      if (!this.bgmAudio) {
        clearInterval(fadeOut);
        return;
      }
      if (this.bgmAudio.volume > 0.05) {
        this.bgmAudio.volume = Math.max(0, this.bgmAudio.volume - 0.05);
      } else {
        clearInterval(fadeOut);
        this.bgmAudio.src = this.getAudioUrl('elden_ring_theme.mp3');
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = this.isMuted ? 0 : this.targetVolume;
        if (!this.isMuted) {
          this.bgmAudio.play().then(() => {
            this.isPlaying = true;
            this.notify();
          }).catch(() => {});
        }
      }
    }, 50);
  }

  public resetToAmbient() {
    this.initBgm();
    if (!this.bgmAudio) return;
    if (this.currentTrack === 'ambient') return;
    this.currentTrack = 'ambient';
    this.bgmAudio.src = this.getAudioUrl('elden_ring_ambient.mp3');
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = this.isMuted ? 0 : this.targetVolume;
    if (!this.isMuted) {
      this.bgmAudio.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {});
    }
  }

  public duckBgm(durationMs = 3500) {
    if (!this.bgmAudio || this.isMuted || !this.isPlaying) return;

    const originalVol = this.targetVolume;
    this.bgmAudio.volume = 0.04;

    setTimeout(() => {
      if (this.bgmAudio && !this.isMuted && this.isPlaying) {
        this.bgmAudio.volume = originalVol;
      }
    }, durationMs);
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public playDeathToll() {
    if (this.isMuted) return;
    this.duckBgm(3500);
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now);
      osc1.frequency.exponentialRampToValueAtTime(50, now + 3.0);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, now);
      osc2.frequency.exponentialRampToValueAtTime(106, now + 2.5);

      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(164.8, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.45, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

      osc1.connect(gain);
      osc2.connect(gain);
      osc3.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + 3.6);
      osc2.stop(now + 3.6);
      osc3.stop(now + 3.6);
    } catch {
      // Ignore audio failure
    }
  }

  public playGraceSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [329.63, 493.88, 659.25, 987.77];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 2.0);
      });
    } catch {
      // Ignore audio failure
    }
  }

  public playSelectSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore audio failure
    }
  }
}

export const sound = new SoundController();
