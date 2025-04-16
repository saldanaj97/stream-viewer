"use client";

import Loading from "./loading";

import { StreamGrid } from "@/components/stream-grid/StreamGrid";
import { useFollowedStreams } from "@/hooks/useFollowedStreams";
import { FollowedStreamer } from "@/types/sidebar.types";
import { Stream } from "@/types/stream.types";

export default function FollowingPage() {
  const { twitch, youtube } = useFollowedStreams();

  // Merge whatever data is available
  const followedStreams: FollowedStreamer[] = [
    ...(twitch.data || []),
    ...(youtube.data || []),
  ];

  const isInitialLoading =
    twitch.isLoading && youtube.isLoading && followedStreams.length === 0;

  if (twitch.error && youtube.error) {
    throw twitch.error || youtube.error;
  }

  // Convert FollowedUser array to Stream array
  const streamsForGrid: Stream[] = followedStreams.map(
    (stream: FollowedStreamer) => ({
      ...stream,
      platform: stream.platform.toLowerCase() as any,
    }),
  );

  return (
    <div className="mx-auto p-4">
      <h1 className="my-4 text-2xl font-bold md:text-3xl">Following</h1>

      {isInitialLoading ? (
        <Loading />
      ) : followedStreams.length > 0 ? (
        <StreamGrid streams={streamsForGrid} />
      ) : (
        <div className="rounded-lg bg-gray-800 p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold">
            No followed streams found
          </h3>
          <p className="text-gray-400">
            None of your followed channels are currently live. Check back later
            or follow more channels.
          </p>
        </div>
      )}

      {/* Optionally, show a loading spinner if one platform is still loading */}
      {(twitch.isLoading || youtube.isLoading) &&
        followedStreams.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-400">
            Loading more streams...
          </div>
        )}
    </div>
  );
}
