import { create } from 'zustand';

interface LocalStorageState {
  hasRead: boolean;
  setHasRead: (newStatus: boolean) => void;
}

export const useLocalStorageStore = create<LocalStorageState>((set) => {
  return {
    hasRead: localStorage.getItem('hasRead') === '1',
    setHasRead: (newStatus) => {
      if (newStatus) {
        localStorage.setItem('hasRead', '1');
      } else {
        localStorage.removeItem('hasRead');
      }
      set({ hasRead: newStatus });
    },
  };
});
