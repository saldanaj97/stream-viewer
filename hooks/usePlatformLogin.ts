import { useEffect, useState } from "react";
import useSWR from "swr";

import { userPlatformAuthFetcher } from "@/helpers/fetchers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const usePlatformLogin = ({ platform }: { platform: string }) => {
  const [authData, setAuthData] = useState<any>(null);

  // Check if user is already authenticated
  useEffect(() => {
    const savedAuthData = localStorage.getItem("authData");

    if (savedAuthData) {
      try {
        const parsedAuthData = JSON.parse(savedAuthData);

        setAuthData(parsedAuthData);
      } catch (e) {
        localStorage.removeItem("authData");
      }
    }
  }, []);

  // Only fetch the auth URL if the user isn't already authenticated
  const shouldFetch = platform && !authData;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `${apiUrl}/api/auth/${platform}/login` : null,
    userPlatformAuthFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 3600000,
    },
  );

  return {
    data,
    error,
    isLoading,
    isAuthenticated: Boolean(authData),
    authData,
    logout: () => {
      localStorage.removeItem("authData");
      setAuthData(null);
    },
  };
};
