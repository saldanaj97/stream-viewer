import { ReactNode } from "react";

export const PLATFORMS = {
  Twitch: "Twitch",
  YouTube: "YouTube",
  Kick: "Kick",
} as const;

export type PlatformKey = keyof typeof PLATFORMS;

export type Platform = {
  name: PlatformKey;
  url?: string;
  icon: ReactNode;
  color: string;
};

export type PlatformMap = {
  [key in PlatformKey]: Platform;
};

export type FollowedUser = {
  id: number;
  name: string;
  avatar: string;
  isLive: boolean;
  viewers: number | null;
  platform: PlatformKey;
};
