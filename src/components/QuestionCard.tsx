import React, { useEffect, useState } from 'react';
import { Question } from '../types';
import { shuffleArray } from '../data/questions';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSelectAnswer: (selectedAnswer: string) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSelectAnswer,
  disabled = false,
}) => {
  // Shuffled options for this attempt
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Whenever the question changes (or on retry), shuffle the options
  useEffect(() => {
    setShuffledOptions(shuffleArray(question.options));
  }, [question.id, question.options]);

  // Keyboard shortcut listener (1-4 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const key = e.key;
      const index = parseInt(key, 10) - 1;
      if (index >= 0 && index < shuffledOptions.length) {
        onSelectAnswer(shuffledOptions[index]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shuffledOptions, disabled, onSelectAnswer]);

  return (
    <div className="relative z-10 mx-auto w-full max-w-2xl px-4 py-6 animate-fade-in">
      {/* Category & Numeral header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 border border-er-goldDim/40 bg-er-surface/60 px-3 py-1 text-xs font-serif tracking-souls text-er-gold">
          <span className="h-1.5 w-1.5 rotate-45 bg-er-gold" />
          <span>{question.universe}</span>
        </div>
        <div className="font-serif text-xs text-er-ash tracking-souls-wide uppercase">
          Trial {question.numeral} of VII
        </div>
      </div>

      {/* Main Question Ornament Box */}
      <div className="er-border-ornament p-6 sm:p-8 mb-6 text-left">
        {/* Cold Marika line */}
        <p className="mb-4 text-xs sm:text-sm font-serif italic text-er-goldDim">
          "{question.marikaPrologue}"
        </p>

        {/* Prompt */}
        <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold leading-snug text-er-parchment tracking-wide">
          {question.prompt}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3" role="radiogroup" aria-label="Trial choices">
        {shuffledOptions.map((option, idx) => {
          const keyLabel = ['1', '2', '3', '4'][idx] || String(idx + 1);

          return (
            <button
              key={`${question.id}-${option}`}
              disabled={disabled}
              onClick={() => onSelectAnswer(option)}
              className="er-option-card w-full group flex items-center justify-between text-left transition-all"
            >
              <div className="flex items-center gap-3.5 pr-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-er-border text-[11px] font-mono font-bold text-er-goldDim group-hover:border-er-gold group-hover:text-er-gold transition-colors">
                  {keyLabel}
                </span>
                <span className="font-serif text-sm sm:text-base text-er-bone group-hover:text-white transition-colors">
                  {option}
                </span>
              </div>

              <div className="h-2 w-2 rotate-45 border border-transparent group-hover:border-er-gold group-hover:bg-er-gold/40 transition-all shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Keyboard hint for desktop */}
      <div className="mt-6 flex items-center justify-between text-[11px] text-er-ash/70 font-mono">
        <span className="hidden sm:inline">Press keys [1-4] or tap to select</span>
        <span>Question {questionNumber} / {totalQuestions}</span>
      </div>
    </div>
  );
};
