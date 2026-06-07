import {
  Birdhouse,
  BookOpenText,
  Gamepad2,
  TableProperties,
  Dumbbell,
  ChartColumn,
  Trophy,
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
    name: "Уроки",
    icon: BookOpenText,
  },
  {
    id: "5",
    name: "Асоціації",
    icon: Dumbbell,
  },
  {
    id: "6",
    name: "Статистика",
    icon: ChartColumn,
  },
  {
    id: "7",
    name: "Досягнення",
    icon: Trophy,
  },
  {
    id: "8",
    name: "Налаштування",
    icon: Settings,
  },
];
