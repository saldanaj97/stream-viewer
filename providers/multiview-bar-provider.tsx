"use client";

import { ReactNode } from "react";

import { useMultiViewBarStore } from "@/stores/multiview-bar-store";

export function MultiViewBarProvider({ children }: { children: ReactNode }) {
  // This provider is a passthrough for now, but can be used for SSR hydration or context if needed
  useMultiViewBarStore(); // Ensures zustand store is initialized

  return <>{children}</>;
}
