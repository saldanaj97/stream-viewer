import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import SidebarToggle from "../SidebarToggle";
import { platformData } from "../platforms";

import {
  FollowedStream,
  FollowedStreamer,
  PlatformKey,
} from "@/types/sidebar.types";

export default function ExpandedSidebar({
  twitch,
  youtube,
}: {
  twitch: FollowedStream["twitch"];
  youtube: FollowedStream["youtube"];
}) {
  const [expandedPlatforms, setExpandedPlatforms] = useState<
    Record<string, boolean>
  >({});

  const toggleExpandPlatform = (platform: string) => {
    setExpandedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const followedStreamers: FollowedStreamer[] = [
    ...(twitch.data || []),
    ...(youtube.data || []),
  ];

  const sortedStreams = useMemo(() => {
    return [...followedStreamers].sort(
      (a, b) => b.viewer_count - a.viewer_count,
    );
  }, [followedStreamers]);

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
    <div className="relative flex h-full w-full flex-col space-y-6 overflow-hidden">
      <div className="flex flex-row justify-between">
        <h3 className="whitespace-nowrap text-lg font-semibold text-neutral-200">
          Followed Channels
        </h3>
        <SidebarToggle />
      </div>
      {platforms.length > 0 && (
        <div className="flex flex-col space-y-4 overflow-y-auto">
          {platforms.map((platform: PlatformKey) => {
            const followedUser = usersGroupedByPlatform[platform];
            const hasMoreThanFiveFollowedUsersLive = followedUser.length > 5;
            const isPlatformExpanded = expandedPlatforms[platform] || false;
            const followedUsersVisible = isPlatformExpanded
              ? followedUser
              : followedUser.slice(0, 5);

            return (
              <div key={platform} className="flex flex-col space-y-2">
                <h4 className="flex items-center space-x-2 text-sm font-medium text-neutral-400">
                  {platformData[platform]?.icon}
                  <span className="flex w-full items-center">
                    {platformData[platform]?.name || platform}
                  </span>
                </h4>
                <ul className="flex flex-col space-y-2">
                  {followedUsersVisible.map((user) => (
                    <li key={`${user.platform}-${user.user_id}`}>
                      <Link
                        className="flex items-center rounded-md p-2 hover:bg-neutral-800"
                        href={`/watch/${user.platform.toLowerCase()}/${user.user_login}`}
                      >
                        {user.thumbnail_url && (
                          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              alt={user.user_name}
                              className="object-cover"
                              height={40}
                              src={user.thumbnail_url}
                              width={40}
                            />
                          </div>
                        )}
                        <div className="flex flex-col truncate">
                          <span className="truncate font-medium text-neutral-100">
                            {user.user_name}
                          </span>
                          <span className="truncate text-xs text-neutral-400">
                            {user.type === "live" ? (
                              <>
                                <span className="text-red-500">● </span>
                                {user.game_name || "Streaming"} •{" "}
                                {user.viewer_count.toLocaleString()} viewers
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
                {hasMoreThanFiveFollowedUsersLive && (
                  <button
                    className="flex items-center justify-center text-xs text-neutral-400 hover:text-neutral-200"
                    onClick={() => toggleExpandPlatform(platform)}
                  >
                    {isPlatformExpanded ? (
                      <>
                        <ChevronUp className="mr-1" size={14} />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-1" size={14} />
                        Show {followedUser.length - 5} more
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {followedStreamers.length === 0 && (
        <p className="text-sm text-neutral-400">
          No followed channels are live right now.
        </p>
      )}
    </div>
  );
}
