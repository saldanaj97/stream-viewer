import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import SidebarToggle from "../SidebarToggle";
import { platformData } from "../platforms";

import { FollowedUser, PlatformKey } from "@/types/sidebar.types";

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

  const platforms = Object.keys(streamsByPlatform) as PlatformKey[];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row justify-center">
        <SidebarToggle />
      </div>
      {/* Platform icons with streams */}
      {platforms.map((platform: PlatformKey) => {
        const platformStreams = streamsByPlatform[platform] || [];
        // Take only top streams based on view count (already sorted)
        const topStreams = platformStreams.slice(0, 5);

        return (
          <div
            key={platform}
            className="relative flex flex-col items-center space-y-2"
          >
            <div className="relative">
              <div className="mb-1 h-10 w-10 overflow-hidden rounded-full">
                {/* Platform-specific icon based on platform name */}
                <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-neutral-300">
                  {platformData[platform]?.icon}
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

            {/* Top streams for this platform */}
            <div className="flex flex-col items-center space-y-4">
              {topStreams.map((stream) => (
                <Link
                  key={`${stream.platform}-${stream.user_id}`}
                  className="relative block"
                  href={`/watch/${stream.platform.toLowerCase()}/${stream.user_login}`}
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-neutral-800 hover:border-neutral-700">
                    {stream.thumbnail_url ? (
                      <Image
                        alt={stream.user_name}
                        className="object-cover"
                        height={28}
                        src={stream.thumbnail_url}
                        width={28}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-700 text-xs">
                        {stream.user_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  {stream.type === "live" && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {/* Loading state for collapsed sidebar */}
      {followedStreams.length === 0 && isLoading && (
        <div className="flex items-center justify-center py-4">
          <LoaderCircle className="animate-spin text-neutral-400" size={20} />
        </div>
      )}
    </div>
  );
}
