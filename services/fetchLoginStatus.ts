import { refreshAllTokens } from "./refreshTokens";

import { ENV } from "@/data/env";
import { mockLoginStatus } from "@/data/mockPlatformAuth";
import { LoginStatusResponse } from "@/types/auth.types";

export const fetchLoginStatus = async (): Promise<{
  data?: LoginStatusResponse;
  error?: Error | null;
}> => {
  // Return mock data in development mode
  if (ENV.isDevelopment) {
    return { data: mockLoginStatus, error: null };
  }

  try {
    // First, try refreshing any potentially expired tokens
    await refreshAllTokens();

    // Then fetch the login status with the refreshed tokens
    const response = await fetch(`${ENV.apiUrl}/api/auth/status`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error("An error occurred");

    return { data: undefined, error };
  }
};
