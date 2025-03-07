import useSWR from "swr";

import { authFetcher } from "@/helpers/fetchers";

export const usePublicAuth = () => {
  return useSWR("http://localhost:8000/api/auth/", authFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 3600000,
  });
};
