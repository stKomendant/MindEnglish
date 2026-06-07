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
};

export const mainMenuData: MenuItem[] = [
  {
    id: "1",
    name: "Головна",
    icon: Birdhouse,
  },
  {
    id: "2",
    name: "Словник",
    icon: TableProperties,
  },
  {
    id: "3",
    name: "Грати",
    icon: Gamepad2,
  },
  {
    id: "4",
    name: "Статистика",
    icon: ChartColumn,
  },
  {
    id: "5",
    name: "Налаштування",
    icon: Settings,
  },
];
