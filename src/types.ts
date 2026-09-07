export type Universe = 'Dark Souls III' | 'Elden Ring' | 'The Witcher 3' | 'Formula 1';

export interface Question {
  id: number;
  universe: Universe;
  numeral: string;
  marikaPrologue: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  loreNote?: string;
}

export interface DeathFeedback {
  insult: string;
  pardon: string;
}

export interface TrialState {
  hasStarted: boolean;
  currentIndex: number;
  deaths: number;
  isDead: boolean;
  isFinished: boolean;
  currentFeedback: DeathFeedback | null;
  soundEnabled: boolean;
}
