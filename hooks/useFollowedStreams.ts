"use client";

import { useAllFollowedStreams } from "./useAllFollowedStreams";

export function useFollowedStreams() {
  const { data, error, isLoading } = useAllFollowedStreams();

  // Return in the same structure as before to avoid breaking existing code
  return {
    twitch: {
      data: data?.twitch.data || [],
      error: data?.twitch.error,
      isLoading,
    },
    youtube: {
      data: data?.youtube.data || [],
      error: data?.youtube.error,
      isLoading,
    },
  };
}
