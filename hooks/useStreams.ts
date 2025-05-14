"use client";

import { useQuery } from "@tanstack/react-query";

import { usePublicAuth } from "./useAuth";

import { fetchAllFollowedStreams } from "@/services/fetchFollowedStreamsLive";
import { fetchTopStreams } from "@/services/fetchTopStreams";
import { Stream, StreamPlatform } from "@/types/stream.types";

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

export function useTopStreams() {
  const { success } = usePublicAuth();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["topStreams"],
    queryFn: () => fetchTopStreams(),
    enabled: !!success,
    refetchInterval: 120000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 60000,
  });

  // Always return a grouped object, even if data is undefined
  const grouped: Record<StreamPlatform, Stream[]> = {
    twitch: data?.twitch || [],
    youtube: data?.youtube || [],
    kick: data?.kick || [],
  };

  return {
    data: grouped,
    error,
    isPending,
    refetch,
  };
}
