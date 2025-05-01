import { ENV } from "@/data/env";
import { mockTopStreams } from "@/data/mockStreams";
import { Stream } from "@/types/stream.types";

export const fetchTopTwitchStreams = async (): Promise<{
  data: Stream[];
}> => {
  const response = await fetch(`${ENV.apiUrl}/api/twitch/public/top_streams`, {
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
  data: Stream[];
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
  data: Stream[];
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

  // Fetch from all platforms in parallel, ignore failures or empty data
  const results = await Promise.allSettled([
    fetchTopTwitchStreams(),
    fetchTopKickStreams(),
    fetchTopYoutubeStreams(),
  ]);

  const streams: Stream[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      streams.push(...(result.value.data ?? []));
    }
    // failures ignored
  });

  return streams;
};
