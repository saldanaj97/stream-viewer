import { StreamsLoadingSkeleton } from "./Loading";

import { StreamGrid } from "@/components/stream-grid/StreamGrid";
import { useTopStreams } from "@/hooks/useTopStreams";

export default function TopStreams() {
  const { data: streams, error, isFetching } = useTopStreams();

  if (isFetching || !streams || streams.length === 0) {
    return <StreamsLoadingSkeleton />;
  }

  if (error) return <div>Error loading streams</div>;

  return <StreamGrid streams={streams} />;
}
