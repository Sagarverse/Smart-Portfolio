// Zustand store for dashboard stats
import { create } from 'zustand';

interface DashboardStats {
  totalNotes: number;
  totalFiles: number;
  clipboardActivity: number;
  recentActivity: any[];
}

interface DashboardState {
  stats: DashboardStats;
  setStats: (stats: DashboardStats) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: {
    totalNotes: 0,
    totalFiles: 0,
    clipboardActivity: 0,
    recentActivity: [],
  },
  setStats: (stats) => set({ stats }),
}));
