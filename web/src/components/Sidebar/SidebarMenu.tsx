import { mainMenuData } from "./data/main-menu-data";
import type { MenuItem } from "./data/main-menu-data";

export const SidebarMenu = () => {
  return (
    <ul className="mt-4 space-y-2">
      {mainMenuData.map((item: MenuItem) => {
        return (
          <li
            key={item.id}
            className="flex gap-3 items-center p-2 rounded hover:bg-[#2c0d4f] cursor-pointer"
          >
            <item.icon />
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};
