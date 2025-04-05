import { Stream } from "@/types/stream.types";

// Format timestamp utility function
export const getStreamDuration = (startTime: string) => {
  const start = new Date(startTime);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return diffHrs > 0 ? `${diffHrs}h ${diffMins}m` : `${diffMins}m`;
};

// Process thumbnail URL based on platform
export const getThumbnailUrl = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    // Twitch thumbnails have {width} and {height} placeholders
    return stream.thumbnail_url
      .replace("{width}", "440")
      .replace("{height}", "248");
  } else {
    // Kick thumbnails are direct URLs
    return stream.thumbnail;
  }
};

// Helper functions to handle platform differences
export const getUserName = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return stream.user_name;
  } else {
    return stream.slug;
  }
};

export const getGameName = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return stream.game_name;
  } else {
    return stream.category.name;
  }
};

export const getIsMature = (stream: Stream): boolean => {
  if (stream.platform === "twitch") {
    return stream.is_mature;
  } else {
    return stream.has_mature_content;
  }
};

export const getStreamType = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return stream.type || "LIVE";
  } else {
    // Kick doesn't have a type field, default to LIVE
    return "LIVE";
  }
};

// Get stream title based on platform
export const getStreamTitle = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return stream.title;
  } else {
    return stream.stream_title || "";
  }
};

// Platform-specific styling
export const getPlatformBgColor = (platform: string): string => {
  switch (platform) {
    case "twitch":
      return "bg-[#9146FF]";
    case "kick":
      return "bg-[#53FC19]";
    default:
      return "bg-blue-600";
  }
};
