interface GameResultScreenProps {
  score: number;
  totalQuestions: number;
  onReplay: () => void;
  onExit: () => void;
}

export const GameResultScreen = ({
  score,
  totalQuestions,
  onReplay,
  onExit,
}: GameResultScreenProps) => {
  const percent = Math.round((score / totalQuestions) * 100);

  return (
    <div className="text-[#CFC5E9] flex flex-col items-center text-center pt-6 sm:pt-10 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Гру завершено!</h1>
      <p className="text-5xl sm:text-6xl font-bold mb-2 bg-gradient-to-br from-[#6d28d9] to-[#bf33ff] bg-clip-text text-transparent">
        {percent}%
      </p>
      <p className="text-base sm:text-lg text-[#8577a8] mb-8">
        Правильних відповідей: {score} з {totalQuestions}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
        <button
          onClick={onReplay}
          className="bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] hover:from-[#7c3aed]
          hover:to-[#5b21b6] transition-all duration-300 rounded-lg px-8 py-3 font-semibold"
        >
          Грати ще раз
        </button>
        <button
          onClick={onExit}
          className="bg-[#1d0a44] border border-[#3a2166] hover:bg-[#2a1259] transition-colors
          rounded-lg px-8 py-3 font-semibold"
        >
          Вийти
        </button>
      </div>
    </div>
  );
};