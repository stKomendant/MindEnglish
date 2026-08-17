const BlockRecentaActivity = () => {
  return (
    <>
      <div className="w-full bg-[#1d0a44] rounded-xl p-4">
        <h2 className="pb-2 font-bold">Остання активність</h2>
        <ul className="flex flex-col gap-2">
          <li className="flex flex-col sm:flex-row sm:justify-start gap-2 sm:gap-4 bg-[#260e55] rounded-xl p-4">
            <div className="flex justify-between sm:justify-start gap-4">
              <img
                width={30}
                height={30}
                src="./images/icon/words/bread.png"
                alt=""
              />
              <h3>Гра з слова "bread"</h3>
            </div>

            <div className="flex justify-between sm:justify-start gap-4">
              <p>+15 балів</p>
              <p className="text-gray-400">10 хв тому</p>
            </div>
          </li>
    <li className="flex flex-col sm:flex-row sm:justify-start gap-2 sm:gap-4 bg-[#260e55] rounded-xl p-4">
            <div className="flex justify-between sm:justify-start gap-4">
              <img
                width={30}
                height={30}
                src="./images/icon/words/book.png"
                alt=""
              />
              <h3>Гра з слова "book"</h3>
            </div>

            <div className="flex justify-between sm:justify-start gap-4">
              <p>+30 балів</p>
              <p className="text-gray-400">40 хв тому</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default BlockRecentaActivity;
