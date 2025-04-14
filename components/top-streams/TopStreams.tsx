import { Button } from "@heroui/button";

import { StreamsLoadingSkeleton } from "./Loading";

import { StreamGrid } from "@/components/stream-grid/StreamGrid";
import { useTopStreams } from "@/hooks/useTopStreams";

export default function TopStreams() {
  const { data: streams, error, isFetching, refetch } = useTopStreams();

  if (isFetching || !streams) {
    return <StreamsLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
        <div className="mb-2 text-2xl">Something went wrong 😕 </div>
        <p className="text-muted-foreground mb-4">
          We couldn’t load the streams. Please check your connection or try
          again. If this persists, contact support.
        </p>
        <Button onPress={() => refetch()}>Try Again</Button>
        <Button onPress={() => console.log("Contact support")}>
          Contact Support
        </Button>
      </div>
    );
  }

  return (
    <>
      <StreamGrid streams={streams} />
    </>
  );
}
