import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";

import SidebarToggle from "../SidebarToggle";

import { FollowedUser } from "@/types/sidebar.types";

export default function CollapsedSidebar({
  followedStreams,
  isLoading,
  platformLoadingStates,
}: {
  followedStreams: FollowedUser[];
  isLoading: boolean;
  platformLoadingStates: Record<string, boolean>;
}) {
  // Sort streams by view count
  const sortedStreams = useMemo(() => {
    return [...followedStreams].sort((a, b) => b.viewer_count - a.viewer_count);
  }, [followedStreams]);

  // Group streams by platform
  const streamsByPlatform = useMemo(() => {
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
      <div className="flex flex-row justify-center">
        <SidebarToggle />
      </div>
      {/* Platform icons */}
      {platforms.map((platform) => (
        <div key={platform} className="relative flex flex-col items-center">
          <div className="mb-1 h-10 w-10 overflow-hidden rounded-full">
            {/* Platform-specific icon based on platform name */}
            <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-neutral-300">
              {platform.charAt(0)}
            </div>
          </div>
          {/* Platform-specific loading indicator */}
          {platformLoadingStates[platform.toLowerCase()] && (
            <LoaderCircle
              className="absolute -right-1 -top-1 animate-spin"
              size={14}
            />
          )}
        </div>
      ))}

      {/* Loading state for collapsed sidebar */}
      {followedStreams.length === 0 && isLoading && (
        <div className="flex items-center justify-center py-4">
          <LoaderCircle className="animate-spin text-neutral-400" size={20} />
        </div>
      )}
    </div>
  );
}
