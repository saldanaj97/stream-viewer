import { StreamGrid } from "../../components/stream-grid/StreamGrid";

import { StreamsLoadingSkeleton } from "./Loading";

import { useTopStreams } from "@/hooks/useTopStreams";

export default function TopStreams() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const { data: streams, error, isLoading } = useTopStreams();

  if (isLoading && !isDevelopment) return <StreamsLoadingSkeleton />;
  if (error) return <div>Error loading streams: {error.message}</div>;
  if (!streams) return <div>No streams available</div>;

  return <StreamGrid streams={streams} />;
}
