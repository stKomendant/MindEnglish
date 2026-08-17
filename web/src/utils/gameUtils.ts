import type { Word } from "../store/wordStore";

export interface Question {
  word: string;
  correctAnswer: string;
  options: string[];
  direction: "en-to-translation" | "translation-to-en";
}

export interface SpellingQuestion {
  translation: string;
  correctAnswer: string;
}

export const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const generateSpellingQuestions = (playableWords: Word[]): SpellingQuestion[] => {
  const shuffledWords = shuffle(playableWords).slice(0, 10);

  return shuffledWords.map((w) => ({
    translation: w.definition!,
    correctAnswer: w.word,
  }));
};

export const generateQuestions = (playableWords: Word[]): Question[] => {
  const shuffledWords = shuffle(playableWords).slice(0, 10);

  return shuffledWords.map((w) => {
    const direction: Question["direction"] =
      Math.random() < 0.5 ? "en-to-translation" : "translation-to-en";

    const correctAnswer =
      direction === "en-to-translation" ? w.definition! : w.word;

    const otherWords = playableWords.filter((other) => other.id !== w.id);
    const wrongOptions = shuffle(otherWords)
      .slice(0, 3)
      .map((other) =>
        direction === "en-to-translation" ? other.definition! : other.word
      );

    const options = shuffle([correctAnswer, ...wrongOptions]);

    return {
      word: direction === "en-to-translation" ? w.word : w.definition!,
      correctAnswer,
      options,
      direction,
    };
  });
};