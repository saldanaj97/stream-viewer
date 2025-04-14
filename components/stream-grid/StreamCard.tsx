import Image from "next/image";
import Link from "next/link";

import {
  getGameName,
  getIsMature,
  getPlatformBgColor,
  getStreamDuration,
  getStreamTitle,
  getStreamType,
  getThumbnailUrl,
  getUserName,
} from "./utils";

import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { Stream } from "@/types/stream.types";

export const StreamCard = ({ stream }: { stream: Stream }) => {
  const userName = getUserName(stream);
  const gameName = getGameName(stream);
  const isMature = getIsMature(stream);
  const streamType = getStreamType(stream);
  const platformBgColor = getPlatformBgColor(stream.platform);
  const thumbnailUrl = getThumbnailUrl(stream);
  const streamTitle = getStreamTitle(stream);

  return (
    <Link
      className="block"
      href={`/watch/?channel=${userName}&platform=${stream.platform}`}
    >
      <div className="overflow-hidden rounded-lg bg-gray-800 transition-all hover:ring-1 hover:ring-blue-600">
        <div className="relative aspect-video w-full bg-gray-700">
          {/* Thumbnail image */}
          <Image
            fill
            alt={`${userName} streaming ${gameName}`}
            className="object-cover"
            priority={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={thumbnailUrl}
            unoptimized={
              stream.platform === "kick" || stream.platform === "youtube"
            } // Use unoptimized for external URLs
          />

          {/* Platform icon badge with platform-specific color */}
          <div
            className={`absolute left-2 top-2 rounded ${platformBgColor} flex items-center justify-center p-1`}
          >
            {stream.platform === "twitch" ? (
              <TwitchIcon className="text-white" size={18} />
            ) : stream.platform === "youtube" ? (
              <YouTubeIcon className="text-white" size={18} />
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
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <h3 className="truncate text-sm font-bold">{streamTitle}</h3>
              <p className="truncate text-sm text-gray-400">{userName}</p>
              <p className="truncate text-sm text-gray-400">{gameName}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
