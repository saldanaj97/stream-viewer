import { ENV } from "@/data/env";

interface PlatformAuthStatus {
  authenticated: boolean;
}

interface AuthStatusResponse {
  twitch: PlatformAuthStatus;
  youtube: PlatformAuthStatus;
  kick: PlatformAuthStatus;
}

interface ApiPlatformStatus {
  platform: string;
  accessTokenAvailable: boolean;
}

export async function fetchPublicAuthStatus(): Promise<AuthStatusResponse> {
  // Return mock data if in development mode
  if (ENV.isDevelopment) {
    return {
      twitch: { authenticated: true },
      youtube: { authenticated: true },
      kick: { authenticated: true },
    };
  }

  try {
    const response = await fetch(`${ENV.apiUrl}/api/auth/status/public`);

    if (!response.ok) {
      throw new Error("Failed to fetch auth status");
    }

    const result = await response.json();

    // Process the new response format
    const authStatus: AuthStatusResponse = {
      twitch: { authenticated: false },
      youtube: { authenticated: false },
      kick: { authenticated: false },
    };

    // Map the response data to our expected format
    if (result.data && Array.isArray(result.data)) {
      result.data.forEach((platform: ApiPlatformStatus) => {
        const platformName = platform.platform.toLowerCase();

        if (
          platformName === "twitch" ||
          platformName === "youtube" ||
          platformName === "kick"
        ) {
          authStatus[platformName as keyof AuthStatusResponse] = {
            authenticated: platform.accessTokenAvailable,
          };
        }
      });
    }

    console.log("Fetched public auth status:", authStatus);

    return authStatus;
  } catch (error) {
    // Log error but don't expose it to users
    // eslint-disable-next-line no-console
    console.error("Error fetching public auth status:", error);

    // Return all as not authenticated if there's an error
    return {
      twitch: { authenticated: false },
      youtube: { authenticated: false },
      kick: { authenticated: false },
    };
  }
}
