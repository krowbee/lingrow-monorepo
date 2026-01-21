import { User } from "@/types/auth/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuth: false,
  login: (user: User) =>
    set(() => ({
      user,
      isAuth: true,
    })),
  logout: () => set(() => ({ user: null, isAuth: false })),
}));
