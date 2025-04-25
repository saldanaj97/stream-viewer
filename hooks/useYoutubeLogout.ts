import { useMutation } from "@tanstack/react-query";

import { initiateYoutubeLogout } from "@/services/fetchPlatformLogout";

export const useYoutubeLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await initiateYoutubeLogout();

      if (response && response.error) {
        throw response.error;
      }

      return response ?? null;
    },
  });

  return mutation;
};
