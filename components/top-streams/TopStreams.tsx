import { Button } from "@heroui/button";

import { StreamsLoadingSkeleton } from "./Loading";
import { PlatformStreamCategory } from "./PlatformStreamCategory";

import { useTopStreams } from "@/hooks/useStreams";

export default function TopStreams() {
  const {
    data: streamsByPlatform,
    error,
    isPending,
    refetch,
  } = useTopStreams();

  if (isPending) {
    return <StreamsLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
        <div className="mb-2 text-2xl">Something went wrong 😕 </div>
        <p className="text-muted-foreground mb-4">
          We couldn&apos;t load the streams. Please check your connection or try
          again. If this persists, contact support.
        </p>
        <Button onPress={() => refetch()}>Try Again</Button>
        <Button onPress={() => console.log("Contact support")}>
          Contact Support
        </Button>
      </div>
    );
  }

  // Sort each platform's streams by viewer count (descending)
  const twitchStreams = [...streamsByPlatform.twitch].sort(
    (a, b) => b.viewer_count - a.viewer_count,
  );
  const youtubeStreams = [...streamsByPlatform.youtube].sort(
    (a, b) => b.viewer_count - a.viewer_count,
  );
  const kickStreams = [...streamsByPlatform.kick].sort(
    (a, b) => b.viewer_count - a.viewer_count,
  );

  const hasTwitchStreams = twitchStreams.length > 0;
  const hasYoutubeStreams = youtubeStreams.length > 0;
  const hasKickStreams = kickStreams.length > 0;

  return (
    <section className="flex w-full flex-col space-y-4 overflow-hidden">
      <h1 className="text-2xl font-bold md:text-3xl">Top Streams</h1>
      <div className="w-full">
        {hasTwitchStreams && (
          <PlatformStreamCategory
            platform="twitch"
            streams={twitchStreams}
            title="Live channels on Twitch"
          />
        )}
        {hasYoutubeStreams && (
          <PlatformStreamCategory
            platform="youtube"
            streams={youtubeStreams}
            title="Live channels on YouTube"
          />
        )}
        {hasKickStreams && (
          <PlatformStreamCategory
            platform="kick"
            streams={kickStreams}
            title="Live channels on Kick"
          />
        )}
        {!hasTwitchStreams && !hasYoutubeStreams && !hasKickStreams && (
          <div className="p-8 text-center">
            <p className="text-xl text-neutral-400">
              No live streams available right now
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
