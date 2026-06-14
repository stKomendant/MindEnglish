import Sidebar from "../Sidebar/Sidebar";
import { HeaderUsers } from "../../pages/Header/Header-user";
import { Outlet } from "react-router-dom";

const LayoutApp = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0F0328] via-[#16053A] to-[#0A011A] h-full text-[#CFC5E9] grid grid-cols-[256px_1fr]">
        <Sidebar />

        <div className="pe-3 ">
          <h1 className="text-3xl font-bold">
            <HeaderUsers />
          </h1>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutApp;
