import { StreamCard } from "./StreamCard";

import { Stream } from "@/features/top-streams/types";

export const StreamGrid = ({ streams }: { streams: Stream[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {streams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
};
