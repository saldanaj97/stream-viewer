import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";

import { KickIcon, TwitchIcon, YouTubeIcon } from "../icons";

export interface PlatformUser {
  platform: string;
  id: string;
  username: string;
  display_name: string;
  profile_image_url: string;
  broadcaster_type: string | null;
  is_live: boolean | null;
  live_viewer_count: number | null;
}

export const platformIcons = {
  kick: <KickIcon className="h-4 w-4" />,
  youtube: <YouTubeIcon className="h-4 w-4" />,
  twitch: <TwitchIcon className="h-4 w-4" />,
} as const;

export const platformColor = {
  kick: "platform-kick",
  youtube: "platform-youtube",
  twitch: "platform-twitch",
} as const;

export type Platform = keyof typeof platformColor;

interface UserItemProps {
  platform: Platform;
  user: PlatformUser;
  onItemClick: (platform: string, channel: string, id?: string) => void;
  selected?: boolean;
}

const UserItem: React.FC<UserItemProps> = React.memo(
  ({ platform, user, onItemClick, selected }) => {
    const [imgError, setImgError] = useState(false);
    const {
      username,
      display_name,
      profile_image_url,
      broadcaster_type,
      is_live,
      live_viewer_count,
      id,
    } = user;

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onItemClick(platform, username, id);
      },
      [onItemClick, platform, username, id],
    );

    return (
      <li
        className={`text-foreground hover:bg-default-200 flex items-center gap-2 truncate rounded p-0 text-xs font-semibold ${selected ? "bg-default-200" : ""}`}
      >
        <button
          className="hover:bg-default-200 flex w-full cursor-pointer items-center gap-2 truncate rounded p-4 text-left text-xs font-semibold"
          type="button"
          onClick={handleClick}
        >
          <span className="flex items-center gap-2 capitalize">
            {platformIcons[platform] ?? platform}
          </span>

          {profile_image_url && !imgError ? (
            <Image
              priority
              unoptimized
              alt={`${username} profile`}
              className="rounded-full object-cover"
              height={25}
              sizes="25px"
              src={profile_image_url}
              width={25}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-600 text-sm font-semibold text-white">
              {username?.charAt(0).toUpperCase()}
            </span>
          )}

          <span className="flex-1">{display_name || username}</span>

          {broadcaster_type === "partner" && (
            <BadgeCheck
              className={`ml-auto h-5 w-5 text-${platformColor[platform]}`}
            />
          )}

          {is_live && (
            <span className="ml-2 rounded-sm bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
              LIVE
            </span>
          )}

          {is_live && live_viewer_count !== null && (
            <span className="ml-2 rounded-sm bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
              {live_viewer_count} viewers
            </span>
          )}
        </button>
      </li>
    );
  },
);

// Set display name for debugging
UserItem.displayName = "UserItem";

export default UserItem;
