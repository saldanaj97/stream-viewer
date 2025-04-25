import { useMutation } from "@tanstack/react-query";

import { fetchYoutubeLoginUrl } from "@/services/fetchLoginUrls";

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
