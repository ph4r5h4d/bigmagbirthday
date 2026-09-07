import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface HudHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  deaths: number;
  hasStarted: boolean;
  isFinished: boolean;
  soundMuted: boolean;
  soundPlaying: boolean;
  onToggleSound: () => void;
  onResetTrial: () => void;
}

export const HudHeader: React.FC<HudHeaderProps> = ({
  currentIndex,
  totalQuestions,
  deaths,
  hasStarted,
  isFinished,
  soundMuted,
  soundPlaying,
  onToggleSound,
  onResetTrial,
}) => {
  return (
    <header className="relative z-20 w-full border-b border-er-border/40 bg-er-void/80 backdrop-blur-md px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-4xl items-center justify-between text-xs sm:text-sm font-serif tracking-souls">
        {/* Left: Lore Status or Title */}
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rotate-45 border border-er-gold bg-er-gold/30" />
          <span className="text-er-parchment/90 font-semibold uppercase hidden xs:inline">
            The Queen’s Trial
          </span>
          <span className="text-er-ash text-[10px] sm:text-xs">
            {isFinished ? 'ELDEN LORD' : hasStarted ? 'TARNISHED' : 'PREPARATION'}
          </span>
        </div>

        {/* Center: In-trial Counter (Only if in quiz) */}
        {hasStarted && !isFinished && (
          <div className="flex items-center gap-4 text-er-goldDim">
            <div className="flex items-center gap-1.5">
              <span className="text-er-ash">TRIAL:</span>
              <span className="text-er-gold font-mono font-bold tracking-normal">
                {currentIndex + 1} / {totalQuestions}
              </span>
            </div>
            <span className="text-er-ash/40">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-er-ash">DEATHS:</span>
              <span className="text-er-crimsonBright font-mono font-bold tracking-normal">
                {deaths}
              </span>
            </div>
          </div>
        )}

        {/* Right: Controls (OST / Audio & discreet Reset) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onToggleSound}
            aria-label={
              soundMuted
                ? 'Unmute soundtrack'
                : soundPlaying
                ? 'Mute soundtrack'
                : 'Play soundtrack'
            }
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all ${
              soundMuted
                ? 'border border-er-border/60 text-er-ash hover:border-er-gold hover:text-er-gold'
                : soundPlaying
                ? 'border border-er-gold/70 text-er-gold bg-er-gold/10'
                : 'border border-er-goldBright text-er-goldBright bg-er-gold/20 shadow-gold-glow animate-pulse'
            }`}
            title={
              soundMuted
                ? 'Soundtrack Muted (Click to Unmute)'
                : soundPlaying
                ? 'Soundtrack Playing (Click to Mute)'
                : 'Soundtrack Paused (Click to Play)'
            }
          >
            {soundMuted ? (
              <VolumeX className="h-3.5 w-3.5 text-er-ash" />
            ) : soundPlaying ? (
              <Volume2 className="h-3.5 w-3.5 text-er-gold animate-pulse" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-er-goldBright" />
            )}
            <span className="text-[11px] font-mono tracking-normal">
              {soundMuted
                ? 'OST: OFF'
                : soundPlaying
                ? 'OST: ON'
                : 'OST: TAP TO PLAY'}
            </span>
          </button>

          {hasStarted && (
            <button
              onClick={() => {
                if (window.confirm('Relinquish your current progress and restart the trial from the beginning?')) {
                  onResetTrial();
                }
              }}
              aria-label="Restart trial"
              className="flex items-center gap-1 p-1.5 text-er-ash/60 hover:text-er-crimsonBright transition-colors text-[11px]"
              title="Reset Trial"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden md:inline">RESTART</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
