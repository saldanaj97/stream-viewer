"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAllFollowedStreams } from "@/services/fetchFollowedStreamsLive";

export function useAllFollowedStreams() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["followedStreams"],
    queryFn: async () => {
      const result = await fetchAllFollowedStreams();

      // Handle any errors that might occur
      if (result.twitch.error) {
        console.log(
          "Error fetching Twitch followed streams:",
          result.twitch.error,
        );
      }

      if (result.youtube.error) {
        console.log(
          "Error fetching YouTube followed streams:",
          result.youtube.error,
        );
      }

      return result;
    },
    refetchInterval: 120000, // Poll every 2 minutes
    refetchIntervalInBackground: false, // Only poll when tab is visible
    staleTime: 60000,
  });

  return {
    data,
    error,
    isLoading,
  };
}
