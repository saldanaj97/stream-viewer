import { StreamCard } from "./StreamCard";

import { KickStream, Stream, TwitchStream } from "@/types/stream.types";

// Helper function to generate a consistent key for streams from different platforms
const getStreamKey = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return `twitch-${(stream as TwitchStream & { platform: "twitch" }).id}`;
  } else {
    // For Kick, we'll use channel_id as the key
    return `kick-${(stream as KickStream & { platform: "kick" }).channel_id}`;
  }
};

export const StreamGrid = ({ streams }: { streams: Stream[] }) => {
  // Sort streams by viewer count in descending order (highest first)
  const sortedStreams = [...streams].sort(
    (a, b) => b.viewer_count - a.viewer_count,
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedStreams.map((stream) => (
        <StreamCard key={getStreamKey(stream)} stream={stream} />
      ))}
    </div>
  );
};
