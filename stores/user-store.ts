import { createStore } from "zustand";

export type User = {
  id?: string;
  name?: string;
};

export type UserState = {
  user: User | null;
};

export type UserActions = {
  setUser: (user: User) => void;
};

export type UserStore = UserState & UserActions;

export const createUserStore = () => {
  return createStore<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null }),
  }));
};
