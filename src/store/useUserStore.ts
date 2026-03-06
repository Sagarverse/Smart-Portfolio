// Zustand store for user state with persistence
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  hydrate: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      
      setUser: (user) => set({ user }),
      
      logout: () => {
        set({ user: null });
        // Clear token from cookies
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      hydrate: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/auth/me', {
            credentials: 'include',
          });
          
          if (response.ok) {
            const { user } = await response.json();
            set({ user });
          } else {
            set({ user: null });
          }
        } catch (error) {
          console.error('Failed to hydrate user:', error);
          set({ user: null });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
