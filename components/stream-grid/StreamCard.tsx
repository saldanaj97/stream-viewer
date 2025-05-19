import { Grid2X2Check, Grid2X2Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  getPlatformBgColor,
  getStreamDuration,
  getThumbnailUrl,
} from "./utils";

import { PlatformIcon } from "@/components/icons";
import { useMultiViewBarStore } from "@/providers/multiview-bar-provider";
import { MultiViewStream } from "@/stores/multiview-bar-store";
import { Stream } from "@/types/stream.types";

export const StreamCard = (stream: Stream) => {
  const {
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
    profile_image_url,
  } = stream;
  const [imgError, setImgError] = useState(false);
  const bgColor = getPlatformBgColor(platform);
  const BADGE = "rounded-sm px-2 py-0.5 text-xs text-white";

  // Multiview selection logic
  const selectedStreams = useMultiViewBarStore((state) => state.streams);
  const addStream = useMultiViewBarStore((state) => state.addStream);
  const removeStream = useMultiViewBarStore((state) => state.removeStream);
  const max = useMultiViewBarStore((state) => state.max);
  const isSelected = selectedStreams.some(
    (s) => s.id === id && s.platform === platform,
  );
  const isMax = !isSelected && selectedStreams.length >= max;

  function handleMultiviewClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const streamInfo: MultiViewStream = { id, user_name, platform };

    if (isSelected) {
      removeStream(streamInfo);
    } else if (!isMax) {
      addStream(streamInfo);
    }
  }

  return (
    <div className="group relative block py-4">
      <Link
        className="block"
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
                <div className={`rounded-sm p-1 ${bgColor}`}>
                  <PlatformIcon platform={platform} />
                </div>
                {language !== "" && (
                  <span className={`${BADGE} bg-opacity-60 bg-black`}>
                    {language.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {is_mature && (
                  <span className={`${BADGE} bg-red-600`}>18+</span>
                )}
                <span className={`${BADGE} bg-opacity-70 bg-black`}>
                  {getStreamDuration(started_at)}
                </span>
              </div>
            </div>

            {/* Bottom badges */}
            <div className="absolute inset-x-2 bottom-2 flex justify-between">
              <span className={`${BADGE} bg-red-600`}>
                {(stream_type || "LIVE").toUpperCase()}
              </span>
              <span className={`${BADGE} bg-opacity-70 bg-black`}>
                {new Intl.NumberFormat().format(viewer_count)} viewers
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-600 text-white">
              {profile_image_url && !imgError ? (
                <Image
                  priority
                  unoptimized
                  alt={`${user_name} profile`}
                  className="rounded-full object-cover"
                  height={40}
                  sizes="40px"
                  src={profile_image_url}
                  width={40}
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-sm font-semibold">
                  {user_name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="ml-3 overflow-hidden">
              <h3 className="truncate text-sm font-bold">{title}</h3>
              <p className="truncate text-sm text-neutral-400">{user_name}</p>
              <p className="truncate text-sm text-neutral-400">
                {game_name ||
                  `${platform.charAt(0).toUpperCase() + platform.slice(1)} Content`}
              </p>
              {/* Multiview three dots button */}
              <button
                className={`absolute right-2 bottom-0 z-10 rounded-full p-2 ${isMax ? "hidden" : ""}`}
                disabled={isMax}
                title={
                  isSelected
                    ? "Remove from Multiview"
                    : isMax
                      ? "Max 4 streams"
                      : "Add to Multiview"
                }
                onClick={handleMultiviewClick}
              >
                {isSelected ? (
                  <Grid2X2Check className="text-primary" size={20} />
                ) : (
                  <Grid2X2Plus className="text-foreground" size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
