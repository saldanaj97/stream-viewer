import { StreamsLoadingSkeleton } from "./Loading";

import { StreamGrid } from "@/components/stream-grid/StreamGrid";
import { useTopStreams } from "@/hooks/useTopStreams";

export default function TopStreams() {
  const { data: streams, error, isLoading } = useTopStreams();

  if (isLoading) return <StreamsLoadingSkeleton />;

  if (error) console.log("Error loading streams:", error);

  if (!streams || error) return <div>No streams available</div>;

  return <StreamGrid streams={streams} />;
}
