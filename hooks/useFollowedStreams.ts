import useSWR from "swr";

import { FollowedUser } from "@/components/sidebar/types";
import { mockFollowedStreams } from "@/data/mockData";
import { authenticatedFetcher } from "@/helpers/fetchers";

const isDevelopment = process.env.NODE_ENV === "development";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useFollowedStreams() {
  return useSWR<FollowedUser[]>(
    isDevelopment ? null : `${apiUrl}/api/user/top-streams`,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 3600000,
      fallbackData: isDevelopment ? mockFollowedStreams : undefined,
    },
  );
}
