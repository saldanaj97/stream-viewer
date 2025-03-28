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

    const data = await response.json();
    const platformData: FollowedUser[] = (Array.isArray(data) ? data : []).map(
      (user: any) => ({
        ...user,
        platform: platformName,
      }),
    );

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
