import { Divider } from "@heroui/divider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SidebarToggle from "../SidebarToggle";
import CollapsedSidebarSkeleton from "../loading-skeletons/CollapsedSidebarSkeleton";
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

const StreamerItem = (streamer: FollowedStreamer) => {
  const { user_name, profile_image_url, type } = streamer;

  return (
    <Link
      key={`${streamer.platform}-${streamer.user_id}`}
      className="flex items-center rounded-full p-2 hover:bg-neutral-800"
      href={getStreamerWatchUrl(streamer)}
    >
      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
        {profile_image_url ? (
          <Image
            alt={user_name}
            className="h-full w-full object-cover"
            height={30}
            src={profile_image_url}
            width={30}
          />
        ) : (
          <p className="text-normal flex h-full w-full items-center justify-center bg-neutral-700">
            {user_name.charAt(0).toUpperCase()}
          </p>
        )}
        {type === "live" && (
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
        )}
      </div>
    </Link>
  );
};

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
    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
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
  streamers: FollowedStreamer[];
  isLoading: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  // Only render the section if there are streamers to display for that platform
  if (!streamers || (streamers.length === 0 && !isLoading)) {
    return null;
  }

  const sortedStreamers = [...streamers].sort(
    (a, b) => b.viewer_count - a.viewer_count,
  );
  const hasMoreThanFive = sortedStreamers.length > 5;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-800 text-neutral-300">
        <span aria-hidden="true">{platformData[platform]?.icon}</span>
      </div>

      {isLoading ? (
        <CollapsedSidebarSkeleton isLoading={isLoading} />
      ) : (
        <>
          <div className="flex flex-col items-center">
            {sortedStreamers.slice(0, 5).map((user) => (
              <div key={`${user.platform}-${user.user_id}`}>
                <StreamerItem {...user} />
              </div>
            ))}
          </div>

          {/* Animate the rest of the list */}
          <AnimatePresence initial={false}>
            {isExpanded &&
              sortedStreamers.slice(5).map((user) => (
                <motion.div
                  key={`${user.platform}-${user.user_id}`}
                  animate={{ opacity: 1, height: "auto", margin: 0 }}
                  className="overflow-hidden"
                  exit={{ opacity: 0, height: 0, margin: 0 }}
                  initial={{ opacity: 0, height: 0, margin: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                  <StreamerItem {...user} />
                </motion.div>
              ))}
          </AnimatePresence>
        </>
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
      <div className="flex justify-center">
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
