import { useMemo } from "react";

import { StreamCard } from "./StreamCard";
import { getStreamKey } from "./utils";

import { Stream } from "@/types/stream.types";

interface ScrollableStreamGridProps {
  streams: Stream[];
  title?: string;
  maxVisibleCards?: number;
}

export const ScrollableStreamGrid = ({
  streams,
  title,
}: ScrollableStreamGridProps) => {
  // Sort streams by viewer count in descending order (highest first)
  const sortedStreams = useMemo(() => {
    return [...streams].sort((a, b) => b.viewer_count - a.viewer_count);
  }, [streams]);

  return (
    <div className="w-full">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}

      {/* Container that adapts to available space */}
      <div className="relative w-full">
        {/* Scrollable area with cards */}
        <div className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent flex snap-x gap-4 overflow-x-auto pb-4">
          {sortedStreams.map((stream) => (
            <div
              key={getStreamKey(stream)}
              className="min-w-[280px] max-w-[280px] snap-start"
            >
              <StreamCard stream={stream} />
            </div>
          ))}
        </div>

        {/* Fade effect on the right edge to hint at more content */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-900 to-transparent" />
      </div>
    </div>
  );
};
