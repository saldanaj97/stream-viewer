"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchFollowedTwitchStreams } from "@/services/fetchFollowedTwitchStreams";

export function useFollowedStreams(pollingInterval = 120000) {
  const {
    data: streams,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["followedStreams", "Twitch"],
    queryFn: async () => {
      const { data, error } = await fetchFollowedTwitchStreams("Twitch");

      if (error) {
        throw error;
      }

      return data;
    },
    refetchInterval: pollingInterval, // Poll every minute
    refetchIntervalInBackground: false, // Only poll when tab is visible
    refetchOnWindowFocus: true, // Refetch when window is focused and data is stale
    staleTime: 60000,
  });

  return { streams, error, isLoading };
}
