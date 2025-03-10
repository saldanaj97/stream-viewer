import { Platform, PlatformMap, PLATFORMS } from "./types";

import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";

export const platformData: PlatformMap = {
  [PLATFORMS.Twitch]: {
    name: PLATFORMS.Twitch,
    url: "https://www.twitch.tv",
    icon: <TwitchIcon />,
    color: "#9146FF",
  },
  [PLATFORMS.YouTube]: {
    name: PLATFORMS.YouTube,
    url: "https://www.youtube.com",
    icon: <YouTubeIcon />,
    color: "#FF0000",
  },
  [PLATFORMS.Kick]: {
    name: PLATFORMS.Kick,
    url: "https://www.kick.com",
    icon: <KickIcon />,
    color: "#53FC19",
  },
};

export const getPlatformByKey = (key: string): Platform | undefined => {
  return platformData[key as keyof typeof platformData];
};

// For when an array of platforms is needed
export const platformsArray = Object.values(platformData);
