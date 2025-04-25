import { useMutation } from "@tanstack/react-query";

import { initiateTwitchLogout } from "@/services/fetchPlatformLogout";

export const useTwitchLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await initiateTwitchLogout();

      if (response && response.error) {
        throw response.error;
      }

      return response ?? null;
    },
  });

  return mutation;
};
