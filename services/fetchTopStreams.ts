import { ENV } from "@/data/env";
import { mockTopStreams } from "@/data/mockStreams";
import {
  KickStream,
  Stream,
  TwitchStream,
  YouTubeStream,
} from "@/types/stream.types";

export const fetchTopTwitchStreams = async (): Promise<{
  data: TwitchStream[];
}> => {
  const response = await fetch(`${ENV.apiUrl}/api/twitch/public/top-streams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error while fetching Top Twitch Streams. Status: ${response.status}`,
    );
  }

  return response.json();
};

export const fetchTopKickStreams = async (): Promise<{
  data: KickStream[];
}> => {
  const response = await fetch(`${ENV.apiUrl}/api/kick/public/top_streams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error while fetching Top Kick Streams. Status: ${response.status}`,
    );
  }

  return response.json();
};

export const fetchTopYoutubeStreams = async (): Promise<{
  data: YouTubeStream[];
}> => {
  const response = await fetch(`${ENV.apiUrl}/api/google/public/top_streams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error while fetching Top YouTube Streams. Status: ${response.status}`,
    );
  }

  return response.json();
};

// New function to fetch from both platforms and combine results
export const fetchTopStreams = async (): Promise<Stream[]> => {
  // Return mock data in development environment
  if (ENV.isDevelopment) {
    return mockTopStreams as Stream[];
  }

  try {
    // Fetch from all platforms in parallel
    const [twitchStreams, kickStreams, youtubeStreams] = await Promise.all([
      fetchTopTwitchStreams(),
      fetchTopKickStreams(),
      fetchTopYoutubeStreams(),
    ]);

    const twitchWithPlatform = twitchStreams["data"].map(
      (stream: TwitchStream) => ({
        ...stream,
        platform: "twitch",
        // Ensure thumbnail field exists for unified interface
        thumbnail: stream.thumbnail_url,
      }),
    ) as Stream[];

    const kickWithPlatform = kickStreams["data"].map((stream: KickStream) => ({
      ...stream,
      // Map stream_title to title for unified interface
      title: stream.stream_title,
      platform: "kick",
    })) as Stream[];

    const youtubeWithPlatform = youtubeStreams["data"].map(
      (stream: YouTubeStream) => ({
        ...stream,
        platform: "youtube",
        // Ensure thumbnail field exists for unified interface
        thumbnail: stream.thumbnail_url,
      }),
    ) as Stream[];

    return [...twitchWithPlatform, ...kickWithPlatform, ...youtubeWithPlatform];
  } catch (error) {
    console.log("Error fetching top streams:", error);
    throw error;
  }
};
