import { useEffect, useMemo, useState } from "react";
import { useWordStore } from "../../store/wordStore";
import { useAuthStore } from "../../store/authStore";
import { useWordGame } from "../../hooks/useWordGame";
import { useSpellingGame } from "../../hooks/useSpellingGame";
import { GameCard } from "../../components/Game/GameCard";
import { GameQuestionScreen } from "../../components/Game/GameQuestionScreen";
import { SpellingQuestionScreen } from "../../components/Game/SpellingQuestionScreen";
import { GameResultScreen } from "../../components/Game/GameResultScreen";

type ActiveGame = "word-repeat" | "spelling" | null;

export const Game = () => {
  const { isAuthenticated } = useAuthStore();
  const { words, fetchWords } = useWordStore();
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWords();
    }
  }, [isAuthenticated]);

  const playableWords = useMemo(
    () => words.filter((w) => w.definition && w.definition.trim() !== ""),
    [words]
  );

  const wordGame = useWordGame(playableWords);
  const spellingGame = useSpellingGame(playableWords);

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

  if (activeGame === "word-repeat") {
    if (wordGame.isFinished) {
      return (
        <GameResultScreen
          score={wordGame.score}
          totalQuestions={wordGame.questions.length}
          onReplay={wordGame.startGame}
          onExit={() => {
            wordGame.exitGame();
            setActiveGame(null);
          }}
        />
      );
    }
    return (
      <GameQuestionScreen
        question={wordGame.questions[wordGame.currentIndex]}
        currentIndex={wordGame.currentIndex}
        totalQuestions={wordGame.questions.length}
        score={wordGame.score}
        selectedAnswer={wordGame.selectedAnswer}
        onAnswer={wordGame.handleAnswer}
        onExit={() => {
          wordGame.exitGame();
          setActiveGame(null);
        }}
      />
    );
  }

  if (activeGame === "spelling") {
    if (spellingGame.isFinished) {
      return (
        <GameResultScreen
          score={spellingGame.score}
          totalQuestions={spellingGame.questions.length}
          onReplay={spellingGame.startGame}
          onExit={() => {
            spellingGame.exitGame();
            setActiveGame(null);
          }}
        />
      );
    }
    return (
      <SpellingQuestionScreen
        question={spellingGame.questions[spellingGame.currentIndex]}
        currentIndex={spellingGame.currentIndex}
        totalQuestions={spellingGame.questions.length}
        score={spellingGame.score}
        userInput={spellingGame.userInput}
        onInputChange={spellingGame.setUserInput}
        feedback={spellingGame.feedback}
        onSubmit={spellingGame.submitAnswer}
        onExit={() => {
          spellingGame.exitGame();
          setActiveGame(null);
        }}
      />
    );
  }

  return (
    <div className="text-[#CFC5E9]">
      <h1 className="text-2xl font-bold mb-5">Обери гру</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <GameCard
          title="Повторення слів"
          description="Перевір, наскільки добре ти запам'ятав свої слова. 10 випадкових питань, вибір із 4 варіантів."
          img="./images/icon/words/game.png"
          onPlay={() => {
            setActiveGame("word-repeat");
            wordGame.startGame();
          }}
        />
        <GameCard
          title="Напиши слово"
          description="Побач переклад і напиши слово англійською самостійно, без варіантів."
          img="./images/icon/words/game.png"
          onPlay={() => {
            setActiveGame("spelling");
            spellingGame.startGame();
          }}
        />
      </div>
    </div>
  );
};