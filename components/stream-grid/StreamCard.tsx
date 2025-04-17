import Image from "next/image";
import Link from "next/link";

import { getPlatformBgColor, getThumbnailUrl } from "./utils";

import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { Stream } from "@/types/stream.types";

export const StreamCard = ({ stream }: { stream: Stream }) => {
  const platformBgColor = getPlatformBgColor(stream.platform);

  return (
    <Link
      className="block"
      href={`/watch?platform=${stream.platform}&channel=${stream.user_name}&id=${stream.id}`}
    >
      <div className="overflow-hidden rounded-lg bg-gray-800 transition-all hover:ring-1 hover:ring-blue-600">
        <div className="relative aspect-video w-full bg-gray-700">
          {/* Thumbnail image */}
          <Image
            fill
            alt={`${stream.user_name} streaming ${stream.game_name || "Unknown Content"}`}
            className="object-cover"
            priority={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={getThumbnailUrl(stream.thumbnail_url, stream.platform)}
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
            {(stream.stream_type || "LIVE").toUpperCase()}
          </div>

          {/* Viewer count */}
          <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
            {new Intl.NumberFormat().format(stream.viewer_count)} viewers
          </div>

          {/* Stream duration */}
          <div className="absolute right-2 top-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
            {(() => {
              const start = new Date(stream.started_at);
              const now = new Date();
              const diffMs = now.getTime() - start.getTime();
              const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
              const diffMins = Math.floor(
                (diffMs % (1000 * 60 * 60)) / (1000 * 60),
              );

              return diffHrs > 0 ? `${diffHrs}h ${diffMins}m` : `${diffMins}m`;
            })()}
          </div>

          {/* Mature content badge */}
          {stream.is_mature && (
            <div className="absolute left-12 top-2 rounded bg-red-600 px-2 py-0.5 text-xs">
              18+
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="flex items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-600">
              {stream.user_name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <h3 className="truncate text-sm font-bold">{stream.title}</h3>
              <p className="truncate text-sm text-gray-400">
                {stream.user_name}
              </p>
              <p className="truncate text-sm text-gray-400">
                {stream.game_name || "Unknown Content"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
