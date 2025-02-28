import { FollowedUser, PLATFORMS } from "./types";

// Mock data for followed users
export const followedUsers: FollowedUser[] = [
  {
    id: 1,
    name: "StreamMaster",
    avatar: "/avatars/user1.png",
    isLive: true,
    viewers: 12500,
    platform: PLATFORMS.Twitch,
  },
  {
    id: 2,
    name: "GamingWarlord",
    avatar: "/avatars/user2.png",
    isLive: true,
    viewers: 8340,
    platform: PLATFORMS.Kick,
  },
  {
    id: 3,
    name: "PixelPro",
    avatar: "/avatars/user3.png",
    isLive: false,
    viewers: null,
    platform: PLATFORMS.Twitch,
  },
  {
    id: 4,
    name: "EpicGamer",
    avatar: "/avatars/user4.png",
    isLive: true,
    viewers: null,
    platform: PLATFORMS.YouTube,
  },
  {
    id: 5,
    name: "TechTalker",
    avatar: "/avatars/user5.png",
    isLive: true,
    viewers: 2100,
    platform: PLATFORMS.Kick,
  },
];
