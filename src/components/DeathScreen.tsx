import React, { useEffect, useState } from 'react';
import { DeathFeedback } from '../types';

interface DeathScreenProps {
  feedback: DeathFeedback;
  deathCount: number;
  onRetry: () => void;
}

export const DeathScreen: React.FC<DeathScreenProps> = ({
  feedback,
  deathCount,
  onRetry,
}) => {
  // Rage-click lock: 1.2 seconds before the button activates
  const [canRetry, setCanRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanRetry(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut listener: Space or Enter once unlocked
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canRetry) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onRetry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canRetry, onRetry]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 px-4 text-center select-none overflow-y-auto animate-death-slam"
    >
      {/* Background blood mist aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,22,22,0.22)_0%,transparent_75%)] pointer-events-none" />

      {/* Decorative top border */}
      <div className="relative mb-6 sm:mb-8 flex items-center justify-center gap-3">
        <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-er-crimsonBright to-transparent" />
        <div className="h-1.5 w-1.5 rotate-45 border border-er-crimsonBright bg-er-crimson" />
        <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-er-crimsonBright to-transparent" />
      </div>

      {/* The Iconic YOU DIED Banner */}
      <div className="relative mb-8 sm:mb-12">
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-souls-wide text-transparent bg-clip-text bg-gradient-to-b from-[#e53e3e] via-[#991b1b] to-[#450a0a] drop-shadow-[0_0_35px_rgba(185,28,28,0.7)]">
          YOU DIED
        </h1>
        <p className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-souls text-er-ash/80">
          Death Record: {deathCount} {deathCount === 1 ? 'Demise' : 'Demises'}
        </p>
      </div>

      {/* Condescending Insult & Birthday Pardon Container */}
      <div className="relative z-10 w-full max-w-xl border border-er-crimson/40 bg-er-surface/90 backdrop-blur-md p-6 sm:p-8 space-y-4 mb-8 text-left shadow-death-glow">
        {/* Insult */}
        <div className="border-l-2 border-er-crimson pl-4">
          <p className="text-xs uppercase font-mono tracking-wider text-er-crimsonBright mb-1">
            Judgment of Queen Marika:
          </p>
          <p className="font-serif text-base sm:text-lg text-er-parchment leading-relaxed">
            "{feedback.insult}"
          </p>
        </div>

        {/* Birthday Pardon (Mercy line) */}
        <div className="border-t border-er-border/60 pt-4">
          <p className="text-xs uppercase font-mono tracking-wider text-er-goldDim mb-1">
            Sovereign Birthday Dispensation:
          </p>
          <p className="font-serif text-sm sm:text-base text-er-goldBright/90 italic leading-relaxed">
            {feedback.pardon}
          </p>
        </div>
      </div>

      {/* Action Button (with 1.2s lock to enforce contemplation) */}
      <div className="relative z-10">
        <button
          onClick={onRetry}
          disabled={!canRetry}
          className="er-button-primary min-w-[260px] border-er-gold/50 text-er-parchment hover:border-er-gold hover:text-white"
        >
          {canRetry ? (
            <span className="font-bold flex items-center justify-center gap-2">
              <span>Rise Again</span>
              <span className="text-xs text-er-goldDim font-normal">(Birthday Mercy)</span>
            </span>
          ) : (
            <span className="text-er-ash flex items-center justify-center gap-2 font-mono text-xs tracking-normal">
              Contemplating failure...
            </span>
          )}
        </button>

        {canRetry && (
          <p className="mt-3 text-[11px] font-mono text-er-ash/60">
            Press [Space] or [Enter] to resume trial
          </p>
        )}
      </div>

      {/* Decorative bottom border */}
      <div className="relative mt-8 sm:mt-12 flex items-center justify-center gap-3">
        <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-er-crimson to-transparent" />
        <div className="h-1.5 w-1.5 rotate-45 border border-er-crimson bg-er-blood" />
        <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-er-crimson to-transparent" />
      </div>
    </div>
  );
};
