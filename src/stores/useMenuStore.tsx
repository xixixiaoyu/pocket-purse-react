import { create } from 'zustand';

interface MenuState {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}
export const useMenuStore = create<MenuState>((set) => {
  return {
    isVisible: false,
    setVisible: (isVisible) => set({ isVisible }),
  };
});
