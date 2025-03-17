import { getAuthToken } from "./getAuthToken";

import { mockFollowedStreams } from "@/data/mockData";
import { FollowedUser } from "@/types/sidebar.types";

const isDevelopment = process.env.NODE_ENV === "development";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchFollowedStreams(): Promise<{
  data: FollowedUser[];
  error?: Error;
  platform?: string;
}> {
  if (isDevelopment) {
    return { data: mockFollowedStreams };
  }

  try {
    const auth_token = await getAuthToken();

    if (!auth_token) {
      return { data: [], error: new Error("No auth token found") };
    }

    const response = await fetch(`${apiUrl}/api/user/following`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth_token.value}`,
      },
      next: { revalidate: 60 }, // Optional: revalidate cache every minute
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: FollowedUser[] = await response.json();

    // Add platform to each followed user for filtering and sorting
    const platform: "Twitch" | "YouTube" | "Kick" = "Twitch";
    const dataWithPlatform = data.map((user) => ({
      ...user,
      platform,
    }));

    return { data: dataWithPlatform, platform };
  } catch (err) {
    const error = err instanceof Error ? err : new Error("An error occurred");

    return { data: [], error };
  }
}
