import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:3000/api/achievements";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface AchievementState {
  achievements: Achievement[];
  isLoading: boolean;
  fetchAchievements: () => Promise<void>;
}

export const useAchievementStore = create<AchievementState>((set) => ({
  achievements: [],
  isLoading: false,

  fetchAchievements: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(API_URL);
      set({ achievements: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch achievements:", error);
      set({ isLoading: false });
    }
  },
}));