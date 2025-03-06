import useSWR from "swr";

import { mockTopStreams } from "../../data/mockData";
import { StreamGrid } from "../stream-grid/StreamGrid";

import { StreamsLoadingSkeleton } from "./Loading";
import { Stream } from "./types";

import { authenticatedFetcher } from "@/helpers/fetchers";

export default function TopStreams() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const {
    data: streams,
    error,
    isLoading,
  } = useSWR<Stream[]>(
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

  if (isLoading && !isDevelopment) return <StreamsLoadingSkeleton />;
  if (error) return <div>Error loading streams: {error.message}</div>;
  if (!streams) return <div>No streams available</div>;

  return <StreamGrid streams={streams} />;
}
