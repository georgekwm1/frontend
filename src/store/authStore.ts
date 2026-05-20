import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi, TOKEN_KEY } from "@/lib/api";
import { parseJwtEmail } from "@/lib/utils";
import type { LoginPayload, SignupPayload } from "@/types";

interface AuthState {
  token: string | null;
  email: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      loading: false,
      login: async (payload) => {
        set({ loading: true });
        try {
          const data = await authApi.login(payload);
          localStorage.setItem(TOKEN_KEY, data.access_token);
          set({
            token: data.access_token,
            email: parseJwtEmail(data.access_token) ?? payload.email,
            loading: false,
          });
        } catch (err) {
          set({ loading: false });
          throw err;
        }
      },
      signup: async (payload) => {
        set({ loading: true });
        try {
          await authApi.signup(payload);
          set({ loading: false });
        } catch (err) {
          set({ loading: false });
          throw err;
        }
      },
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        set({ token: null, email: null });
      },
      hydrate: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          set({ token, email: parseJwtEmail(token) });
        }
      },
    }),
    {
      name: "icai-auth",
      partialize: (state) => ({ token: state.token, email: state.email }),
    },
  ),
);
