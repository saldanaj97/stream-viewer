"use client";

import { useEffect, useState } from "react";

import { FollowedUser } from "@/features/sidebar/types";
import { fetchFollowedStreams } from "@/services/fetchFollowedStreams";

// Hook for client components to use the data with loading state
export function useFollowedStreams() {
  const [streams, setStreams] = useState<FollowedUser[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStreams() {
      setIsLoading(true);
      const { data, error } = await fetchFollowedStreams();

      if (isMounted) {
        setStreams(data);
        setError(error);
        setIsLoading(false);
      }
    }

    loadStreams();

    return () => {
      isMounted = false;
    };
  }, []);

  return { streams, error, isLoading };
}
