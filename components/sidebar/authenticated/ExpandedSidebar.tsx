import { ChevronDown, ChevronUp, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import SidebarToggle from "../SidebarToggle";

import { FollowedUser } from "@/types/sidebar.types";

export default function ExpandedSidebar({
  followedStreams,
  isLoading,
  platformLoadingStates,
}: {
  followedStreams: FollowedUser[];
  isLoading: boolean;
  platformLoadingStates: Record<string, boolean>;
}) {
  // State to track expanded platforms (showing more than 5 streams)
  const [expandedPlatforms, setExpandedPlatforms] = useState<
    Record<string, boolean>
  >({});

  // Toggle expanded state for a platform
  const toggleExpandPlatform = (platform: string) => {
    setExpandedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  // Sort streams by view count
  const sortedStreams = useMemo(() => {
    return [...followedStreams].sort((a, b) => b.viewer_count - a.viewer_count);
  }, [followedStreams]);

  // Group streams by platform
  const streamsByPlatform = useMemo(() => {
    // Create groups
    const groups: Record<string, FollowedUser[]> = {};

    // Group streams by platform
    sortedStreams.forEach((stream) => {
      const platform = stream.platform || "Other";

      if (!groups[platform]) {
        groups[platform] = [];
      }
      groups[platform].push(stream);
    });

    return groups;
  }, [sortedStreams]);

  const platforms = Object.keys(streamsByPlatform);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold text-neutral-200">
          Followed Channels
        </h3>
        <SidebarToggle />
      </div>

      {/* If no streams and still fully loading, show full loading state */}
      {followedStreams.length === 0 && isLoading && (
        <div className="flex flex-col items-center justify-center py-4">
          <LoaderCircle className="animate-spin text-neutral-400" size={24} />
          <span className="mt-2 text-sm text-neutral-400">
            Loading streams...
          </span>
        </div>
      )}

      {/* Display available streams grouped by platform */}
      {platforms.length > 0 && (
        <div className="flex flex-col space-y-4">
          {platforms.map((platform) => {
            const streams = streamsByPlatform[platform];
            const hasMoreThanFive = streams.length > 5;
            const isExpanded = expandedPlatforms[platform] || false;
            const visibleStreams = isExpanded ? streams : streams.slice(0, 5);

            return (
              <div key={platform} className="flex flex-col space-y-2">
                <h4 className="flex items-center text-sm font-medium text-neutral-400">
                  {platform}
                  {/* Show loading indicator if this platform is still loading */}
                  {platformLoadingStates[platform.toLowerCase()] && (
                    <LoaderCircle className="ml-2 animate-spin" size={14} />
                  )}
                </h4>
                <ul className="flex flex-col space-y-2">
                  {visibleStreams.map((stream) => (
                    <li key={`${stream.platform}-${stream.user_id}`}>
                      <Link
                        className="flex items-center rounded-md p-2 hover:bg-neutral-800"
                        href={`/watch/${stream.platform.toLowerCase()}/${stream.user_login}`}
                      >
                        {stream.thumbnail_url && (
                          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                            <img
                              alt={stream.user_name}
                              className="h-full w-full object-cover"
                              src={stream.thumbnail_url}
                            />
                          </div>
                        )}
                        <div className="flex flex-col truncate">
                          <span className="truncate font-medium text-neutral-100">
                            {stream.user_name}
                          </span>
                          <span className="truncate text-xs text-neutral-400">
                            {stream.type === "live" ? (
                              <>
                                <span className="text-red-500">● </span>
                                {stream.game_name || "Streaming"} •{" "}
                                {stream.viewer_count.toLocaleString()} viewers
                              </>
                            ) : (
                              <>Offline</>
                            )}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Show/hide button if there are more than 5 streams */}
                {hasMoreThanFive && (
                  <button
                    className="flex items-center justify-center text-xs text-neutral-400 hover:text-neutral-200"
                    onClick={() => toggleExpandPlatform(platform)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="mr-1" size={14} />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-1" size={14} />
                        Show {streams.length - 5} more
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Show empty state if no streams and not loading */}
      {followedStreams.length === 0 && !isLoading && (
        <p className="text-sm text-neutral-400">
          No followed channels are live right now.
        </p>
      )}
    </div>
  );
}
