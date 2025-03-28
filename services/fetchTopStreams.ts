import { ENV } from "@/data/env";
import { mockTopStreams } from "@/data/mockStreams";
import { Stream } from "@/types/stream.types";

export const fetchTopStreams = async (authData: {
  access_token: string;
}): Promise<Stream[]> => {
  // Use mock data in development
  if (ENV.isDevelopment) {
    return mockTopStreams;
  }

  const response = await fetch(`${ENV.apiUrl}/api/twitch/public/top-streams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${authData?.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
