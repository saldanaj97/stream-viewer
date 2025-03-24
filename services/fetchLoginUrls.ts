import { getAuthToken } from "./getAuthToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchTwitchTokens(): Promise<{
  data?: any;
  error?: Error | null;
  loggedIn?: boolean;
}> {
  const auth_token = await getAuthToken("twitch_auth_token");

  // Check if a user is logged in already
  if (auth_token) {
    return { data: [], loggedIn: true };
  }
  try {
    const data = await fetch(`${apiUrl}/api/twitch/auth/login`).then(
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
  loggedIn?: boolean;
}> {
  const auth_token = await getAuthToken("youtube_auth_token");

  // Check if a user is logged in already
  if (auth_token) {
    return { data: [], loggedIn: true };
  }

  try {
    const data = await fetch(`${apiUrl}/api/google/authorize`).then(
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
