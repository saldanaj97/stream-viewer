const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type PlatformLoginStatus = {
  platform: "Twitch" | "Youtube" | "Kick";
  loggedIn: boolean;
};

interface LoginStatusResponse {
  data: PlatformLoginStatus[];
  error?: Error | null;
}

export const fetchLoginStatus = async (): Promise<{
  data?: LoginStatusResponse;
  error?: Error | null;
}> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/status`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error("An error occurred");

    return { data: undefined, error };
  }
};
