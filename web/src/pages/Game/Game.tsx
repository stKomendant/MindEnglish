import { useEffect, useMemo } from "react";
import { useWordStore } from "../../store/wordStore";
import { useAuthStore } from "../../store/authStore";
import { useWordGame } from "../../hooks/useWordGame";
import { GameSelectScreen } from "../../components/Game/GameSelectScreen";
import { GameQuestionScreen } from "../../components/Game/GameQuestionScreen";
import { GameResultScreen } from "../../components/Game/GameResultScreen";

export const Game = () => {
  const { isAuthenticated } = useAuthStore();
  const { words, fetchWords } = useWordStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWords();
    }
  }, [isAuthenticated]);

  const playableWords = useMemo(
    () => words.filter((w) => w.definition && w.definition.trim() !== ""),
    [words]
  );

  const {
    questions,
    currentIndex,
    score,
    selectedAnswer,
    isFinished,
    startGame,
    exitGame,
    handleAnswer,
  } = useWordGame(playableWords);

  if (!isAuthenticated) {
    return (
      <div className="text-[#CFC5E9]">
        <h1 className="text-2xl font-bold mb-2">Гра</h1>
        <p>Увійдіть в акаунт, щоб грати.</p>
      </div>
    );
  }

  if (playableWords.length < 4) {
    return (
      <div className="text-[#CFC5E9]">
        <h1 className="text-2xl font-bold mb-2">Гра</h1>
        <p>
          Потрібно щонайменше 4 слова з перекладом у словнику, щоб почати
          гру. Зараз доступно: {playableWords.length}.
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <GameSelectScreen onPlayWordGame={startGame} />;
  }

  if (isFinished) {
    return (
      <GameResultScreen
        score={score}
        totalQuestions={questions.length}
        onReplay={startGame}
        onExit={exitGame}
      />
    );
  }

  return (
    <GameQuestionScreen
      question={questions[currentIndex]}
      currentIndex={currentIndex}
      totalQuestions={questions.length}
      score={score}
      selectedAnswer={selectedAnswer}
      onAnswer={handleAnswer}
      onExit={exitGame}
    />
  );
};