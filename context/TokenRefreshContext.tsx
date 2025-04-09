"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { refreshAllTokens } from "@/services/refreshTokens";

interface TokenRefreshContextType {
  refreshToken: (platform: "twitch" | "youtube" | "kick") => Promise<boolean>;
  isRefreshing: boolean;
}

const TokenRefreshContext = createContext<TokenRefreshContextType | undefined>(
  undefined,
);

export function TokenRefreshProvider({ children }: { children: ReactNode }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh tokens on initial load to ensure fresh tokens
  useEffect(() => {
    async function refreshOnLoad() {
      await refreshAllTokens();
    }
    refreshOnLoad();

    // Set up periodic token refresh (every 30 minutes)
    const intervalId = setInterval(refreshAllTokens, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const refreshToken = async (platform: "twitch" | "youtube" | "kick") => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        `/api/${platform === "youtube" ? "google" : platform}/oauth/refresh`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      setIsRefreshing(false);

      return result.refreshed || false;
    } catch (error) {
      setIsRefreshing(false);

      return false;
    }
  };

  return (
    <TokenRefreshContext.Provider value={{ refreshToken, isRefreshing }}>
      {children}
    </TokenRefreshContext.Provider>
  );
}

export const useTokenRefresh = () => {
  const context = useContext(TokenRefreshContext);

  if (context === undefined) {
    throw new Error(
      "useTokenRefresh must be used within a TokenRefreshProvider",
    );
  }

  return context;
};
