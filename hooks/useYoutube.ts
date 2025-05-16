import { useMutation } from "@tanstack/react-query";

import { fetchYoutubeLoginUrl } from "@/services/fetchLoginUrls";
import { initiateYoutubeLogout } from "@/services/fetchPlatformLogout";

export const useYoutubeLogin = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetchYoutubeLoginUrl();

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });

  return mutation;
};

export const useYoutubeLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Artificial delay to ensure loading spinner appears

      const response = await initiateYoutubeLogout();

      if (response && response.error) {
        throw response.error;
      }

      return response ?? null;
    },
  });

  return mutation;
};
