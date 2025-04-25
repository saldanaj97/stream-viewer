"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import { AuthStore, createAuthStore } from "@/stores/auth-store";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | null>(null);

interface AuthStoreProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthStoreProviderProps) {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export const useAuthStore = <T,>(selector: (store: AuthStore) => T) => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error("useAuthStore must be used within an AuthProvider");
  }

  return useStore(authStoreContext, selector);
};

export default AuthProvider;
