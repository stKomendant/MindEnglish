import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "https://mindenglish.onrender.com/api/game-results";

export interface GameResult {
  id: string;
  score: number;
  totalQuestions: number;
  gameType: string;
  createdAt: string;
}

interface GameResultState {
  results: GameResult[];
  fetchResults: () => Promise<void>;
  submitResult: (score: number, totalQuestions: number) => Promise<void>;
}

export const useGameResultStore = create<GameResultState>((set, get) => ({
  results: [],

  fetchResults: async () => {
    try {
      const response = await axios.get(API_URL);
      set({ results: response.data });
    } catch (error) {
      console.error("Failed to fetch game results:", error);
    }
  },

  submitResult: async (score, totalQuestions) => {
    try {
      const response = await axios.post(API_URL, {
        score,
        totalQuestions,
        gameType: "word-repeat",
      });
      set({ results: [response.data, ...get().results] });
    } catch (error) {
      console.error("Failed to submit game result:", error);
    }
  },
}));