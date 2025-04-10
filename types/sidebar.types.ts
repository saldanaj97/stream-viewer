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

export interface FollowedUser {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
  is_mature: boolean;
  platform: PlatformKey;
}
