import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export const HeaderUsers = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex justify-end pt-4 relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
        flex items-center
        gap-3
        px-3
        h-12
        min-w-[250px]
        rounded-full
        border border-black
        bg-[#1d0a44]
        "
      >
        <img
          className="w-14 h-14 rounded-full object-cover"
          src="/images/icon/users/profile.png"
          alt="profile"
        />

        <span className="text-2xl font-bold">{user?.username}</span>
        <span className="flex-1"></span>
        <ChevronDown size={18} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[250px] bg-[#1d0a44] border border-black rounded-xl overflow-hidden z-10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10 text-left"
          >
            <LogOut size={18} />
            Вийти
          </button>
        </div>
      )}
    </div>
  );
};