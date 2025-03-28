"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchPublicAuthStatus } from "@/services/fetchPublicAuthStatus";
import { PublicAuthResponse } from "@/types/response.types";

export const usePublicAuth = (): PublicAuthResponse => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["publicAuth"],
    queryFn: fetchPublicAuthStatus,
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

  return {
    data,
    error,
    isLoading,
    success: !!data && !error,
  };
};
