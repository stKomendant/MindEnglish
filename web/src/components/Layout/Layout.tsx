import { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { HeaderUsers } from "../../pages/Header/HeaderUserPage";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUIStore } from "../../UI/uiStore";
import { Menu } from "lucide-react";

const LayoutApp = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0328] via-[#16053A] to-[#0A011A] flex items-center justify-center">
        <p className="text-[#CFC5E9] text-lg">Завантаження...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0F0328] via-[#16053A] to-[#0A011A] h-full text-[#CFC5E9] grid grid-cols-1 md:grid-cols-[256px_1fr]">
        <Sidebar />

        <div className="p-3 md:pe-3 md:ps-0">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="md:hidden p-2">
              <Menu size={24} />
            </button>
            <h1 className="text-3xl font-bold flex-1">
              <HeaderUsers />
            </h1>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutApp;