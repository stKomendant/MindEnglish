import { ArrowLeft, Check, X } from "lucide-react";
import type { SpellingQuestion } from "../../utils/gameUtils";

interface SpellingQuestionScreenProps {
  question: SpellingQuestion;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  userInput: string;
  onInputChange: (value: string) => void;
  feedback: "correct" | "incorrect" | null;
  onSubmit: () => void;
  onExit: () => void;
}

export const SpellingQuestionScreen = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  userInput,
  onInputChange,
  feedback,
  onSubmit,
  onExit,
}: SpellingQuestionScreenProps) => {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center pt-4 sm:pt-6 px-4">
      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1 text-sm text-[#8577a8] hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
            Вийти
          </button>
          <span className="text-sm text-[#8577a8] text-right">
            {currentIndex + 1} / {totalQuestions} · Рахунок: {score}
          </span>
        </div>
        <div className="w-full h-2 bg-[#1d0a44] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#6d28d9] to-[#bf33ff] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="bg-[#1d0a44] border border-[#3a2166] rounded-2xl p-6 sm:p-10 w-full max-w-lg text-center">
        <p className="text-sm text-[#8577a8] mb-3">
          Напиши слово англійською
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          {question.translation}
        </h2>

        <input
          type="text"
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!!feedback}
          autoFocus
          placeholder="Введи слово..."
          className={`w-full text-center text-lg px-4 py-3 rounded-xl border transition-colors mb-4
            bg-[#150733] placeholder:text-[#8577a8] focus:outline-none
            ${
              feedback === "correct"
                ? "border-green-500 bg-green-600/20"
                : feedback === "incorrect"
                ? "border-red-500 bg-red-600/20"
                : "border-[#3a2166] focus:border-[#6d28d9]"
            }`}
        />

        {feedback === "incorrect" && (
          <div className="flex items-center justify-center gap-2 text-red-400 text-sm mb-4">
            <X size={16} />
            Правильна відповідь: {question.correctAnswer}
          </div>
        )}
        {feedback === "correct" && (
          <div className="flex items-center justify-center gap-2 text-green-400 text-sm mb-4">
            <Check size={16} />
            Правильно!
          </div>
        )}

        <button
          onClick={onSubmit}
          disabled={!userInput.trim() || !!feedback}
          className="w-full bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] hover:from-[#7c3aed]
          hover:to-[#5b21b6] disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-300 rounded-lg py-3 font-semibold"
        >
          Перевірити
        </button>
      </div>
    </div>
  );
};