import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import SidebarToggle from "../SidebarToggle";
import { platformData } from "../platforms";

import {
  FollowedStream,
  FollowedStreamer,
  PlatformKey,
} from "@/types/sidebar.types";

export default function CollapsedSidebar({
  twitch,
  youtube,
}: {
  twitch: FollowedStream["twitch"];
  youtube: FollowedStream["youtube"];
}) {
  // Combine all followed streamers
  const followedStreamers: FollowedStreamer[] = [
    ...(twitch.data || []),
    ...(youtube.data || []),
  ];

  // Sort streams by viewer count
  const sortedStreams = useMemo(() => {
    return [...followedStreamers].sort(
      (a, b) => b.viewer_count - a.viewer_count,
    );
  }, [followedStreamers]);

  // Group streams by platform
  const usersGroupedByPlatform = useMemo(() => {
    const groups: Record<string, FollowedStreamer[]> = {};

    sortedStreams.forEach((stream) => {
      const platform = stream.platform || "Other";

      if (!groups[platform]) {
        groups[platform] = [];
      }
      groups[platform].push(stream);
    });

    return groups;
  }, [sortedStreams]);

  const platforms = Object.keys(usersGroupedByPlatform) as PlatformKey[];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row justify-center">
        <SidebarToggle />
      </div>
      {platforms.map((platform: PlatformKey) => {
        const platformStreams = usersGroupedByPlatform[platform] || [];
        const topStreams = platformStreams.slice(0, 5);

        return (
          <div
            key={platform}
            className="relative flex flex-col items-center space-y-2"
          >
            <div className="mb-1 h-10 w-10 overflow-hidden rounded-full">
              <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-neutral-300">
                {platformData[platform]?.icon}
              </div>
            </div>
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
      {followedStreamers.length === 0 && (
        <p className="text-center text-sm text-neutral-400">
          No followed channels are live right now.
        </p>
      )}
    </div>
  );
}
