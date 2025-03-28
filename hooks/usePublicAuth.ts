"use client";

import { useEffect, useState } from "react";

import { ENV } from "@/data/env";
import { PublicAuthResponse } from "@/types/response.types";

export const usePublicAuth = (): PublicAuthResponse => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${ENV.apiUrl}/api/twitch/authenticated`);

        if (!response.ok) {
          throw new Error("Failed to fetch authentication data");
        }
        const result = await response.json();

        setData(result);
        setSuccess(true);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
        setSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading, success };
};
