import { useState, useEffect, useCallback, useRef } from 'react';
import { QUESTIONS } from './data/questions';
import { getRandomFeedback } from './data/insults';
import { sound } from './lib/sound';
import { TrialState } from './types';
import { HudHeader } from './components/HudHeader';
import { SplashScreen } from './components/SplashScreen';
import { QuestionCard } from './components/QuestionCard';
import { DeathScreen } from './components/DeathScreen';
import { EndingScreen } from './components/EndingScreen';
import { GraceParticles } from './components/GraceParticles';

const STORAGE_KEY = 'nima_birthday_trial_state_v1';

export function App() {
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  // Initialize state from localStorage if available
  const [state, setState] = useState<TrialState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          hasStarted: Boolean(parsed.hasStarted),
          currentIndex: typeof parsed.currentIndex === 'number' ? parsed.currentIndex : 0,
          deaths: typeof parsed.deaths === 'number' ? parsed.deaths : 0,
          isDead: false,
          isFinished: Boolean(parsed.isFinished),
          currentFeedback: null,
          soundEnabled: true,
        };
      }
    } catch {
      // Ignore parse error
    }
    return {
      hasStarted: false,
      currentIndex: 0,
      deaths: 0,
      isDead: false,
      isFinished: false,
      currentFeedback: null,
      soundEnabled: true,
    };
  });

  // Sound starts muted by default so it shows OFF until the user or "Touch Grace" starts it
  const [soundMuted, setSoundMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem('er_sound_muted');
    return saved === null ? true : saved === 'true';
  });

  // Persist critical progress to localStorage whenever it changes
  useEffect(() => {
    try {
      const dataToSave = {
        hasStarted: state.hasStarted,
        currentIndex: state.currentIndex,
        deaths: state.deaths,
        isFinished: state.isFinished,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // Storage quota or privacy mode error
    }
  }, [state.hasStarted, state.currentIndex, state.deaths, state.isFinished]);

  const handleToggleSound = () => {
    const audio = bgmRef.current;
    if (!audio) return;

    if (soundMuted || audio.paused) {
      // Turn ON
      audio.volume = 0.75;
      audio.play().then(() => {
        setSoundMuted(false);
        localStorage.setItem('er_sound_muted', 'false');
      }).catch((err) => {
        console.warn('Audio play error:', err);
      });
    } else {
      // Turn OFF
      audio.pause();
      setSoundMuted(true);
      localStorage.setItem('er_sound_muted', 'true');
    }
  };

  const handleStartTrial = () => {
    sound.playSelectSound(soundMuted);
    setState((prev) => ({ ...prev, hasStarted: true }));

    // Automatically start background music on "Touch Grace"
    const audio = bgmRef.current;
    if (audio) {
      audio.volume = 0.75;
      audio.play().then(() => {
        setSoundMuted(false);
        localStorage.setItem('er_sound_muted', 'false');
      }).catch(() => {});
    }
  };

  const handleSelectAnswer = useCallback((chosenAnswer: string) => {
    const currentQ = QUESTIONS[state.currentIndex];
    if (!currentQ) return;

    if (chosenAnswer === currentQ.correctAnswer) {
      // Correct! Play grace chime and advance
      sound.playGraceSound(soundMuted);

      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= QUESTIONS.length) {
        // Finished all 7 questions! Switch to Elden Ring ending theme
        const audio = bgmRef.current;
        if (audio) {
          audio.src = './audio/elden_ring_theme.mp3';
          audio.volume = 0.8;
          if (!soundMuted) {
            audio.play().catch(() => {});
          }
        }
        setState((prev) => ({
          ...prev,
          isFinished: true,
          isDead: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          currentIndex: nextIndex,
          isDead: false,
        }));
      }
    } else {
      // Wrong answer! Duck background music while death toll plays
      const audio = bgmRef.current;
      if (audio && !audio.paused) {
        audio.volume = 0.08;
        setTimeout(() => {
          if (audio && !audio.paused) {
            audio.volume = 0.75;
          }
        }, 3500);
      }

      sound.playDeathToll(soundMuted);
      const feedback = getRandomFeedback(currentQ.universe);

      setState((prev) => ({
        ...prev,
        deaths: prev.deaths + 1,
        isDead: true,
        currentFeedback: feedback,
      }));
    }
  }, [state.currentIndex, soundMuted]);

  const handleRetrySameQuestion = useCallback(() => {
    sound.playSelectSound(soundMuted);
    setState((prev) => ({
      ...prev,
      isDead: false,
      currentFeedback: null,
    }));
  }, [soundMuted]);

  const handleResetTrial = () => {
    const audio = bgmRef.current;
    if (audio) {
      audio.src = './audio/elden_ring_ambient.mp3';
      if (!soundMuted) {
        audio.play().catch(() => {});
      }
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setState({
      hasStarted: false,
      currentIndex: 0,
      deaths: 0,
      isDead: false,
      isFinished: false,
      currentFeedback: null,
      soundEnabled: true,
    });
  };

  const currentQuestion = QUESTIONS[state.currentIndex] || QUESTIONS[0];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-er-bg text-er-parchment">
      {/* Real HTML5 DOM Audio Element */}
      <audio
        ref={bgmRef}
        id="elden-ring-soundtrack"
        src="./audio/elden_ring_ambient.mp3"
        loop
        preload="auto"
      />

      {/* Background ambient embers */}
      <GraceParticles />

      {/* Persistent souls HUD statusline */}
      <HudHeader
        currentIndex={state.currentIndex}
        totalQuestions={QUESTIONS.length}
        deaths={state.deaths}
        hasStarted={state.hasStarted}
        isFinished={state.isFinished}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        onResetTrial={handleResetTrial}
      />

      {/* Main Interactive Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {state.isFinished ? (
          <EndingScreen deaths={state.deaths} onResetTrial={handleResetTrial} />
        ) : !state.hasStarted ? (
          <SplashScreen
            onBegin={handleStartTrial}
            savedProgressIndex={state.currentIndex}
          />
        ) : (
          <QuestionCard
            question={currentQuestion}
            questionNumber={state.currentIndex + 1}
            totalQuestions={QUESTIONS.length}
            onSelectAnswer={handleSelectAnswer}
            disabled={state.isDead}
          />
        )}
      </main>

      {/* Full-screen YOU DIED Death Overlay */}
      {state.isDead && state.currentFeedback && (
        <DeathScreen
          feedback={state.currentFeedback}
          deathCount={state.deaths}
          onRetry={handleRetrySameQuestion}
        />
      )}

      {/* Subtle Bottom Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] font-mono text-er-ash/50">
        <span>The Lands Between &bull; Queen Marika’s Anniversary Dispensation</span>
      </footer>
    </div>
  );
}

export default App;
