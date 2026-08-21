import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "/api/words";

export interface Word {
  id: string;
  word: string;
  definition: string | null;
  example: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WordState {
  words: Word[];
  isLoading: boolean;
  error: string | null;
  _fetchId: number;

  fetchWords: () => Promise<void>;
  createWord: (word: string, definition: string, example: string) => Promise<void>;
  updateWord: (id: string, word: string, definition: string, example: string) => Promise<void>;
  deleteWord: (id: string) => Promise<void>;
}

export const useWordStore = create<WordState>((set, get) => ({
  words: [],
  isLoading: false,
  error: null,
  _fetchId: 0,

  fetchWords: async () => {
    const currentFetchId = get()._fetchId + 1;
    set({ isLoading: true, error: null, _fetchId: currentFetchId });
    try {
      const response = await axios.get(API_URL);
      if (get()._fetchId === currentFetchId) {
        set({ words: response.data, isLoading: false });
      }
    } catch{
      if (get()._fetchId === currentFetchId) {
        set({ isLoading: false, error: "Failed to fetch words" });
      }
    }
  },

  createWord: async (word, definition, example) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(API_URL, { word, definition, example });
      set({ words: [response.data, ...get().words], isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: "Failed to create word" });  
      throw error;
    }
  },

  updateWord: async (id, word, definition, example) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/${id}`, { word, definition, example });
      set({
        words: get().words.map((w) => (w.id === id ? response.data : w)),
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: "Failed to update word" });
      throw error;
    }
  },

  deleteWord: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set({
        words: get().words.filter((w) => w.id !== id),
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: "Failed to delete word" });
      throw error;
    }
  },
}));