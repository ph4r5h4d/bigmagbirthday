import React, { useState } from 'react';
import { Mail, Copy, Check, Crown, RotateCcw } from 'lucide-react';

interface EndingScreenProps {
  deaths: number;
  onResetTrial: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({ deaths, onResetTrial }) => {
  const [copied, setCopied] = useState(false);

  const recipientEmail = 'farshad@nematdoust.com';
  const emailSubject = 'Elden Lord';
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(recipientEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  // One sentence cold roast on death count
  const getDeathRoast = () => {
    if (deaths === 0) {
      return 'Zero deaths recorded. A suspicious lack of failure; Marika suspects an unchecked walkthrough was consulted.';
    }
    if (deaths === 1) {
      return 'A single death stains your ascent. An imperceptible blemish on an otherwise acceptable trial.';
    }
    if (deaths <= 5) {
      return `Thou hast seized the throne after ${deaths} deaths. Marika expected less hesitation from an architect, yet grace endured.`;
    }
    return `Thou hast crawled to the throne through ${deaths} ignominious deaths. Even the wandering dogs of Caelid showed greater poise.`;
  };

  return (
    <div className="relative z-10 mx-auto w-full max-w-2xl px-4 py-8 sm:py-12 text-center animate-fade-in">
      {/* Crown / Elden Lord Emblem */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full bg-er-gold/15 blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-er-gold/50 bg-er-surface shadow-gold-glow">
          <Crown className="h-10 w-10 text-er-goldBright animate-shimmer" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2 mb-8">
        <p className="text-xs uppercase tracking-souls-wide text-er-goldDim">
          The Thorns Recede
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-souls text-transparent bg-clip-text bg-gradient-to-b from-[#fff] via-er-gold to-er-goldDim">
          Elden Lord
        </h1>
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-er-gold" />
          <div className="h-2 w-2 rotate-45 border border-er-gold bg-er-gold/50" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-er-gold" />
        </div>
      </div>

      {/* Cold Death Roast */}
      <div className="mb-8 rounded-none border border-er-border bg-er-surface/50 p-4 text-xs sm:text-sm font-serif italic text-er-parchment/80">
        "{getDeathRoast()}"
      </div>

      {/* Main Directive Box */}
      <div className="er-border-ornament p-6 sm:p-8 mb-8 text-left space-y-6 shadow-gold-glow">
        <div className="space-y-2">
          <p className="text-xs uppercase font-mono tracking-widest text-er-goldDim">
            The Queen’s Final Decree
          </p>
          <p className="font-serif text-base sm:text-lg text-er-parchment leading-relaxed">
            All seven queries have been answered. The trial in these Lands Between is concluded.
          </p>
          <p className="font-serif text-sm sm:text-base text-er-bone leading-relaxed">
            The sovereign tribute is not held within this realm, nor upon any stone of this soil. To claim what is owed, the guidance of Grace points directly to a single inbox.
          </p>
        </div>

        {/* Email instruction block */}
        <div className="rounded-none border border-er-goldDim/40 bg-er-void/90 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-er-border pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-er-ash block">
                Destination Address
              </span>
              {/* Selectable text for fallback */}
              <span className="font-mono text-sm sm:text-base text-er-gold font-semibold select-all break-all">
                {recipientEmail}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 self-start sm:self-auto rounded border border-er-border hover:border-er-gold px-3 py-1.5 text-xs text-er-bone hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-er-ash" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs font-mono">
            <span className="text-er-ash">Subject Line:</span>
            <span className="text-er-parchment font-semibold select-all bg-er-surface px-2 py-0.5 border border-er-border">
              {emailSubject}
            </span>
          </div>

          <p className="text-[11px] font-mono text-er-ash leading-relaxed">
            * Send one email to the address above. The body may be left empty; the sovereign subject line is all that is required.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a
            href={mailtoLink}
            className="er-button-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <Mail className="h-4 w-4 text-er-gold" />
            <span className="font-bold">Send Missive to Farshad</span>
          </a>
        </div>
      </div>

      {/* Footer / Reset Trial */}
      <div className="pt-4">
        <button
          onClick={() => {
            if (window.confirm('Wipe your Elden Lord standing and experience the trial anew?')) {
              onResetTrial();
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-er-ash/50 hover:text-er-ash transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Relinquish the Throne (Reset Trial)</span>
        </button>
      </div>
    </div>
  );
};
