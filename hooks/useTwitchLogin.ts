import { useMutation } from "@tanstack/react-query";

import { fetchTwitchLoginUrl } from "@/services/fetchLoginUrls";

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
