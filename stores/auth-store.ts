import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PlatformLoginState = {
  twitch: boolean;
  youtube: boolean;
  kick: boolean;
};

export type AuthState = {
  platforms: PlatformLoginState;
};

export type AuthActions = {
  setPlatformStatus: (
    platform: keyof PlatformLoginState,
    status: boolean,
  ) => void;
  setAllPlatformStatuses: (statuses: PlatformLoginState) => void;
  resetAuth: () => void;
};

export type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  platforms: {
    twitch: false,
    youtube: false,
    kick: false,
  },
};

export const createAuthStore = () => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initialState,
        setPlatformStatus: (platform, status) =>
          set((state) => ({
            platforms: {
              ...state.platforms,
              [platform]: status,
            },
          })),
        setAllPlatformStatuses: (statuses) => set({ platforms: statuses }),
        resetAuth: () => set(initialState),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
