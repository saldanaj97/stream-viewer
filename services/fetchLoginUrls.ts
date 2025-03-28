import { ENV } from "@/data/env";
import { mockLoginUrls } from "@/data/mockPlatformAuth";

export async function fetchTwitchLoginUrl(): Promise<{
  data?: any;
  error?: Error | null;
}> {
  // Return mock data in development mode
  if (ENV.isDevelopment) {
    return { data: mockLoginUrls.twitch };
  }

  try {
    const data = await fetch(`${ENV.apiUrl}/api/twitch/login`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      },
    );

    return { data };
  } catch (err) {
    const error = err instanceof Error ? err : new Error("An error occurred");

    return { data: [], error };
  }
}

export async function fetchYoutubeLoginUrl(): Promise<{
  data?: any;
  error?: Error | null;
}> {
  // Return mock data in development mode
  if (ENV.isDevelopment) {
    return { data: mockLoginUrls.youtube };
  }

  try {
    const data = await fetch(`${ENV.apiUrl}/api/google/authorize`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      },
    );

    return { data };
  } catch (err) {
    const error = err instanceof Error ? err : new Error("An error occurred");

    return { data: [], error };
  }
}

export async function fetchKickLoginUrl(): Promise<{
  data?: any;
  error?: Error | null;
}> {
  // Return mock data in development mode
  if (ENV.isDevelopment) {
    return { data: mockLoginUrls.kick };
  }

  try {
    const data = await fetch(`${ENV.apiUrl}/api/kick/oauth`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      },
    );

    return { data };
  } catch (err) {
    const error =
      err instanceof Error
        ? err
        : new Error("An error occurred while fetching the Kick login URL");

    return { data: [], error };
  }
}
