import { useQuery } from "@tanstack/react-query";

import { fetchTwitchLoginUrl } from "@/services/fetchLoginUrls";

interface TwitchLoginOptions {
  enabled?: boolean;
}

export const useTwitchLogin = (options: TwitchLoginOptions = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["twitchLogin"],
    queryFn: async () => {
      const response = await fetchTwitchLoginUrl();

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    enabled: options.enabled !== false, // Defaults to true if not specified
  });

  return { data, isLoading, error };
};
