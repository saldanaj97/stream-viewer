import { ReactNode } from "react";

export const PLATFORMS = {
  Twitch: "Twitch",
  YouTube: "YouTube",
  // Kick: "Kick",
} as const;

export type PlatformKey = keyof typeof PLATFORMS;

export interface Platform {
  name: PlatformKey;
  url?: string;
  icon: ReactNode;
  color: string;
}

export type PlatformMap = {
  [key in PlatformKey]: Platform;
};

export type FollowedStreamer = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
  is_mature: boolean;
  platform: PlatformKey;
};

export type FollowedStream = {
  twitch: { data: FollowedStreamer[]; isLoading: boolean; error: Error | null };
  youtube: {
    data: FollowedStreamer[];
    isLoading: boolean;
    error: Error | null;
  };
};

export type Streams = {
  twitch: {
    isLoading: boolean;
    error: Error | null;
    data: FollowedStreamer[];
  };
  youtube: {
    isLoading: boolean;
    error: Error | null;
    data: FollowedStreamer[];
  };
};
