// filepath: /Users/juansaldana/Projects/omniview-frontend/components/sidebar/streamer-utils.ts
import { FollowedStreamer } from "@/types/sidebar.types";

/**
 * Generates the correct URL parameters for a streamer based on their platform
 * @param streamer The streamer object from the API
 * @returns An object with the correct channel and id values for the URL
 */
export const getStreamerLinkParams = (streamer: FollowedStreamer) => {
  // Handle YouTube-specific logic: use video_id and user_name
  if (streamer.platform === "youtube") {
    return {
      channel: streamer.user_name,
      // Use video_id if available, fallback to id (channel ID)
      id: streamer.video_id || streamer.id,
    };
  }

  // For other platforms (Twitch, etc.), use the default behavior
  return {
    channel: streamer.user_login,
    id: streamer.id,
  };
};

/**
 * Generates the URL for a streamer's watch page
 * @param streamer The streamer object from the API
 * @returns The URL string for the streamer's watch page
 */
export const getStreamerWatchUrl = (streamer: FollowedStreamer): string => {
  const params = getStreamerLinkParams(streamer);

  return `/watch?platform=${streamer.platform.toLowerCase()}&channel=${params.channel}&id=${params.id}`;
};
