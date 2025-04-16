import { Divider } from "@heroui/divider";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import SidebarToggle from "../SidebarToggle";
import ExpandedSidebarSkeleton from "../loading-skeletons/ExpandedSidebarSkeleton";
import { platformData } from "../platforms";

import {
  FollowedStream,
  FollowedStreamer,
  PlatformKey,
} from "@/types/sidebar.types";

const platforms: { key: PlatformKey; prop: "twitch" | "youtube" }[] = [
  { key: "Twitch", prop: "twitch" },
  { key: "YouTube", prop: "youtube" },
];

// Component for displaying individual streamer items
const StreamerItem = ({ user }: { user: FollowedStreamer }) => (
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
          {user.type === "live" && (
            <>
              <span className="text-red-500">● </span>
              {user.game_name || "Streaming"} •{" "}
              {user.viewer_count.toLocaleString()} viewers
            </>
          )}
        </span>
      </div>
    </Link>
  </li>
);

// Component for the expansion toggle button
const ExpansionToggle = ({
  isExpanded,
  totalCount,
  visibleCount,
  onClick,
}: {
  isExpanded: boolean;
  totalCount: number;
  visibleCount: number;
  onClick: () => void;
}) => (
  <button
    className="flex items-center justify-center text-xs text-neutral-400 hover:text-neutral-200"
    onClick={onClick}
  >
    {isExpanded ? (
      <>
        <ChevronUp className="mr-1" size={14} />
        Show less
      </>
    ) : (
      <>
        <ChevronDown className="mr-1" size={14} />
        Show {totalCount - visibleCount} more
      </>
    )}
  </button>
);

// Component for each platform section
const PlatformSection = ({
  platform,
  streamers,
  isLoading,
  isExpanded,
  onToggleExpand,
}: {
  platform: PlatformKey;
  streamers: FollowedStreamer[];
  isLoading: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  const sortedStreamers = [...streamers].sort(
    (a, b) => b.viewer_count - a.viewer_count,
  );

  const hasMoreThanFiveStreamers = sortedStreamers.length > 5;
  const visibleStreamers = isExpanded
    ? sortedStreamers
    : sortedStreamers.slice(0, 5);

  return (
    <div className="flex flex-col space-y-2 whitespace-nowrap">
      <h4 className="flex items-center space-x-2 text-sm font-medium text-neutral-400">
        {platformData[platform]?.icon}
        <span className="flex w-full items-center">
          {platformData[platform]?.name || platform}
        </span>
      </h4>

      {isLoading ? (
        <ExpandedSidebarSkeleton isLoading={isLoading} />
      ) : visibleStreamers.length === 0 ? (
        <div className="flex items-center justify-center rounded-md p-2 text-sm text-neutral-400">
          No followed channels currently live.
        </div>
      ) : (
        <ul className="flex flex-col space-y-2">
          {visibleStreamers.map((user) => (
            <StreamerItem
              key={`${user.platform}-${user.user_id}`}
              user={user}
            />
          ))}
        </ul>
      )}

      {hasMoreThanFiveStreamers && (
        <ExpansionToggle
          isExpanded={isExpanded}
          totalCount={sortedStreamers.length}
          visibleCount={5}
          onClick={onToggleExpand}
        />
      )}
      <Divider />
    </div>
  );
};

export default function ExpandedSidebar({
  twitch,
  youtube,
}: {
  twitch: FollowedStream["twitch"];
  youtube: FollowedStream["youtube"];
}) {
  const [expandedPlatforms, setExpandedPlatforms] = useState<
    Record<PlatformKey, boolean>
  >({
    Twitch: false,
    YouTube: false,
  });

  const toggleExpandPlatform = (platform: PlatformKey) => {
    setExpandedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const followedStreamers = {
    Twitch: twitch.data || [],
    YouTube: youtube.data || [],
  };

  return (
    <div className="relative flex h-full w-full flex-col space-y-6 overflow-hidden">
      <div className="flex flex-row justify-between">
        <h3 className="whitespace-nowrap text-lg font-semibold text-neutral-200">
          Followed Channels
        </h3>
        <SidebarToggle />
      </div>
      <Divider />
      <div className="flex flex-col space-y-4 overflow-y-auto">
        {platforms.map(({ key: platform }) => (
          <PlatformSection
            key={platform}
            isExpanded={expandedPlatforms[platform] || false}
            isLoading={
              platform === "Twitch" ? twitch.isLoading : youtube.isLoading
            }
            platform={platform}
            streamers={followedStreamers[platform]}
            onToggleExpand={() => toggleExpandPlatform(platform)}
          />
        ))}
      </div>
    </div>
  );
}
