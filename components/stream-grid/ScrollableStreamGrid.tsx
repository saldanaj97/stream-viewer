import { ScrollShadow } from "@heroui/scroll-shadow";
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
      <div className="relative w-full">
        <ScrollShadow
          className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent flex snap-x gap-4 overflow-x-auto pb-4"
          orientation="horizontal"
        >
          {sortedStreams.map((stream) => (
            <div
              key={getStreamKey(stream)}
              className="min-w-[360px] max-w-[640px] snap-start"
            >
              <StreamCard stream={stream} />
            </div>
          ))}
        </ScrollShadow>
      </div>
    </div>
  );
};
