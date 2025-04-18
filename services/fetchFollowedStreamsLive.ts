import { createError } from "./createError";

import { ENV } from "@/data/env";
import { mockFollowedStreams } from "@/data/mockStreams";
import { FollowedStreamer } from "@/types/sidebar.types";

type Platform = "twitch" | "youtube";

// Define platform configurations in one place for easier maintenance
const PLATFORMS = {
  twitch: {
    endpoint: "/api/twitch/following",
    refreshEndpoint: `${ENV.apiUrl}/api/twitch/oauth/refresh`,
    mockDelay: 500,
  },
  youtube: {
    endpoint: "/api/google/subscriptions",
    refreshEndpoint: `${ENV.apiUrl}/api/google/oauth/refresh`,
    mockDelay: 1800,
  },
};

/**
 * Attempts to refresh tokens for a specific platform
 * @param platform The platform to refresh tokens for (twitch, youtube, kick)
 * @returns Object containing success status and any error
 */
async function refreshTokenForPlatform(
  platform: Platform,
): Promise<{ success: boolean; error?: string }> {
  try {
    const refreshEndpoint = PLATFORMS[platform]?.refreshEndpoint;

    if (!refreshEndpoint) {
      throw new Error(
        `No refresh endpoint configured for platform: ${platform}`,
      );
    }

    const response = await fetch(refreshEndpoint, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return {
        success: false,
        error:
          errorData.message ||
          `Failed to refresh ${platform} token: ${response.status}`,
      };
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return { success: false, error: errorMessage };
  }
}

async function fetchPlatformStreams(
  platform: Platform,
): Promise<{ data: FollowedStreamer[]; error?: Error }> {
  const platformConfig = PLATFORMS[platform];

  if (!platformConfig) {
    return {
      data: [],
      error: new Error(`No configuration for platform: ${platform}`),
    };
  }

  const { endpoint, mockDelay } = platformConfig;

  // Development mode mock data
  if (ENV.isDevelopment) {
    await new Promise((res) => setTimeout(res, mockDelay));

    const mockStreams = mockFollowedStreams.filter(
      (stream) => stream.platform.toLowerCase() === platform,
    );

    return { data: mockStreams };
  }

  try {
    const response = await fetch(`${ENV.apiUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // If unauthorized, try to refresh the token and retry
    if (response.status === 401) {
      const { success } = await refreshTokenForPlatform(platform);

      // If refresh was successful, retry the request
      if (success) {
        const retryResponse = await fetch(`${ENV.apiUrl}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (retryResponse.ok) {
          const responseData = await retryResponse.json();

          const rawData = Array.isArray(responseData)
            ? responseData
            : responseData.data || [];

          const platformData: FollowedStreamer[] = rawData.map((user: any) => ({
            ...user,
            platform,
          }));

          return { data: platformData };
        }
      }

      // If refresh failed, throw error
      throw new Error(
        `Authentication expired for ${platform}. Please log in again.`,
      );
    }

    if (!response.ok) {
      throw createError(
        `Failed to fetch ${platform} live streams: ${response.status} ${response.statusText}`,
      );
    }

    const responseData = await response.json();

    // Extract the data array from the response, handling both direct arrays and nested data
    const rawData = Array.isArray(responseData)
      ? responseData
      : responseData.data || [];

    // Default handling for other platforms (e.g., Twitch)
    const platformData: FollowedStreamer[] = rawData.map((user: any) => ({
      ...user,
      platform,
    }));

    return { data: platformData };
  } catch (err) {
    const error =
      err instanceof Error ? err : createError(`${platform} fetch error`);

    return { data: [], error };
  }
}

// Export these functions to allow platform-specific fetching
export async function fetchLiveFollowedTwitchStreams() {
  return fetchPlatformStreams("twitch");
}

export async function fetchLiveSubscribedYoutubeStreams() {
  return fetchPlatformStreams("youtube");
}

// Currently, Kick is not included in the live followed streams fetch since there is no public API call
// async function fetchLiveFollowedKickStreams() {
//   return fetchPlatformStreams("/api/kick/user/following", "Kick");
// }
