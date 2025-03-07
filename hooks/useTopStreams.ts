import useSWR from "swr";

import { Stream } from "@/components/top-streams/types";
import { mockTopStreams } from "@/data/mockData";
import { authenticatedFetcher } from "@/helpers/fetchers";

const isDevelopment = process.env.NODE_ENV === "development";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useTopStreams() {
  return useSWR<Stream[]>(
    isDevelopment ? null : `${apiUrl}/api/public/top-streams`,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 3600000,
      fallbackData: isDevelopment ? mockTopStreams : undefined,
    },
  );
}
