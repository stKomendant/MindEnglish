import { GameCard } from "./GameCard";

interface GameSelectScreenProps {
  onPlayWordGame: () => void;
}

export const GameSelectScreen = ({ onPlayWordGame }: GameSelectScreenProps) => {
  return (
    <div className="text-[#CFC5E9]">
      <h1 className="text-2xl font-bold mb-5">Обери гру</h1>
      <GameCard
        title="Повторення слів"
        description="Перевір, наскільки добре ти запам'ятав свої слова. 10 випадкових питань, вибір із 4 варіантів."
        img="./images/icon/words/game.png"
        onPlay={onPlayWordGame}
      />
    </div>
  );
};