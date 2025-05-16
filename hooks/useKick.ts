import { useQuery } from "@tanstack/react-query";

import { fetchKickLoginUrl } from "@/services/fetchLoginUrls";

interface KickLoginOptions {
  enabled?: boolean;
}

export const useKickLogin = (options: KickLoginOptions = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["kickLogin"],
    queryFn: async () => {
      const response = await fetchKickLoginUrl();

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    enabled: options.enabled !== false, // Defaults to true if not specified
  });

  return { data, isLoading, error };
};
