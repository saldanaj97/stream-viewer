import { createError } from "./createError";

import { ENV } from "@/data/env";
import { mockFollowedStreams } from "@/data/mockStreams";
import { FollowedUser } from "@/types/sidebar.types";

/**
 * Attempts to refresh tokens for a specific platform
 * @param platform The platform to refresh tokens for (twitch, youtube, kick)
 * @returns Object containing success status and any error
 */
async function refreshTokenForPlatform(
  platform: "twitch" | "youtube" | "kick",
): Promise<{ success: boolean; error?: string }> {
  try {
    // Different endpoints for each platform
    const endpoints = {
      twitch: `${ENV.apiUrl}/api/twitch/oauth/refresh`,
      youtube: `${ENV.apiUrl}/api/google/oauth/refresh`,
      kick: `${ENV.apiUrl}/api/kick/oauth/refresh`,
    };

    const response = await fetch(endpoints[platform], {
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
  endpoint: string,
  platformName: string,
): Promise<{ data: FollowedUser[]; error?: Error }> {
  // Development mode mock data
  if (ENV.isDevelopment) {
    const mockStreams = mockFollowedStreams.filter(
      (stream) => stream.platform === platformName,
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
      const platform = platformName.toLowerCase() as
        | "twitch"
        | "youtube"
        | "kick";
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

          // Extract the data array from the response, handling both direct arrays and nested data
          const rawData = Array.isArray(responseData)
            ? responseData
            : responseData.data || [];

          // Special handling for YouTube data structure
          if (platformName === "YouTube") {
            const platformData: FollowedUser[] = rawData.map((item: any) => {
              const livestreamInfo = item.livestream_info || {};

              return {
                id: livestreamInfo.vid || "",
                user_id:
                  livestreamInfo.cid ||
                  item.snippet?.resourceId?.channelId ||
                  "",
                user_login: item.snippet?.title || "",
                user_name: item.snippet?.title || "",
                game_id: "", // YouTube doesn't provide game ID
                game_name: "", // YouTube doesn't provide game name
                type: livestreamInfo.live ? "live" : "offline",
                title: livestreamInfo.title || "",
                viewer_count: livestreamInfo.viewer_count || 0, // Use the viewer count from YouTube API
                started_at:
                  livestreamInfo.actualStartTime ||
                  livestreamInfo.scheduledStartTime ||
                  "",
                language: "en", // Default as YouTube doesn't provide this
                thumbnail_url:
                  livestreamInfo.thumbnail ||
                  item.snippet?.thumbnails?.high?.url ||
                  "",
                tag_ids: [], // YouTube doesn't provide tags in this format
                tags: [], // YouTube doesn't provide tags in this format
                is_mature: false, // YouTube doesn't provide this info via this endpoint
                platform: platformName,
              };
            });

            return { data: platformData };
          }

          // Default handling for other platforms (e.g., Twitch)
          const platformData: FollowedUser[] = rawData.map((user: any) => ({
            ...user,
            platform: platformName,
          }));

          return { data: platformData };
        }
      }

      // If refresh failed, throw error
      throw new Error(
        `Authentication expired for ${platformName}. Please log in again.`,
      );
    }

    if (!response.ok) {
      throw createError(
        `Failed to fetch ${platformName} live streams: ${response.status} ${response.statusText}`,
      );
    }

    const responseData = await response.json();

    // Extract the data array from the response, handling both direct arrays and nested data
    const rawData = Array.isArray(responseData)
      ? responseData
      : responseData.data || [];

    // Special handling for YouTube data structure
    if (platformName === "YouTube") {
      const platformData: FollowedUser[] = rawData.map((item: any) => {
        const livestreamInfo = item.livestream_info || {};

        return {
          id: livestreamInfo.vid || "",
          user_id:
            livestreamInfo.cid || item.snippet?.resourceId?.channelId || "",
          user_login: item.snippet?.title || "",
          user_name: item.snippet?.title || "",
          game_id: "", // YouTube doesn't provide game ID
          game_name: "", // YouTube doesn't provide game name
          type: livestreamInfo.live ? "live" : "offline",
          title: livestreamInfo.title || "",
          viewer_count: livestreamInfo.viewer_count || 0, // Use the viewer count from YouTube API
          started_at:
            livestreamInfo.actualStartTime ||
            livestreamInfo.scheduledStartTime ||
            "",
          language: "en", // Default as YouTube doesn't provide this
          thumbnail_url:
            livestreamInfo.thumbnail ||
            item.snippet?.thumbnails?.high?.url ||
            "",
          tag_ids: [], // YouTube doesn't provide tags in this format
          tags: [], // YouTube doesn't provide tags in this format
          is_mature: false, // YouTube doesn't provide this info via this endpoint
          platform: platformName,
        };
      });

      return { data: platformData };
    }

    // Default handling for other platforms (e.g., Twitch)
    const platformData: FollowedUser[] = rawData.map((user: any) => ({
      ...user,
      platform: platformName,
    }));

    return { data: platformData };
  } catch (err) {
    const error =
      err instanceof Error ? err : createError(`${platformName} fetch error`);

    return { data: [], error };
  }
}

// Export these functions to allow platform-specific fetching
export async function fetchLiveFollowedTwitchStreams() {
  return fetchPlatformStreams("/api/twitch/following", "Twitch");
}

export async function fetchLiveSubscribedYoutubeStreams() {
  return fetchPlatformStreams("/api/google/subscriptions/live", "YouTube");
}

// Currently, Kick is not included in the live followed streams fetch since there is no public API call
// async function fetchLiveFollowedKickStreams() {
//   return fetchPlatformStreams("/api/kick/user/following", "Kick");
// }

/**
 * Fetches all followed/subscribed live streams simultaneously
 * @returns Combined array of followed streams from all platforms
 */
export async function fetchFollowedStreamsLive() {
  // Development mode shortcut
  if (ENV.isDevelopment) {
    return { data: mockFollowedStreams };
  }

  // Parallel fetch with comprehensive error handling
  const [twitchResult, youtubeResult] = await Promise.all([
    fetchLiveFollowedTwitchStreams(),
    fetchLiveSubscribedYoutubeStreams(),
  ]);

  // Collect errors with platform-specific identification
  const errors: Record<string, Error> = {};

  if (twitchResult.error) errors.twitch = twitchResult.error;
  if (youtubeResult.error) errors.youtube = youtubeResult.error;

  // Combine data with optional error reporting
  return {
    data: [...twitchResult.data, ...youtubeResult.data],
    ...(Object.keys(errors).length > 0 ? { errors } : {}),
  };
}
