import { ENV } from "@/data/env";
import { mockTopStreams } from "@/data/mockStreams";
import { KickStream, Stream, TwitchStream } from "@/types/stream.types";

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

// New function to fetch from both platforms and combine results
export const fetchTopStreams = async (): Promise<Stream[]> => {
  // Use mock data in development
  if (ENV.isDevelopment) {
    // Return double the mock data to simulate having streams from both platforms
    const twitchMocks = mockTopStreams.map((stream) => ({
      ...stream,
      platform: "twitch",
    }));
    const kickMocks = mockTopStreams.map((stream) => ({
      ...stream,
      platform: "kick",
    }));

    return [...twitchMocks, ...kickMocks] as Stream[];
  }

  try {
    // Fetch from both platforms in parallel
    const [twitchStreams, kickStreams] = await Promise.all([
      fetchTopTwitchStreams(),
      fetchTopKickStreams(),
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

    return [...twitchWithPlatform, ...kickWithPlatform];
  } catch (error) {
    console.error("Error fetching top streams:", error);
    throw error;
  }
};
