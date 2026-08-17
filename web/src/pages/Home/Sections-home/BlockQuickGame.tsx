import { Link } from "react-router-dom";

type typeQuickGame = {
  title: string;
  description: string;
  img: string;
  word: string;
  wordTranslation: string;
};

const QuickGame = ({
  title,
  description,
  img,
  word,
  wordTranslation,
}: typeQuickGame) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full bg-[#1d0a44] rounded-xl p-4">
          <h2 className="text-2xl font-bold pb-2">{title}</h2>
          <p className="text-xs pb-4 text-gray-400">{description}</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <img
              className="rounded-xl w-full sm:w-[180px] h-[140px] sm:h-[110px] object-cover"
              src={img}
              alt="Bread"
            />
            <div>
              <p className="text-xs text-gray-700 pb-2">слова дня</p>
              <h3 className="text-lg">
                {word} <br /> {wordTranslation}
              </h3>
            </div>
          </div>
          <div className="pt-5 w-full text-right">
            <Link to="/game">
              <button
                className="w-full sm:w-48 h-12 rounded-lg bg-gradient-to-br from-[#1f048d] to-[#f34bff] text-xl
              hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,255,0.25)] transition-all duration-300 cursor-pointer"
              >
                Грати
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full bg-[#1d0a44] rounded-xl p-4">
          <h2 className="text-2xl font-bold pb-2">Швидка гра</h2>
          <p className="text-xs pb-4 text-gray-400">
            Перевір, наскільки добре ти запам'ятав свої слова
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <img
              className="rounded-xl w-full sm:w-[180px] h-[140px] sm:h-[110px] object-cover"
              src="./images/icon/words/game.png"
              alt="game"
            />
          </div>
          <div className="pt-5 w-full text-right">
            <Link to="/game">
              <button
                className="w-full sm:w-48 h-12 rounded-lg bg-gradient-to-br from-[#1f048d] to-[#f34bff] text-xl
              hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,255,0.25)] transition-all duration-300 cursor-pointer"
              >
                Грати
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickGame;