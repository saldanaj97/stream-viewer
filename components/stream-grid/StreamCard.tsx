import Image from "next/image";
import Link from "next/link";

import {
  getPlatformBgColor,
  getStreamDuration,
  getThumbnailUrl,
} from "./utils";

import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { StreamPlatform } from "@/types/stream.types";

const PlatformIcon = ({
  platform,
}: {
  platform: "twitch" | "youtube" | "kick";
}) => {
  if (platform === "twitch") {
    return <TwitchIcon className="text-white" size={18} />;
  }
  if (platform === "youtube") {
    return <YouTubeIcon className="text-white" size={18} />;
  }

  return <KickIcon className="text-white" size={18} />;
};

export const StreamCard = ({
  id,
  user_id,
  user_name,
  title,
  viewer_count,
  started_at,
  language,
  thumbnail_url,
  is_mature,
  platform,
  game_name,
  stream_type,
}: {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  is_mature: boolean;
  platform: StreamPlatform;
  game_name?: string;
  stream_type?: string;
}) => {
  const platformBgColor = getPlatformBgColor(platform);

  const hoverRingClassMap = {
    twitch: "hover:ring-platform-twitch",
    youtube: "hover:ring-platform-youtube",
    kick: "hover:ring-platform-kick",
  };
  const hoverRingClass = hoverRingClassMap[platform];

  return (
    <Link
      className="block p-4"
      href={`/watch?platform=${platform}&channel=${user_name}&id=${id}`}
    >
      <div
        className={`overflow-hidden rounded-lg bg-transparent transition-all hover:ring-2 ${hoverRingClass}`}
      >
        <div className="relative aspect-video w-full bg-gray-700">
          {/* Thumbnail image */}
          <Image
            fill
            alt={`${user_name} streaming ${game_name || "Unknown Content"}`}
            className="object-cover"
            priority={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={getThumbnailUrl(thumbnail_url, platform)}
          />

          {/* Platform icon badge with platform-specific color */}
          <div className="absolute left-2 top-2 flex items-center p-1">
            <div
              className={`rounded ${platformBgColor} flex items-center justify-center p-1`}
            >
              <PlatformIcon platform={platform} />
            </div>
            {language && (
              <p className="ml-1 w-fit truncate rounded-md bg-neutral-500/20 px-2 text-xs text-foreground">
                {language.toUpperCase()}
              </p>
            )}
          </div>

          {/* Stream status */}
          <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-0.5 text-xs">
            {(stream_type || "LIVE").toUpperCase()}
          </div>

          {/* Viewer count */}
          <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
            {new Intl.NumberFormat().format(viewer_count)} viewers
          </div>

          {/* Stream duration */}
          <div className="absolute right-2 top-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
            {getStreamDuration(started_at)}
          </div>

          {/* Mature content badge */}
          {is_mature && (
            <div className="absolute left-12 top-2 rounded bg-red-600 px-2 py-0.5 text-xs">
              18+
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="flex items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-600">
              {user_name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <h3 className="truncate text-sm font-bold">{title}</h3>
              <p className="truncate text-sm text-gray-400">{user_name}</p>
              <p className="truncate text-sm text-gray-400">
                {game_name || `${platform} Content`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
