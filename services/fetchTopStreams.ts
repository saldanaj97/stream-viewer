import { ENV } from "@/data/env";
import { mockTopStreams } from "@/data/mockStreams";
import { Stream, StreamPlatform } from "@/types/stream.types";

// New function to fetch from the unified backend endpoint
export const fetchTopStreams = async (): Promise<
  Record<StreamPlatform, Stream[]>
> => {
  // Return mock data in development environment
  if (ENV.isDevelopment) {
    // Group mock data by platform
    const grouped: Record<StreamPlatform, Stream[]> = {
      twitch: [],
      youtube: [],
      kick: [],
    };

    mockTopStreams.forEach((stream) => {
      grouped[stream.platform].push(stream);
    });

    return grouped;
  }

  const response = await fetch(`${ENV.apiUrl}/api/top_streams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error while fetching Top Streams. Status: ${response.status}`,
    );
  }

  // The backend returns { twitch: Stream[], kick: Stream[], youtube: Stream[] }
  return response.json();
};
