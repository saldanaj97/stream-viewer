"use client";

import { useEffect, useState } from "react";

import { fetchFollowedStreams } from "@/services/fetchFollowedStreams";
import { FollowedUser } from "@/types/sidebar.types";

export function useFollowedStreams() {
  const [streams, setStreams] = useState<FollowedUser[] | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    async function loadStreams() {
      try {
        const { data, error } = await fetchFollowedStreams();

        if (controller.signal.aborted) return;

        if (error) {
          setError(() => error);
        } else {
          setStreams(() => data);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(() =>
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadStreams();

    return () => controller.abort();
  }, []);

  return { streams, error, isLoading };
}
