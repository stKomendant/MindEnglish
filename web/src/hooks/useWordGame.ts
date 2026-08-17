import { useState } from "react";
import { generateQuestions, type Question } from "../utils/gameUtils";
import type { Word } from "../store/wordStore";
import { useGameResultStore } from "../store/gameResultStore";

export const useWordGame = (playableWords: Word[]) => {
  const { submitResult } = useGameResultStore();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const startGame = () => {
    setQuestions(generateQuestions(playableWords));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  const exitGame = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    const isCorrect = option === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        submitResult(finalScore, questions.length);
        setIsFinished(true);
      }
    }, 900);
  };

  return {
    questions,
    currentIndex,
    score,
    selectedAnswer,
    isFinished,
    startGame,
    exitGame,
    handleAnswer,
  };
};