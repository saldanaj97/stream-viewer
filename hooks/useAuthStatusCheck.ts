import { useEffect, useState } from "react";

import { fetchLoginStatus } from "@/services/fetchLoginStatus";

type AuthStatusState = {
  isLoading: boolean;
  error: Error | null;
  platforms: {
    twitch: boolean;
    youtube: boolean;
    kick: boolean;
  };
};

export const useAuthStatus = () => {
  const [state, setState] = useState<AuthStatusState>({
    isLoading: true,
    error: null,
    platforms: {
      twitch: false,
      youtube: false,
      kick: false,
    },
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlatformsAuthStatus = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const { data, error } = await fetchLoginStatus();

        if (controller.signal.aborted) return;

        if (error) {
          setState((prev) => ({ ...prev, error, isLoading: false }));
        } else if (data?.data) {
          // Convert array of statuses to a cleaner object format
          const platforms = {
            twitch: !!data.data.find((p) => p.platform === "Twitch")?.loggedIn,
            youtube: !!data.data.find((p) => p.platform === "Youtube")
              ?.loggedIn,
            kick: !!data.data.find((p) => p.platform === "Kick")?.loggedIn,
          };

          setState({ isLoading: false, error: null, platforms });
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");

        setState((prev) => ({ ...prev, error, isLoading: false }));
      }
    };

    fetchPlatformsAuthStatus();

    return () => controller.abort();
  }, []);

  return state;
};
