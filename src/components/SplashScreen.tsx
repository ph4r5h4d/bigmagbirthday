import React from 'react';

interface SplashScreenProps {
  onBegin: () => void;
  savedProgressIndex?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onBegin, savedProgressIndex = 0 }) => {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
      {/* Elden Ring / Golden Order Sigil */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full bg-er-gold/5 blur-2xl pointer-events-none animate-pulse-slow" />
        <svg
          viewBox="0 0 160 160"
          className="h-28 w-28 text-er-gold/80 transition-all duration-700 hover:text-er-goldBright hover:scale-105"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Outer Ring */}
          <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="80" cy="80" r="58" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          
          {/* Overlapping Great Runes */}
          <circle cx="80" cy="52" r="32" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="80" cy="98" r="36" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
          
          {/* Central Spear / Stem */}
          <line x1="80" y1="12" x2="80" y2="148" stroke="currentColor" strokeWidth="2" />
          <line x1="28" y1="80" x2="132" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          
          {/* Arc of Grace */}
          <path d="M 35 125 Q 80 145 125 125" stroke="currentColor" strokeWidth="2" />
          
          {/* Inner ember */}
          <circle cx="80" cy="80" r="4" fill="currentColor" />
        </svg>
      </div>

      {/* Main Title */}
      <div className="space-y-2 mb-8">
        <p className="text-xs uppercase tracking-souls-wide text-er-goldDim">
          The Lands Between & Beyond
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-souls text-transparent bg-clip-text bg-gradient-to-b from-[#f2e6cf] via-er-gold to-er-goldDim">
          Trial of the Tarnished
        </h1>
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-er-goldDim" />
          <div className="h-1.5 w-1.5 rotate-45 border border-er-gold bg-er-gold/40" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-er-goldDim" />
        </div>
      </div>

      {/* Lore Decree */}
      <div className="er-border-ornament w-full p-6 sm:p-8 text-left space-y-4 mb-10 text-er-parchment/90 font-serif leading-relaxed text-sm sm:text-base">
        <p className="text-er-goldBright italic">
          Thou art Tarnished. Today, by the turning of the stars, thou art also older.
        </p>
        <p>
          Queen Marika hath spoken. No Great Rune shall be bestowed. No maiden awaits thy beck and call.
        </p>
        <p>
          Instead, the Queen demands seven answers, drawn from legends across fractured worlds. She careth not whether they stem from the Kiln, the Rotten Haligtree, the Continent, or the high-speed asphalt of the North Sea.
        </p>
        <p className="text-er-bone text-xs sm:text-sm border-t border-er-border/50 pt-3">
          Answer all seven and claim the mantle of Elden Lord. Stumble, and thou shalt learn whether the Queen hath mercy for a birthday wanderer.
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={onBegin}
        className="er-button-primary w-full sm:w-auto min-w-[240px] group flex items-center justify-center gap-3"
      >
        <span className="relative z-10 font-bold">
          {savedProgressIndex > 0 ? 'Resume the Trial' : 'Touch Grace'}
        </span>
        <span className="text-er-gold transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </button>

      {savedProgressIndex > 0 && (
        <p className="mt-3 text-[11px] font-mono tracking-wider text-er-ash">
          Resuming at Question {savedProgressIndex + 1} of 7
        </p>
      )}
    </div>
  );
};
