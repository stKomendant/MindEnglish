import {
  Birdhouse,
  Gamepad2,
  TableProperties,
  ChartColumn,
  Settings,
} from "lucide-react";

export type MenuItem = {
  id: string;
  name: string;
  icon: React.ComponentType;
  path: string;
};

export const mainMenuData: MenuItem[] = [
  {
    id: "1",
    name: "Головна",
    icon: Birdhouse,
    path: "/",
  },
  {
    id: "2",
    name: "Словник",
    icon: TableProperties,
    path: "/dictionary",
  },
  {
    id: "3",
    name: "Грати",
    icon: Gamepad2,
    path: "/game",
  },
  {
    id: "4",
    name: "Статистика",
    icon: ChartColumn,
    path: "/statistics",
  },
  {
    id: "5",
    name: "Налаштування",
    icon: Settings,
    path: "/settings",
  },
];
