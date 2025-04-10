"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchLiveSubscribedYoutubeStreams } from "@/services/fetchFollowedStreamsLive";

export function useYoutubeFollowedStreams() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["followedStreams", "youtube"],
    queryFn: async () => {
      const { data, error } = await fetchLiveSubscribedYoutubeStreams();

      if (error) {
        console.log("Error fetching YouTube followed streams:", error);
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
