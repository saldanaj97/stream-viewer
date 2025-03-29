import { createError } from "./createError";

import { ENV } from "@/data/env";
import { mockFollowedStreams } from "@/data/mockStreams";
import { FollowedUser } from "@/types/sidebar.types";

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
      credentials: "include",
    });

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
          viewer_count: 0, // YouTube API doesn't return viewer count via this endpoint
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

export async function fetchLiveFollowedTwitchStreams() {
  return fetchPlatformStreams("/api/twitch/following", "Twitch");
}

export async function fetchLiveSubscribedYoutubeStreams() {
  return fetchPlatformStreams("/api/google/subscriptions/live", "YouTube");
}

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
