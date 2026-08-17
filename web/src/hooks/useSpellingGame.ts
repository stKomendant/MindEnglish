import { useState } from "react";
import { generateSpellingQuestions, type SpellingQuestion } from "../utils/gameUtils";
import type { Word } from "../store/wordStore";
import { useGameResultStore } from "../store/gameResultStore";

export const useSpellingGame = (playableWords: Word[]) => {
  const { submitResult } = useGameResultStore();

  const [questions, setQuestions] = useState<SpellingQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const startGame = () => {
    setQuestions(generateSpellingQuestions(playableWords));
    setCurrentIndex(0);
    setScore(0);
    setUserInput("");
    setFeedback(null);
    setIsFinished(false);
  };

  const exitGame = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setUserInput("");
    setFeedback(null);
    setIsFinished(false);
  };

  const submitAnswer = () => {
    if (feedback) return;

    const isCorrect =
      userInput.trim().toLowerCase() ===
      questions[currentIndex].correctAnswer.toLowerCase();

    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setUserInput("");
        setFeedback(null);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        submitResult(finalScore, questions.length);
        setIsFinished(true);
      }
    }, isCorrect ? 900 : 1800);
  };

  return {
    questions,
    currentIndex,
    score,
    userInput,
    setUserInput,
    feedback,
    isFinished,
    startGame,
    exitGame,
    submitAnswer,
  };
};