import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  isOnboarded: boolean;
}

interface AppActions {
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  completeOnboarding: () => void;
  reset: () => void;
}

type AppStore = AppState & AppActions;

const initialState: AppState = {
  theme: 'dark',
  isOnboarded: false,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      completeOnboarding: () => set({ isOnboarded: true }),
      reset: () => set(initialState),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
