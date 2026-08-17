import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useWordStore, } from "../../../store/wordStore";
import { useAuthStore } from "../../../store/authStore";

const BlockMyWords = () => {
const {words, fetchWords} = useWordStore();
const { isAuthenticated } = useAuthStore();

useEffect(() => {
  if (isAuthenticated) {
    fetchWords();
  }
}, [isAuthenticated]);

const latestWords = isAuthenticated ? words.slice(-4).reverse() : [];

  return (
    <div className=" py-3">
      <div className="flex justify-between items-baseline pb-2">
        <h2 className="text-2xl font-bold">Мої слова</h2>
        <Link to="/dictionary" className="text-xs text-indigo-700">
          Переглянути всі
        </Link>
      </div>

     {latestWords.length === 0 ? (
        <p className="text-gray-400 text-sm">
          Ще немає слів. Додай перше у словнику!
        </p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {latestWords.map((w) => (
            <li
              key={w.id}
              className="w-full max-w-40 bg-[#1d0a44] rounded-xl p-4 relative"
            >
              <div className="rounded-xl w-[90px] h-[80px] bg-[#6d28d9]/30 flex items-center justify-center text-3xl font-bold">
                {w.word.charAt(0).toUpperCase()}
              </div>
              <h3 className="pt-2">{w.word}</h3>
              <p className="text-gray-400 text-xs">{w.definition}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlockMyWords;
