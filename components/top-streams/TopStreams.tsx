import useSWR from "swr";

import { StreamGrid } from "../reusable/StreamGrid";

import { StreamsLoadingSkeleton } from "./Loading";
import { Stream } from "./types";

import { authenticatedFetcher } from "@/helpers/fetchers";

export default function TopStreams() {
  const {
    data: streams,
    error,
    isLoading,
  } = useSWR<Stream[]>(
    "http://localhost:8000/api/public/top-streams",
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 3600000,
    },
  );

  if (isLoading) return <StreamsLoadingSkeleton />;
  if (error) return <div>Error loading streams: {error.message}</div>;
  if (!streams) return <div>No streams available</div>;

  return <StreamGrid streams={streams} />;
}
