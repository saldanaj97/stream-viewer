import { Stream, StreamPlatform } from "@/types/stream.types";

// Format timestamp utility function
export const getStreamDuration = (startTime: string) => {
  const start = new Date(startTime);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return diffHrs > 0 ? `${diffHrs}h ${diffMins}m` : `${diffMins}m`;
};

export const getThumbnailUrl = (
  thumbnail: string,
  platform: StreamPlatform,
): string => {
  // YouTube and Kick are already in the correct format so only Twitch needs to be adjusted
  // Twitch thumbnails have a fixed size format
  // Replace the size placeholder with the desired size
  if (platform === "twitch") {
    const size = "1280x720"; // Desired size

    return thumbnail.replace("{width}x{height}", size);
  }

  return thumbnail;
};

// Platform-specific styling
export const getPlatformBgColor = (platform: StreamPlatform): string => {
  switch (platform) {
    case "twitch":
      return "bg-platform-twitch";
    case "youtube":
      return "bg-platform-youtube";
    case "kick":
      return "bg-platform-kick";
    default:
      return "bg-blue-600";
  }
};

// Helper function to generate a consistent key for streams from different platforms
export const getStreamKey = (stream: Stream): string => {
  return `${stream.platform}-${stream.id} - ${stream.viewer_count}`;
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

// Map platform to the corresponding Tailwind class
export const getPlatformCursorClass = (platform: StreamPlatform | "all") => {
  switch (platform) {
    case "twitch":
      return "bg-platform-twitch";
    case "youtube":
      return "bg-platform-youtube";
    case "kick":
      return "bg-platform-kick";
    default:
      return "bg-platform-default";
  }
};
