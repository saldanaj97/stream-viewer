"use client";

import { useEffect, useState } from "react";

import { usePublicAuth } from "./usePublicAuth";

import { ENV } from "@/data/env";
import { mockTopStreams } from "@/data/mockData";
import { Stream } from "@/types/stream.types";

export function useTopStreams() {
  const { data: authData, success } = usePublicAuth();

  const [data, setData] = useState<Stream[] | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Use mock data in development
      if (ENV.isDevelopment) {
        setData(mockTopStreams);
        setIsLoading(false);

        return;
      }

      try {
        const response = await fetch(
          `${ENV.apiUrl}/api/twitch/public/top-streams`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${authData?.access_token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setData(await response.json());
        setError(null);
      } catch (error) {
        console.error("Failed to fetch top streams:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch data if authData is available and the auth request was successful
    if (success && authData) {
      fetchData();
    } else {
      setData([]);
    }
  }, [authData]);

  return { data, error, isLoading };
}
