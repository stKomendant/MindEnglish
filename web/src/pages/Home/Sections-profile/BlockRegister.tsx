const BlockMyProgress = () => {
  return (
    <div className=" rounded-xl p-5 grid grig-rows-3 gap-4  ">
      <h2 className="text-xl font-bold">
        Створіть обліковий запис, щоб зберегти прогрес!
      </h2>
      <button
        className="w-58 h-12 rounded-lg bg-gradient-to-br from-[#1aff1e] to-[#127a21]
      hover:from-[#3dff42] hover:to-[#1fa233] hover:shadow-[0_0_25px_#1aff1e] hover:-translate-y-1 transition-all duration-300"
      >
        Створити акаунт
      </button>
      <button
        className="w-58 h-12 rounded-lg bg-gradient-to-br from-[#0c3df1] to-[#0d7893] hover:from-[#2f5fff] 
      hover:to-[#16a7cc] hover:shadow-[0_0_25px_#2f5fff] hover:-translate-y-1 transition-all duration-300"
      >
        Увійти
      </button>
    </div>
  );
};

export default BlockMyProgress;
