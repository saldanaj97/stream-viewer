import { useEffect, useState } from "react";
import useSWR from "swr";

import { userPlatformAuthFetcher } from "@/helpers/fetchers";
import { getCookie } from "@/helpers/getCookies";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const usePlatformLogin = ({ platform }: { platform: string | null }) => {
  const [authData, setAuthData] = useState<any>(null);

  // TODO: Make this work. Currently the cookies are not being read in from the browser

  // Check if user is already authenticated by looking for cookies
  useEffect(() => {
    const authSessionCookie = getCookie("auth_session");
    const authTokensCookie = getCookie("auth_tokens");

    if (authSessionCookie && authTokensCookie) {
      try {
        const sessionData = JSON.parse(authSessionCookie);
        const tokenData = JSON.parse(authTokensCookie);

        // Combine both pieces of data into a single auth object
        const combinedAuthData = {
          ...sessionData,
          ...tokenData,
        };

        setAuthData(combinedAuthData);
      } catch (e) {
        console.error("Error parsing auth cookies:", e);
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

  // Logout function clears the auth cookies
  const logout = async () => {
    // Call the logout endpoint if you need server-side logout
    try {
      await fetch(`${apiUrl}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (e) {
      console.error("Error during logout:", e);
    }

    // Clear cookies by setting expiration in the past
    document.cookie =
      "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "auth_tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Update state
    setAuthData(null);
  };

  return {
    data,
    error,
    isLoading,
    isAuthenticated: Boolean(authData),
    authData,
    logout,
  };
};
