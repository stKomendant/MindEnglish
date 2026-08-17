interface GameCardProps {
  title: string;
  description: string;
  img: string;
  onPlay: () => void;
}

export const GameCard = ({ title, description, img, onPlay }: GameCardProps) => {
  return (
    <div className="bg-[#1d0a44] border border-[#3a2166] rounded-xl p-6 max-w-md">
      <img
        src={img}
        alt={title}
        className="rounded-xl w-full h-[160px] object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-[#8577a8] mb-6">{description}</p>
      <button
        onClick={onPlay}
        className="w-full bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] hover:from-[#7c3aed]
        hover:to-[#5b21b6] transition-all duration-300 rounded-lg px-6 py-3 font-semibold"
      >
        Почати гру
      </button>
    </div>
  );
};