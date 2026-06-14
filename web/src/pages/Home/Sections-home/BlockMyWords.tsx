const BlockMyWords = () => {
  return (
    <div className=" py-3">
      <div className="flex justify-between items-baseline pb-2">
        <h2 className="text-2xl font-bold">Мої слова</h2>
        <button className="text-xs text-indigo-700">Переглянути всі</button>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <li className="w-full max-w-40 bg-[#1d0a44] rounded-xl p-4 relative">
          <button className="absolute top-0 right-3">...</button>
          <img
            className=" rounded-xl"
            width={90}
            height={80}
            src="./images/icon/words/bread.png"
            alt="bread"
          />
          <h3 className="pt-2">bread</h3>
          <p className="text-gray-400 text-xs">хліб</p>
        </li>

        <li className="w-full max-w-40 bg-[#1d0a44] rounded-xl p-4 relative">
          <button className="absolute top-0 right-3">...</button>
          <img
            className=" rounded-xl"
            width={90}
            height={80}
            src="./images/icon/words/water.png"
            alt="water"
          />
          <h3 className="pt-2">water</h3>
          <p className="text-gray-400 text-xs">вода</p>
        </li>

        <li className="w-full max-w-40 bg-[#1d0a44] rounded-xl p-4 relative">
          <button className="absolute top-0 right-3">...</button>
          <img
            className=" rounded-xl"
            width={90}
            height={80}
            src="./images/icon/words/book.png"
            alt="book"
          />
          <h3 className="pt-2">book</h3>
          <p className="text-gray-400 text-xs">книга</p>
        </li>

        <li className="w-full max-w-40 bg-[#1d0a44] rounded-xl p-4 relative">
          <button className="absolute top-0 right-3">...</button>
          <img
            className=" rounded-xl"
            width={90}
            height={80}
            src="./images/icon/words/sun.png"
            alt="sun"
          />
          <h3 className="pt-2">sun</h3>
          <p className="text-gray-400 text-xs">сонце</p>
        </li>
      </ul>
    </div>
  );
};

export default BlockMyWords;
