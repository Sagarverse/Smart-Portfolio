// Zustand store for notes state
import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  pinned?: boolean;
  updatedAt?: string;
}

interface NotesState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (note) => set((state) => ({ notes: state.notes.map((n) => n.id === note.id ? note : n) })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
}));
