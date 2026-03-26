import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  changeMenuState: (state: boolean) => void;
}

export const useMenuStore = create<MenuState>()((set) => ({
  isOpen: false,
  changeMenuState: (state: boolean) => set({ isOpen: state }),
}));
