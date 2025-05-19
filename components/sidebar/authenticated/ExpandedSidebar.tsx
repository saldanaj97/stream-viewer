import { Divider } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SidebarToggle from "../SidebarToggle";
import ExpandedSidebarSkeleton from "../loading-skeletons/ExpandedSidebarSkeleton";
import { platformData } from "../platforms";
import { getStreamerWatchUrl } from "../sidebar-utils";

import {
  FollowedStream,
  FollowedStreamer,
  PlatformKey,
} from "@/types/sidebar.types";

const platforms: { key: PlatformKey; prop: "twitch" | "youtube" }[] = [
  { key: "Twitch", prop: "twitch" },
  { key: "YouTube", prop: "youtube" },
];

const formatViewerCount = (count: number): string =>
  count >= 1000 ? (count / 1000).toFixed(1) + "K" : count.toString();

const StreamerItem = (streamer: FollowedStreamer) => {
  const { user_name, profile_image_url, type, game_name, viewer_count } =
    streamer;

  return (
    <Link
      key={`${streamer.platform}-${streamer.user_id}`}
      className="flex items-center rounded-md p-2 hover:bg-neutral-800"
      href={getStreamerWatchUrl(streamer)}
    >
      <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full">
        {profile_image_url ? (
          <Image
            alt={user_name}
            className="h-full w-full object-cover"
            height={40}
            src={profile_image_url}
            width={40}
          />
        ) : (
          <p className="flex h-full w-full items-center justify-center bg-neutral-700">
            {user_name.charAt(0).toUpperCase()}
          </p>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between">
        <div className="flex flex-col truncate">
          <span className="truncate text-sm font-semibold text-neutral-600 dark:text-neutral-100">
            {user_name}
          </span>
          {type === "live" && (
            <span className="truncate text-xs font-medium text-neutral-400">
              {game_name || "Streaming"}
            </span>
          )}
        </div>

        {type === "live" && (
          <div className="ml-2 flex items-center text-xs text-neutral-400">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            <span className="ml-1 font-bold">
              {formatViewerCount(viewer_count)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

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
  // Only render the section if there are streamers to display for that platform
  if (!streamers || (streamers.length === 0 && !isLoading)) {
    return null;
  }

  const sortedStreamers = Array.isArray(streamers)
    ? [...streamers].sort((a, b) => b.viewer_count - a.viewer_count)
    : [];
  const hasMoreThanFiveStreamers = sortedStreamers.length > 5;

  return (
    <div className="flex flex-col space-y-2">
      <h4 className="flex items-center space-x-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
        <span className="text-lg">{platformData[platform]?.icon}</span>
        <span>{platformData[platform]?.name || platform}</span>
      </h4>

      {isLoading ? (
        <ExpandedSidebarSkeleton isLoading={isLoading} />
      ) : sortedStreamers.length === 0 ? (
        <div className="flex items-center justify-center rounded-md p-2 text-sm text-neutral-600 dark:text-neutral-400">
          No followed channels currently live.
        </div>
      ) : (
        <ul className="flex flex-col">
          {sortedStreamers.slice(0, 5).map((user, index) => (
            <li key={`${user.platform}-${user.user_id || index}`}>
              <StreamerItem {...user} />
            </li>
          ))}

          <AnimatePresence initial={false}>
            {isExpanded &&
              sortedStreamers.slice(5).map((user) => (
                <motion.li
                  key={`${user.platform}-${user.user_id}`}
                  animate={{ opacity: 1, height: "auto", margin: 0 }}
                  className="overflow-hidden"
                  exit={{ opacity: 0, height: 0, margin: 0 }}
                  initial={{ opacity: 0, height: 0, margin: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
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
  const followedStreamers: Record<PlatformKey, FollowedStreamer[]> = {
    Twitch: twitch.data || [],
    YouTube: youtube.data || [],
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold whitespace-nowrap text-neutral-600 dark:text-neutral-200">
          Followed Channels
        </h3>
        <SidebarToggle />
      </div>
      <Divider />
      {platforms.map(({ key: platform }) => (
        <PlatformSection
          key={platform}
          isExpanded={expandedPlatforms[platform]}
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
