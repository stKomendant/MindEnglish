import { mainMenuData } from "./data/main-menu-data";
import type { MenuItem } from "./data/main-menu-data";
import { NavLink } from "react-router-dom";

export const SidebarMenu = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <ul className="mt-7 space-y-2 ">
      {mainMenuData.map((item: MenuItem) => {
        return (
          <li key={item.id} className="">
            <NavLink
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex gap-3 items-center p-4 rounded-lg hover:bg-[#260e42] ${
                  isActive
                    ? "bg-[#2c0d4f] w-full h-14 bg-linear-65 #2c0d4f to-fuchsia-500 border-[#2c0d4f] border-2"
                    : ""
                }`
              }
            >
              <item.icon />
              {item.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};