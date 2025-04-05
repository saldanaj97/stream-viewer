import Image from "next/image";
import Link from "next/link";

import { KickIcon, TwitchIcon } from "@/components/icons";
import { KickStream, Stream, TwitchStream } from "@/types/stream.types";

// Format timestamp utility function
const getStreamDuration = (startTime: string) => {
  const start = new Date(startTime);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return diffHrs > 0 ? `${diffHrs}h ${diffMins}m` : `${diffMins}m`;
};

// Process thumbnail URL based on platform
const getThumbnailUrl = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    // Twitch thumbnails have {width} and {height} placeholders
    const twitchStream = stream as TwitchStream & { platform: "twitch" };

    return twitchStream.thumbnail_url
      .replace("{width}", "440")
      .replace("{height}", "248");
  } else {
    // Kick thumbnails are direct URLs
    return stream.thumbnail;
  }
};

// Helper functions to handle platform differences
const getUserName = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return (stream as TwitchStream & { platform: "twitch" }).user_name;
  } else {
    return (stream as KickStream & { platform: "kick" }).slug;
  }
};

const getGameName = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return (stream as TwitchStream & { platform: "twitch" }).game_name;
  } else {
    return (stream as KickStream & { platform: "kick" }).category.name;
  }
};

const getIsMature = (stream: Stream): boolean => {
  if (stream.platform === "twitch") {
    return (stream as TwitchStream & { platform: "twitch" }).is_mature;
  } else {
    return (stream as KickStream & { platform: "kick" }).has_mature_content;
  }
};

const getStreamType = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return (stream as TwitchStream & { platform: "twitch" }).type || "LIVE";
  } else {
    // Kick doesn't have a type field, default to LIVE
    return "LIVE";
  }
};

// Platform-specific styling
const getPlatformBgColor = (platform: string): string => {
  switch (platform) {
    case "twitch":
      return "bg-[#9146FF]";
    case "kick":
      return "bg-[#53FC19]";
    default:
      return "bg-blue-600";
  }
};

export const StreamCard = ({ stream }: { stream: Stream }) => {
  const userName = getUserName(stream);
  const gameName = getGameName(stream);
  const isMature = getIsMature(stream);
  const streamType = getStreamType(stream);
  const platformBgColor = getPlatformBgColor(stream.platform);
  const thumbnailUrl = getThumbnailUrl(stream);

  return (
    <Link
      className="block"
      href={`/watch/?channel=${userName}&platform=${stream.platform}`}
    >
      <div className="overflow-hidden rounded-lg bg-gray-800 transition-all hover:ring-2 hover:ring-blue-600">
        <div className="relative aspect-video w-full bg-gray-700">
          {/* Thumbnail image */}
          <Image
            fill
            alt={`${userName} streaming ${gameName}`}
            className="object-cover"
            priority={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={thumbnailUrl}
            unoptimized={stream.platform === "kick"} // Use unoptimized for external Kick URLs
          />

          {/* Platform icon badge with platform-specific color */}
          <div
            className={`absolute left-2 top-2 rounded ${platformBgColor} flex items-center justify-center p-1`}
          >
            {stream.platform === "twitch" ? (
              <TwitchIcon className="text-white" size={18} />
            ) : (
              <KickIcon className="text-white" size={18} />
            )}
          </div>

          {/* Stream status */}
          <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-0.5 text-xs">
            {streamType.toUpperCase()}
          </div>

          {/* Viewer count */}
          <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
            {new Intl.NumberFormat().format(stream.viewer_count)} viewers
          </div>

          {/* Stream duration */}
          <div className="absolute right-2 top-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
            {getStreamDuration(stream.started_at)}
          </div>

          {/* Mature content badge */}
          {isMature && (
            <div className="absolute left-12 top-2 rounded bg-red-600 px-2 py-0.5 text-xs">
              18+
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="flex items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-600">
              {userName.charAt(0)}
            </div>
            <div className="ml-3">
              <h3 className="truncate text-sm font-bold">{stream.title}</h3>
              <p className="text-sm text-gray-400">{userName}</p>
              <p className="text-sm text-gray-400">{gameName}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
