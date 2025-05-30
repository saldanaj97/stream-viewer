import { useMemo, useState } from "react";

import { PlatformTabs } from "./PlatformTabs";
import { StreamCard } from "./StreamCard";
import { getStreamKey } from "./utils";

import { Stream, StreamPlatform } from "@/types/stream.types";

export const StreamGrid = ({ streams }: { streams: Stream[] }) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<
    "all" | StreamPlatform
  >("all");

  // Filter streams by platform and language
  const filteredStreams = useMemo(() => {
    return streams.filter((stream) => {
      const matchesPlatform =
        activePlatformFilter === "all" ||
        stream.platform === activePlatformFilter;

      return matchesPlatform;
    });
  }, [streams, activePlatformFilter]);

  // Sort streams by viewer count in descending order (highest first)
  const sortedStreams = useMemo(() => {
    return [...filteredStreams].sort((a, b) => b.viewer_count - a.viewer_count);
  }, [filteredStreams]);

  return (
    <div className="flex flex-col gap-4">
      <PlatformTabs
        activePlatformFilter={activePlatformFilter}
        setActivePlatformFilter={setActivePlatformFilter}
      />

      {/* Stream grid */}
      <div>
        {activePlatformFilter === "kick" ? (
          <div className="rounded-lg border border-neutral-700 bg-neutral-800/30 p-6 text-center">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
              Kick Integration Coming Soon
            </h3>
            <p className="mt-2 text-neutral-700 dark:text-neutral-400">
              Kick integration is not yet implemented due to public API
              restrictions. We&apos;re working on adding this feature in the
              future.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedStreams.length > 0 ? (
              sortedStreams.map((stream) => (
                <StreamCard key={getStreamKey(stream)} {...stream} />
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-neutral-400">
                No streams found for the selected platform.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
