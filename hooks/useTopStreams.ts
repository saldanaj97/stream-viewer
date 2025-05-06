"use client";

import { useQuery } from "@tanstack/react-query";

import { usePublicAuth } from "./usePublicAuth";

import { fetchTopStreams } from "@/services/fetchTopStreams";
import { Stream, StreamPlatform } from "@/types/stream.types";

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
