import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  setAuth: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  setAuth: (token) => {
    Cookies.set('auth_token', token, {
      expires: 7,
      sameSite: 'strict',
      secure: true,
    });
    set({ isAuthenticated: true });
  },
  clearAuth: () => {
    Cookies.remove('auth_token');
    set({ isAuthenticated: false });
  },
}));
