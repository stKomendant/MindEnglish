import { Check, X, ArrowLeft } from "lucide-react";
import type { Question } from "../../utils/gameUtils";

interface GameQuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  selectedAnswer: string | null;
  onAnswer: (option: string) => void;
  onExit: () => void;
}

export const GameQuestionScreen = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  selectedAnswer,
  onAnswer,
  onExit,
}: GameQuestionScreenProps) => {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

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
          {question.direction === "en-to-translation"
            ? "Як перекладається це слово?"
            : "Як це буде англійською?"}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          {question.word}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correctAnswer;

            let optionClass =
              "bg-[#150733] border border-[#3a2166] hover:border-[#6d28d9]";

            if (selectedAnswer) {
              if (isCorrect) {
                optionClass = "bg-green-600/30 border border-green-500";
              } else if (isSelected) {
                optionClass = "bg-red-600/30 border border-red-500";
              } else {
                optionClass = "bg-[#150733] border border-[#3a2166] opacity-40";
              }
            }

            return (
              <button
                key={option}
                onClick={() => onAnswer(option)}
                disabled={!!selectedAnswer}
                className={`flex items-center justify-between text-left px-4 sm:px-5 py-3 sm:py-4 rounded-xl transition-colors text-base sm:text-lg ${optionClass}`}
              >
                <span>{option}</span>
                {selectedAnswer && isCorrect && (
                  <Check size={20} className="text-green-400 shrink-0" />
                )}
                {selectedAnswer && isSelected && !isCorrect && (
                  <X size={20} className="text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};