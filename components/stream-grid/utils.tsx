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
  } else if (stream.platform === "youtube") {
    // YouTube thumbnails are direct URLs
    return stream.thumbnail_url;
  } else {
    // Kick thumbnails are direct URLs
    return stream.thumbnail;
  }
};

// Helper functions to handle platform differences
export const getUserName = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return stream.user_name;
  } else if (stream.platform === "youtube") {
    return stream.user_name;
  } else {
    return stream.slug;
  }
};

export const getGameName = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return stream.game_name;
  } else if (stream.platform === "youtube") {
    // YouTube doesn't have game categories in the same way
    return "YouTube Content";
  } else {
    return stream.category && stream.category.name
      ? stream.category.name
      : "Kick Content";
  }
};

export const getIsMature = (stream: Stream): boolean => {
  if (stream.platform === "twitch") {
    return stream.is_mature;
  } else if (stream.platform === "youtube") {
    return stream.is_mature || false;
  } else {
    return stream.has_mature_content;
  }
};

export const getStreamType = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return stream.type || "LIVE";
  } else if (stream.platform === "youtube") {
    return "LIVE";
  } else {
    // Kick doesn't have a type field, default to LIVE
    return "LIVE";
  }
};

// Get stream title based on platform
export const getStreamTitle = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return stream.title;
  } else if (stream.platform === "youtube") {
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
    case "youtube":
      return "bg-[#FF0000]";
    default:
      return "bg-blue-600";
  }
};

// Helper function to generate a consistent key for streams from different platforms
export const getStreamKey = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return `twitch-${stream.id} - ${stream.viewer_count}`;
  } else if (stream.platform === "youtube") {
    return `youtube-${stream.id} - ${stream.viewer_count}`;
  } else {
    return `kick-${stream.channel_id} - ${stream.viewer_count}`;
  }
};

// Helper function to get display name for language codes
export const getLanguageDisplayName = (code: string): string => {
  try {
    // Try to get language name in English
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) || code;
  } catch {
    // Fallback to the code if not supported
    return code;
  }
};
