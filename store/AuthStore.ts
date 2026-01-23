import { User } from "@/types/auth/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      login: (user: User) =>
        set(() => ({
          user,
          isAuth: true,
        })),
      logout: () => set(() => ({ user: null, isAuth: false })),
    }),
    {
      name: "auth-storage",
    },
  ),
);
