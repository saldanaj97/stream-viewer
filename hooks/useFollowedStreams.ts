"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchFollowedStreamsLive } from "@/services/fetchFollowedStreamsLive";

export function useFollowedStreams() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["followedStreams"],
    queryFn: async () => {
      const { data, errors } = await fetchFollowedStreamsLive();

      if (errors && Object.keys(errors).length > 0) {
        // Log errors but don't throw - we still want to display any data we got
        console.log("Errors fetching followed streams:", errors);
      }

      return data;
    },
    refetchInterval: 120000, // Poll every 2 minutes
    refetchIntervalInBackground: false, // Only poll when tab is visible
    refetchOnWindowFocus: true, // Refetch when window is focused and data is stale
    staleTime: 60000,
  });

  return { data, error, isLoading };
}
