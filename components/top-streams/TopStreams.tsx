import { Button } from "@heroui/button";
import { useMemo } from "react";

import { StreamsLoadingSkeleton } from "./Loading";
import { PlatformStreamCategory } from "./PlatformStreamCategory";

import { useTopStreams } from "@/hooks/useTopStreams";
import { Stream, StreamPlatform } from "@/types/stream.types";

export default function TopStreams() {
  const { data: streams, error, isFetching, refetch } = useTopStreams();

  const streamsByPlatform = useMemo(() => {
    if (!streams) return null;

    // Group streams by platform
    const grouped: Record<StreamPlatform, Stream[]> = {
      twitch: [],
      youtube: [],
      kick: [],
    };

    // Sort each platform's streams by viewer count
    streams.forEach((stream) => {
      grouped[stream.platform].push(stream);
    });

    // Sort each platform's streams by viewer count
    Object.keys(grouped).forEach((platform) => {
      grouped[platform as StreamPlatform].sort(
        (a, b) => b.viewer_count - a.viewer_count,
      );
    });

    return grouped;
  }, [streams]);

  if (isFetching || !streams || !streamsByPlatform) {
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

  // Check if each platform has streams
  const hasTwitchStreams = streamsByPlatform.twitch.length > 0;
  const hasYoutubeStreams = streamsByPlatform.youtube.length > 0;
  const hasKickStreams = streamsByPlatform.kick.length > 0;

  return (
    <div className="flex w-full flex-col space-y-8 overflow-hidden">
      {hasTwitchStreams && (
        <PlatformStreamCategory
          platform="twitch"
          streams={streamsByPlatform.twitch}
          title="Live channels on Twitch"
        />
      )}

      {hasYoutubeStreams && (
        <PlatformStreamCategory
          platform="youtube"
          streams={streamsByPlatform.youtube}
          title="Live channels on YouTube"
        />
      )}

      {hasKickStreams && (
        <PlatformStreamCategory
          platform="kick"
          streams={streamsByPlatform.kick}
          title="Live channels on Kick"
        />
      )}

      {!hasTwitchStreams && !hasYoutubeStreams && !hasKickStreams && (
        <div className="p-8 text-center">
          <p className="text-xl text-gray-400">
            No live streams available right now
          </p>
        </div>
      )}
    </div>
  );
}
