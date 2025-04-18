import { Divider } from "@heroui/divider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SidebarToggle from "../SidebarToggle";
import ExpandedSidebarSkeleton from "../loading-skeletons/ExpandedSidebarSkeleton";
import { platformData } from "../platforms";

import { FollowedStream, PlatformKey } from "@/types/sidebar.types";

const platforms: { key: PlatformKey; prop: "twitch" | "youtube" }[] = [
  { key: "Twitch", prop: "twitch" },
  { key: "YouTube", prop: "youtube" },
];

// Component for displaying individual streamer items
const StreamerItem = ({
  id,
  user_login,
  platform,
  user_name,
  profile_image_url,
  type,
  game_name,
  viewer_count,
}: {
  id: string;
  user_id: string;
  user_login: string;
  platform: PlatformKey;
  user_name: string;
  profile_image_url: string;
  type: string;
  game_name: string;
  viewer_count: number;
}) => (
  <Link
    className="flex items-center rounded-md p-2 hover:bg-neutral-800"
    href={`/watch?platform=${platform.toLowerCase()}&channel=${user_login}&id=${id}`}
  >
    {profile_image_url ? (
      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
        <Image
          alt={user_name}
          className="object-cover"
          height={40}
          src={profile_image_url}
          width={40}
        />
      </div>
    ) : (
      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
        <p className="text-normal flex h-full w-10 items-center justify-center bg-neutral-700">
          {user_name.charAt(0).toUpperCase()}
        </p>
      </div>
    )}

    <div className="flex flex-col truncate">
      <span className="truncate font-medium text-neutral-100">{user_name}</span>
      <span className="truncate text-xs text-neutral-400">
        {type === "live" && (
          <>
            <span className="text-red-500">● </span>
            {game_name || "Streaming"} • {viewer_count.toLocaleString()} viewers
          </>
        )}
      </span>
    </div>
  </Link>
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
  streamers: any;
  isLoading: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  const sortedStreamers = Array.isArray(streamers)
    ? [...streamers].sort((a, b) => b.viewer_count - a.viewer_count)
    : [];
  const hasMoreThanFiveStreamers = sortedStreamers.length > 5;

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
      ) : sortedStreamers.length === 0 ? (
        <div className="flex items-center justify-center rounded-md p-2 text-sm text-neutral-400">
          No followed channels currently live.
        </div>
      ) : (
        <ul className="flex flex-col space-y-2 overflow-hidden">
          {/* first 5 always visible */}
          {sortedStreamers.slice(0, 5).map((user, index) => (
            <li key={`${user.platform}-${user.user_id || index}`}>
              <StreamerItem
                game_name={user.game_name}
                id={user.id}
                platform={user.platform}
                profile_image_url={user.profile_image_url}
                type={user.type}
                user_id={user.user_id}
                user_login={user.user_login}
                user_name={user.user_name}
                viewer_count={user.viewer_count}
              />
            </li>
          ))}

          {/* animate the rest */}
          <AnimatePresence initial={false}>
            {isExpanded &&
              sortedStreamers.slice(5).map((user) => (
                <motion.li
                  key={`${user.platform}-${user.user_id}`}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StreamerItem {...user} />
                </motion.li>
              ))}
          </AnimatePresence>
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
  expandedPlatforms,
  toggleExpandPlatform,
}: {
  twitch: FollowedStream["twitch"];
  youtube: FollowedStream["youtube"];
  expandedPlatforms: Record<PlatformKey, boolean>;
  toggleExpandPlatform: (p: PlatformKey) => void;
}) {
  const followedStreamers = {
    Twitch: twitch,
    YouTube: youtube,
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
            key={`${platform}`}
            isExpanded={expandedPlatforms[platform]}
            isLoading={
              platform === "Twitch" ? twitch.isLoading : youtube.isLoading
            }
            platform={platform}
            streamers={followedStreamers[platform].data}
            onToggleExpand={() => toggleExpandPlatform(platform)}
          />
        ))}
      </div>
    </div>
  );
}
