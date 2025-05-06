import { createError } from "./createError";

import { ENV } from "@/data/env";
import { mockFollowedStreams } from "@/data/mockStreams";
import { FollowedStreamer } from "@/types/sidebar.types";

type Platform = "twitch" | "youtube";

// Define platform configurations for refresh tokens and mock data
const PLATFORMS = {
  twitch: {
    refreshEndpoint: `${ENV.apiUrl}/api/twitch/oauth/refresh`,
    mockDelay: 500,
  },
  youtube: {
    refreshEndpoint: `${ENV.apiUrl}/api/google/oauth/refresh`,
    mockDelay: 1800,
  },
};

// Consolidated endpoint
const CONSOLIDATED_ENDPOINT = "/api/following";

/**
 * Attempts to refresh tokens for a specific platform
 * @param platform The platform to refresh tokens for (twitch, youtube)
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

/**
 * Fetches mock followed streams for development environment with simulated delays.
 * @returns Object containing mock data for Twitch and YouTube.
 */
async function fetchMockFollowedStreams(): Promise<{
  twitchMockData: FollowedStreamer[];
  youtubeMockData: FollowedStreamer[];
}> {
  // Simulate different loading times for each platform
  const twitchMockData = await new Promise<FollowedStreamer[]>((resolve) => {
    setTimeout(() => {
      const data = mockFollowedStreams.filter(
        (stream) => stream.platform.toLowerCase() === "twitch",
      );

      resolve(data);
    }, PLATFORMS.twitch.mockDelay);
  });

  const youtubeMockData = await new Promise<FollowedStreamer[]>((resolve) => {
    setTimeout(() => {
      const data = mockFollowedStreams.filter(
        (stream) => stream.platform.toLowerCase() === "youtube",
      );

      resolve(data);
    }, PLATFORMS.youtube.mockDelay);
  });

  return {
    twitchMockData: twitchMockData,
    youtubeMockData: youtubeMockData,
  };
}

/**
 * Fetches all followed streams from all platforms using a single API endpoint
 * @returns Object containing categorized platform data and errors
 */
export async function fetchAllFollowedStreams(): Promise<{
  twitch: { data: FollowedStreamer[]; error?: Error };
  youtube: { data: FollowedStreamer[]; error?: Error };
}> {
  // Development mode mock data
  if (ENV.isDevelopment) {
    const { twitchMockData, youtubeMockData } =
      await fetchMockFollowedStreams();

    return {
      twitch: { data: twitchMockData },
      youtube: { data: youtubeMockData },
    };
  }

  try {
    const response = await fetch(`${ENV.apiUrl}${CONSOLIDATED_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      // If we get a 401, we should try to refresh tokens for each platform
      if (response.status === 401) {
        // Try to refresh tokens for both platforms and retry
        const [twitchRefresh, youtubeRefresh] = await Promise.all([
          refreshTokenForPlatform("twitch"),
          refreshTokenForPlatform("youtube"),
        ]);

        if (twitchRefresh.success || youtubeRefresh.success) {
          // Retry the request if at least one refresh was successful
          const retryResponse = await fetch(
            `${ENV.apiUrl}${CONSOLIDATED_ENDPOINT}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            },
          );

          if (retryResponse.ok) {
            const data = await retryResponse.json();

            return processConsolidatedResponse(data);
          }
        }
      }

      throw createError(
        `Failed to fetch followed streams: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return processConsolidatedResponse(data);
  } catch (err) {
    const error = err instanceof Error ? err : createError("Fetch error");

    // Return empty data with error for both platforms
    return {
      twitch: { data: [], error },
      youtube: { data: [], error },
    };
  }
}

/**
 * Processes the response from the consolidated API endpoint
 */
function processConsolidatedResponse(responseData: any): {
  twitch: { data: FollowedStreamer[]; error?: Error };
  youtube: { data: FollowedStreamer[]; error?: Error };
} {
  // Check if responseData is an array (the new format)
  if (Array.isArray(responseData)) {
    const twitchData = responseData.filter(
      (stream) => stream.platform.toLowerCase() === "twitch",
    );
    const youtubeData = responseData.filter(
      (stream) => stream.platform.toLowerCase() === "youtube",
    );

    return {
      twitch: { data: twitchData },
      youtube: { data: youtubeData },
    };
  }

  // Handle legacy format or unexpected format gracefully
  const twitchData = Array.isArray(responseData.twitch)
    ? responseData.twitch.map((stream: any) => ({
        ...stream,
        platform: "twitch",
      }))
    : [];

  const youtubeData = Array.isArray(responseData.youtube)
    ? responseData.youtube.map((stream: any) => ({
        ...stream,
        platform: "youtube",
      }))
    : [];

  return {
    twitch: { data: twitchData },
    youtube: { data: youtubeData },
  };
}
