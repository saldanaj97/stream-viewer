import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SidebarState = {
  isSidebarOpen: boolean;
};

export type SidebarActions = {
  toggleSidebar: () => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const createSidebarStore = () => {
  return createStore<SidebarStore>()(
    persist(
      (set) => ({
        isSidebarOpen: true,
        toggleSidebar: () =>
          set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      }),
      {
        name: "sidebar-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
