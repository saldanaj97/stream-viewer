import { useQuery } from "@tanstack/react-query";

import { fetchYoutubeLoginUrl } from "@/services/fetchLoginUrls";

interface YoutubeLoginOptions {
  enabled?: boolean;
}

export const useYoutubeLogin = (options: YoutubeLoginOptions = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["youtubeLogin"],
    queryFn: async () => {
      const response = await fetchYoutubeLoginUrl();

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    enabled: options.enabled !== false, // Defaults to true if not specified
  });

  return { data, isLoading, error };
};
