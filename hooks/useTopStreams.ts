"use client";

import { useQuery } from "@tanstack/react-query";

import { usePublicAuth } from "./usePublicAuth";

import { fetchTopStreams } from "@/services/fetchTopStreams";

export function useTopStreams() {
  const { success } = usePublicAuth();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["topStreams"],
    queryFn: () => fetchTopStreams(),
    enabled: !!success,
    refetchInterval: 120000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 60000,
  });

  return { data: data || [], error, isLoading, isFetching };
}
