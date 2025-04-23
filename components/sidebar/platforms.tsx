import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { Platform, PlatformMap, PLATFORMS } from "@/types/sidebar.types";

export const platformData: PlatformMap = {
  [PLATFORMS.Twitch]: {
    name: PLATFORMS.Twitch,
    icon: <TwitchIcon />,
    color: "bg-platform-twitch",
  },
  [PLATFORMS.YouTube]: {
    name: PLATFORMS.YouTube,
    icon: <YouTubeIcon />,
    color: "bg-platform-youtube",
  },
  // [PLATFORMS.Kick]: {
  //   name: PLATFORMS.Kick,
  //   url: "https://www.kick.com",
  //   icon: <KickIcon />,
  //   color: "bg-platform-kick",
  // },
};

export const PLATFORM_ICONS: Record<
  string,
  { color: string; text: string; icon: React.ReactNode }
> = {
  twitch: {
    color: "bg-platform-twitch ",
    text: "text-platform-twitch",
    icon: <TwitchIcon className="mr-2" size={20} />,
  },
  youtube: {
    color: "bg-platform-youtube",
    text: "text-platform-youtube",
    icon: <YouTubeIcon className="mr-2" size={20} />,
  },
  kick: {
    color: "bg-platform-kick",
    text: "text-platform-kick",
    icon: <KickIcon className="mr-2" size={20} />,
  },
  default: {
    color: "bg-blue-600",
    text: "text-blue-600",
    icon: null,
  },
};

export const getPlatformByKey = (key: string): Platform | undefined => {
  return platformData[key as keyof typeof platformData];
};

// For when an array of platforms is needed
export const platformsArray = Object.values(platformData);
