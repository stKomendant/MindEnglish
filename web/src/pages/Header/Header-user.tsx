import { ChevronDown } from "lucide-react";

export const HeaderUsers = () => {
  return (
    <div className="flex justify-end pt-4">
      <button
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

        <span className="text-2xl font-bold">Stas</span>
        <span className="flex-1"></span>
        <ChevronDown size={18} className="text-gray-400" />
      </button>
    </div>
  );
};
