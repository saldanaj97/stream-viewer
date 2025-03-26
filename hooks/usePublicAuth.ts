"use client";

import { useEffect, useState } from "react";

import { PublicAuthResponse } from "@/types/response.types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const usePublicAuth = (): PublicAuthResponse => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/twitch/authenticated`);

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
