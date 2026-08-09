import { Link } from "react-router-dom";
import  useAuthStore from "../../../store/authStore";

const BlockRegister = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return (
    <></>
    );
  }

  return (
  <div className="bg-[#1d0a44] rounded-xl p-5 h-60 flex flex-col items-center text-center gap-4">
    <h2 className="text-lg font-bold leading-snug">
      Створіть обліковий запис,
      <br />
      щоб зберегти прогрес!
    </h2>

    <div className="flex flex-col gap-3 w-full">
      <Link to="/auth/signup">
    <button
  className=" h-14 w-full rounded-lg font-semibold text-xl
  bg-linear-to-br from-[#1aff1e] to-[#127a21] hover:from-[#3dff42]
  hover:to-[#1fa233] hover:shadow-[0_0_25px_#1aff1e] hover:-translate-y-0.5
  active:translate-y-0 transition-all duration-300"
>
          Створити акаунт
        </button>
      </Link>

      <Link to="/auth/login">
     <button
  className="h-14 w-full rounded-lg font-semibold text-xl
  bg-linear-to-br from-[#0c3df1] to-[#0d7893] hover:from-[#2f5fff]
  hover:to-[#16a7cc] hover:shadow-[0_0_25px_#2f5fff] hover:-translate-y-0.5
  active:translate-y-0 transition-all duration-300"
>
          Увійти
        </button>
      </Link>
    </div>
  </div>
  );
};

export default BlockRegister;