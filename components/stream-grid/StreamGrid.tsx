import { useState } from "react";

import { StreamCard } from "./StreamCard";

import { Stream, StreamPlatform } from "@/types/stream.types";

// Helper function to generate a consistent key for streams from different platforms
const getStreamKey = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return `twitch-${stream.id}`;
  } else {
    return `kick-${stream.channel_id}`;
  }
};

export const StreamGrid = ({ streams }: { streams: Stream[] }) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<
    "all" | StreamPlatform
  >("all");

  // Filter streams by platform
  const filteredStreams =
    activePlatformFilter === "all"
      ? streams
      : streams.filter((stream) => stream.platform === activePlatformFilter);

  // Sort streams by viewer count in descending order (highest first)
  const sortedStreams = [...filteredStreams].sort(
    (a, b) => b.viewer_count - a.viewer_count,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Platform filter buttons */}
      <div className="mb-2 flex items-center gap-3">
        <span className="text-sm font-medium text-gray-400">Filter by:</span>
        <div className="flex gap-2">
          <button
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activePlatformFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActivePlatformFilter("all")}
          >
            All
          </button>
          <button
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activePlatformFilter === "twitch"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActivePlatformFilter("twitch")}
          >
            Twitch
          </button>
          <button
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activePlatformFilter === "kick"
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActivePlatformFilter("kick")}
          >
            Kick
          </button>
        </div>
      </div>

      {/* Stream grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedStreams.map((stream) => (
          <StreamCard key={getStreamKey(stream)} stream={stream} />
        ))}
      </div>
    </div>
  );
};
