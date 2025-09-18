import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { UserTypes } from "@/types/User";

interface AuthState {
  user: UserTypes | null;
  isLoggedIn: boolean;
  setUser: (user: UserTypes | null) => void;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        setUser: (user) => {
          set({ user, isLoggedIn: !!user });
        },
        refreshSession: async () => {
          // Logic for session refresh
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
