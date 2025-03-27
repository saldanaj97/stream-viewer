const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchTwitchTokens(): Promise<{
  data?: any;
  error?: Error | null;
  loggedIn?: boolean;
}> {
  try {
    const data = await fetch(`${apiUrl}/api/twitch/login`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    });

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

export async function fetchKickLoginUrl(): Promise<{
  data?: any;
  error?: Error | null;
  loggedIn?: boolean;
}> {
  try {
    const data = await fetch(`${apiUrl}/api/kick/oauth`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    });

    return { data };
  } catch (err) {
    const error =
      err instanceof Error
        ? err
        : new Error("An error occurred while fetching the Kick login URL");

    return { data: [], error };
  }
}
