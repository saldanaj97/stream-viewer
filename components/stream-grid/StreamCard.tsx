import Image from "next/image";
import Link from "next/link";

import {
  getPlatformBgColor,
  getStreamDuration,
  getThumbnailUrl,
} from "./utils";

import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { StreamPlatform } from "@/types/stream.types";

const PlatformIcon = ({ platform }: { platform: StreamPlatform }) => {
  const commonProps = { className: "text-white", size: 18 };

  switch (platform) {
    case "twitch":
      return <TwitchIcon {...commonProps} />;
    case "youtube":
      return <YouTubeIcon {...commonProps} />;
    case "kick":
      return <KickIcon {...commonProps} />;
    default:
      return null;
  }
};

export const StreamCard = ({
  id,
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
  const bgColor = getPlatformBgColor(platform);
  const BADGE = "rounded px-2 py-0.5 text-xs text-white";

  return (
    <Link
      className="block py-4"
      href={`/watch?platform=${platform}&channel=${user_name}&id=${id}`}
    >
      <div className="overflow-hidden rounded-lg transition hover:scale-105 hover:shadow-lg">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full bg-neutral-700">
          <Image
            fill
            alt={`${user_name} streaming ${game_name || "Content"}`}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={getThumbnailUrl(thumbnail_url, platform)}
          />

          {/* Top badges */}
          <div className="absolute inset-x-2 top-2 flex justify-between">
            <div className="flex items-center space-x-2">
              <div className={`rounded p-1 ${bgColor}`}>
                <PlatformIcon platform={platform} />
              </div>
              {language !== "" && (
                <span className={`${BADGE} bg-black bg-opacity-60`}>
                  {language.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {is_mature && <span className={`${BADGE} bg-red-600`}>18+</span>}
              <span className={`${BADGE} bg-black bg-opacity-70`}>
                {getStreamDuration(started_at)}
              </span>
            </div>
          </div>

          {/* Bottom badges */}
          <div className="absolute inset-x-2 bottom-2 flex justify-between">
            <span className={`${BADGE} bg-red-600`}>
              {(stream_type || "LIVE").toUpperCase()}
            </span>
            <span className={`${BADGE} bg-black bg-opacity-70`}>
              {new Intl.NumberFormat().format(viewer_count)} viewers
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start p-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-600">
            {user_name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3 overflow-hidden">
            <h3 className="truncate text-sm font-bold">{title}</h3>
            <p className="truncate text-sm text-neutral-400">{user_name}</p>
            <p className="truncate text-sm text-neutral-400">
              {game_name ||
                `${platform.charAt(0).toUpperCase() + platform.slice(1)} Content`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
