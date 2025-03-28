import { ENV } from "@/data/env";

export async function fetchTwitchLoginUrl(): Promise<{
  data?: any;
  error?: Error | null;
}> {
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
