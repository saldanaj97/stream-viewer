import { useEffect, useState } from "react";

import { fetchTwitchTokens } from "@/services/fetchTwitchTokens";

interface TwitchLoginResponse {
  url: string | null;
  error: Error | null;
  loggedIn?: boolean;
}

export const useTwitchLoginAuth = () => {
  const [data, setData] = useState<TwitchLoginResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    const fetchAuthData = async () => {
      try {
        const { data, error, loggedIn } = await fetchTwitchTokens();

        if (controller.signal.aborted) return;

        if (error) {
          setError(error);
        } else {
          setIsLoggedIn(loggedIn ?? false);
          setData(data);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(() =>
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchAuthData();

    return () => controller.abort();
  }, []);

  return { data, error, isLoading, isLoggedIn };
};
