"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import { createSidebarStore, SidebarStore } from "@/stores/sidebar-store";

export type SidebarStoreApi = ReturnType<typeof createSidebarStore>;

export const SidebarStoreContext = createContext<SidebarStoreApi | null>(null);

interface SidebarStoreProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarStoreProviderProps) {
  const storeRef = useRef<SidebarStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createSidebarStore();
  }

  return (
    <SidebarStoreContext.Provider value={storeRef.current}>
      {children}
    </SidebarStoreContext.Provider>
  );
}

export const useSidebarStore = <T,>(selector: (store: SidebarStore) => T) => {
  const sidebarStoreContext = useContext(SidebarStoreContext);

  if (!sidebarStoreContext) {
    throw new Error("useSidebarStore must be used within a SidebarProvider");
  }

  return useStore(sidebarStoreContext, selector);
};

export default SidebarProvider;
