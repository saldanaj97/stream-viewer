import { useMutation } from "@tanstack/react-query";

import { fetchTwitchLoginUrl } from "@/services/fetchLoginUrls";
import { initiateTwitchLogout } from "@/services/fetchPlatformLogout";

export const useTwitchLogin = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetchTwitchLoginUrl();

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });

  return mutation;
};

export const useTwitchLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Artificial delay to ensure loading spinner appears
      const response = await initiateTwitchLogout();

      if (response && response.error) {
        throw response.error;
      }

      return response ?? null;
    },
  });

  return mutation;
};
