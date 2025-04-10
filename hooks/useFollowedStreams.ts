"use client";

import { useTwitchFollowedStreams } from "./useTwitchFollowedStreams";
import { useYoutubeFollowedStreams } from "./useYoutubeFollowedStreams";

import { FollowedUser } from "@/types/sidebar.types";

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

  // Combine data from both platforms
  const combinedData: FollowedUser[] = [
    ...(twitchData || []),
    ...(youtubeData || []),
  ];

  // Combine errors if any
  const error = twitchError || youtubeError || null;

  // Consider loading complete when both are done or if one has errored
  const isLoading = (isTwitchLoading || isYoutubeLoading) && !error;

  return {
    data: combinedData,
    error,
    isLoading,
    platformStatus: {
      twitch: { isLoading: isTwitchLoading, hasError: !!twitchError },
      youtube: { isLoading: isYoutubeLoading, hasError: !!youtubeError },
    },
  };
}
