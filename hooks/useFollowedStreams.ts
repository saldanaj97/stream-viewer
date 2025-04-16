"use client";

import { useTwitchFollowedStreams } from "./useTwitchFollowedStreams";
import { useYoutubeFollowedStreams } from "./useYoutubeFollowedStreams";

export function useFollowedStreams() {
  const {
    data: twitchData = [],
    error: twitchError,
    isLoading: isTwitchLoading,
  } = useTwitchFollowedStreams();

  const {
    data: youtubeData = [],
    error: youtubeError,
    isLoading: isYoutubeLoading,
  } = useYoutubeFollowedStreams();

  return {
    twitch: {
      data: twitchData,
      error: twitchError,
      isLoading: isTwitchLoading,
    },
    youtube: {
      data: youtubeData,
      error: youtubeError,
      isLoading: isYoutubeLoading,
    },
  };
}
