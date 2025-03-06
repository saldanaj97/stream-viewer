import useSWR from "swr";

import { StreamCard } from "../reusable/StreamCard";

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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {streams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
}
