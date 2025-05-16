"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  createMultiViewBarStore,
  MultiViewBarStore,
} from "@/stores/multiview-bar-store";

export type MultiViewBarStoreApi = ReturnType<typeof createMultiViewBarStore>;

export const MultiViewBarStoreContext =
  createContext<MultiViewBarStoreApi | null>(null);

interface MultiViewBarProviderProps {
  children: ReactNode;
}

export function MultiViewBarProvider({ children }: MultiViewBarProviderProps) {
  const storeRef = useRef<MultiViewBarStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createMultiViewBarStore();
  }

  return (
    <MultiViewBarStoreContext.Provider value={storeRef.current}>
      {children}
    </MultiViewBarStoreContext.Provider>
  );
}

export const useMultiViewBarStore = <T,>(
  selector: (store: MultiViewBarStore) => T,
) => {
  const multiViewBarStoreContext = useContext(MultiViewBarStoreContext);

  if (!multiViewBarStoreContext) {
    throw new Error(
      "useMultiViewBarStore must be used within a MultiViewBarProvider",
    );
  }

  return useStore(multiViewBarStoreContext, selector);
};

export default MultiViewBarProvider;
