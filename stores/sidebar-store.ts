import { createStore } from "zustand";

export type SidebarState = {
  isSidebarOpen: boolean;
};

export type SidebarActions = {
  toggleSidebar: () => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const createSidebarStore = () => {
  return createStore<SidebarStore>((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  }));
};
