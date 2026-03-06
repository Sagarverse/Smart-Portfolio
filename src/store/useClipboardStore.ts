// Zustand store for clipboard state
import { create } from 'zustand';

interface ClipboardItem {
  id: string;
  text: string;
  encrypted?: boolean;
  createdAt: string;
}

interface ClipboardState {
  history: ClipboardItem[];
  addClipboard: (item: ClipboardItem) => void;
  clearHistory: () => void;
}

export const useClipboardStore = create<ClipboardState>((set) => ({
  history: [],
  addClipboard: (item) => set((state) => ({ history: [item, ...state.history] })),
  clearHistory: () => set({ history: [] }),
}));
