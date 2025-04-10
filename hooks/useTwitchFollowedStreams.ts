"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchLiveFollowedTwitchStreams } from "@/services/fetchFollowedStreamsLive";

export function useTwitchFollowedStreams() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["followedStreams", "twitch"],
    queryFn: async () => {
      const { data, error } = await fetchLiveFollowedTwitchStreams();

      if (error) {
        console.log("Error fetching Twitch followed streams:", error);
      }

      return data || [];
    },
    refetchInterval: 120000, // Poll every 2 minutes
    refetchIntervalInBackground: false, // Only poll when tab is visible
    refetchOnWindowFocus: true, // Refetch when window is focused and data is stale
    staleTime: 60000,
  });

  return { data, error, isLoading };
}
