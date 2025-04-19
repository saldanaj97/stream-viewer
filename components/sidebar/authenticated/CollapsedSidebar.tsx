import { Divider } from "@heroui/divider";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import SidebarToggle from "../SidebarToggle";
import CollapsedSidebarSkeleton from "../loading-skeletons/CollapsedSidebarSkeleton";
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
const StreamerItem = ({
  id,
  user_id,
  user_login,
  platform,
  user_name,
  profile_image_url,
  type,
}: {
  id: string;
  user_id: string;
  user_login: string;
  platform: string;
  user_name: string;
  profile_image_url: string;
  type: string;
}) => (
  <Link
    key={`${platform}-${user_id}`}
    className="relative block"
    href={`/watch?platform=${platform.toLowerCase()}&channel=${user_login}&id=${id}`}
  >
    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-neutral-800 hover:border-neutral-700">
      {profile_image_url ? (
        <Image
          alt={user_name}
          className="object-cover"
          height={40}
          src={profile_image_url}
          width={40}
        />
      ) : (
        <p className="text-normal flex h-full w-10 items-center justify-center bg-neutral-700">
          {user_name.charAt(0).toUpperCase()}
        </p>
      )}
    </div>
    {type === "live" && (
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

      {isLoading ? (
        <CollapsedSidebarSkeleton isLoading={isLoading} />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {visibleStreamers.map((user) => (
            <StreamerItem
              key={`${user.platform}-${user.user_id}`}
              id={user.id}
              platform={user.platform}
              profile_image_url={user.profile_image_url}
              type={user.type}
              user_id={user.user_id}
              user_login={user.user_login}
              user_name={user.user_name}
            />
          ))}
        </div>
      )}
      {hasMoreThanFive && (
        <ExpansionToggle isExpanded={isExpanded} onClick={onToggleExpand} />
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
          isLoading={
            platform === "Twitch" ? twitch.isLoading : youtube.isLoading
          }
          platform={platform}
          streamers={followedStreamers[platform]}
          onToggleExpand={() => toggleExpandPlatform(platform)}
        />
      ))}
    </div>
  );
}
