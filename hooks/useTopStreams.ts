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
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { data: data || [], error, isLoading, isFetching };
}
