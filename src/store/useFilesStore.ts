// Zustand store for files state
import { create } from 'zustand';

interface FileItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  expiresAt?: string;
  createdAt: string;
}

interface FilesState {
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
  addFile: (file: FileItem) => void;
  deleteFile: (id: string) => void;
}

export const useFilesStore = create<FilesState>((set) => ({
  files: [],
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [file, ...state.files] })),
  deleteFile: (id) => set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
}));
