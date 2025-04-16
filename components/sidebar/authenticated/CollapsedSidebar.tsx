import { Divider } from "@heroui/divider";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import SidebarToggle from "../SidebarToggle";
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

// Streamer avatar item for collapsed sidebar
const StreamerItem = ({ user }: { user: FollowedStreamer }) => (
  <Link
    key={`${user.platform}-${user.user_id}`}
    className="relative block"
    href={`/watch/${user.platform.toLowerCase()}/${user.user_login}`}
  >
    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-neutral-800 hover:border-neutral-700">
      {user.thumbnail_url ? (
        <Image
          alt={user.user_name}
          className="object-cover"
          height={28}
          src={user.thumbnail_url}
          width={28}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-neutral-700 text-xs">
          {user.user_name.charAt(0)}
        </div>
      )}
    </div>
    {user.type === "live" && (
      <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
    )}
  </Link>
);

// Show more/less toggle button
const ExpansionToggle = ({
  isExpanded,
  onClick,
}: {
  isExpanded: boolean;
  onClick: () => void;
}) => (
  <button
    className="flex items-center justify-center text-xs text-neutral-400 hover:text-neutral-200"
    onClick={onClick}
  >
    {isExpanded ? (
      <>
        <ChevronUp className="mr-1" size={24} />
      </>
    ) : (
      <>
        <ChevronDown className="mr-1" size={24} />
      </>
    )}
  </button>
);

// Platform section for collapsed sidebar
const PlatformSection = ({
  platform,
  streamers,
  isExpanded,
  onToggleExpand,
}: {
  platform: PlatformKey;
  streamers: FollowedStreamer[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  const sortedStreamers = [...streamers].sort(
    (a, b) => b.viewer_count - a.viewer_count,
  );
  const hasMoreThanFive = sortedStreamers.length > 5;
  const visibleStreamers = isExpanded
    ? sortedStreamers
    : sortedStreamers.slice(0, 5);

  return (
    <div className="relative flex flex-col items-center space-y-2">
      <div className="mb-1 h-10 w-10 overflow-hidden rounded-full">
        <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-neutral-300">
          {platformData[platform]?.icon}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        {visibleStreamers.map((user) => (
          <StreamerItem key={`${user.platform}-${user.user_id}`} user={user} />
        ))}
      </div>
      {hasMoreThanFive && (
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

export default function CollapsedSidebar({
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

  const followedStreamers: Record<PlatformKey, FollowedStreamer[]> = {
    Twitch: twitch.data || [],
    YouTube: youtube.data || [],
  };

  const hasAnyStreams =
    (twitch.data && twitch.data.length > 0) ||
    (youtube.data && youtube.data.length > 0);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row justify-center">
        <SidebarToggle />
      </div>
      <Divider />
      {platforms.map(({ key: platform }) => (
        <PlatformSection
          key={platform}
          isExpanded={expandedPlatforms[platform] || false}
          platform={platform}
          streamers={followedStreamers[platform]}
          onToggleExpand={() => toggleExpandPlatform(platform)}
        />
      ))}
      {!hasAnyStreams && (
        <p className="text-center text-sm text-neutral-400">
          No followed channels are live right now.
        </p>
      )}
    </div>
  );
}
