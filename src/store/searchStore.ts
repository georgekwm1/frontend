import { create } from "zustand";
import { aiApi } from "@/lib/api";
import type { SearchHistoryItem } from "@/types";

interface SearchState {
  currentQuery: string;
  currentResults: string[];
  history: SearchHistoryItem[];
  searching: boolean;
  loadingHistory: boolean;
  ask: (question: string) => Promise<string[]>;
  fetchHistory: () => Promise<void>;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  currentQuery: "",
  currentResults: [],
  history: [],
  searching: false,
  loadingHistory: false,
  ask: async (question) => {
    set({ searching: true, currentQuery: question, currentResults: [] });
    try {
      const data = await aiApi.ask({ question });
      const results = Array.isArray(data.response)
      ? data.response.map((item: any) => typeof item === "string" ? item : item.question)
      : [];
      set({ currentResults: results, searching: false });
      return results;
    } catch (err) {
      set({ searching: false });
      throw err;
    }
  },
  fetchHistory: async () => {
    set({ loadingHistory: true });
    try {
      const data = await aiApi.history();
      set({ history: data.history ?? [], loadingHistory: false });
    } catch (err) {
      set({ loadingHistory: false });
      throw err;
    }
  },
  reset: () => set({ currentQuery: "", currentResults: [] }),
}));
