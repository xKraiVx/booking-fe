import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import type { User } from "@/repos/user.repo";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuth: (token, user) => {
        Cookies.set("auth_token", token, {
          expires: 7,
          sameSite: "strict",
          secure: true,
        });
        set({ isAuthenticated: true, user });
      },
      clearAuth: () => {
        Cookies.remove("auth_token");
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
