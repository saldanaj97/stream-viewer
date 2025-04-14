import { useQuery } from "@tanstack/react-query";

import { fetchLoginStatus } from "@/services/fetchLoginStatus";

export const useAuthStatus = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      const { data, error } = await fetchLoginStatus();

      if (error) {
        throw error;
      }

      return data;
    },
  });

  // Default platform state when data is loading or there was an error
  const defaultPlatforms = {
    twitch: false,
    youtube: false,
    kick: false,
  };

  // Convert API response to the expected format
  const platforms = data?.data
    ? {
        twitch: !!data.data.find((p) => p.platform === "Twitch")?.loggedIn,
        youtube: !!data.data.find((p) => p.platform === "Youtube")?.loggedIn,
        kick: !!data.data.find((p) => p.platform === "Kick")?.loggedIn,
      }
    : defaultPlatforms;

  return {
    isLoading,
    error,
    platforms,
    refetch,
  };
};
