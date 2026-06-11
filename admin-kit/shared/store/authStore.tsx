import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@admin-kit/shared/types";
type AuthState = {
  user: UserProfile | null;
  /** Mock login: username + password length ≥ 4 */
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (patch: Partial<Omit<UserProfile, "id">>) => void;
};

const defaultUser = (username: string): UserProfile => ({
  id: "u-1",
  name: username,
  phone: "",
  email: "",
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (username, password) => {
        const name = username.trim();
        if (name.length < 1 || password.length < 4) {
          return false;
        }
        set({ user: defaultUser(name) });
        return true;
      },
      logout: () => set({ user: null }),
      updateProfile: (patch) => {
        const u = get().user;
        if (!u) return;
        set({ user: { ...u, ...patch } });
      },
    }),
    { name: "mokeb-user-auth" },
  ),
);

export function useIsAuthenticated() {
  return useAuthStore((s) => s.user !== null);
}
