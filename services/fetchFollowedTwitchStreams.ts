import { mockFollowedStreams } from "@/data/mockData";
import { FollowedTwitchUser, PlatformKey } from "@/types/sidebar.types";

const isDevelopment = process.env.NODE_ENV === "development";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchFollowedTwitchStreams(
  platform: PlatformKey,
): Promise<{
  data: FollowedTwitchUser[];
  error?: Error;
}> {
  if (isDevelopment) {
    return { data: mockFollowedStreams };
  }

  try {
    const response = await fetch(`${apiUrl}/api/twitch/following`, {
      credentials: "include",
      next: { revalidate: 60 }, // Optional: revalidate cache every minute
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          data: [],
          error: new Error("Authentication required. Please log in."),
        };
      }
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    // Add platform to each followed user for filtering
    const dataWithPlatform: FollowedTwitchUser[] = data.map((user: any) => ({
      ...user,
      platform: platform,
    }));

    return { data: dataWithPlatform };
  } catch (err) {
    const error = err instanceof Error ? err : new Error("An error occurred");

    return { data: [], error };
  }
}
