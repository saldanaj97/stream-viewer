"use client";

import useSWR from "swr";

import TopStreams from "../components/top-streams/TopStreams";

import { authFetcher } from "@/helpers/fetchers";

export default function Home() {
  // TODO: Move this into the hooks folder
  const { error, isLoading } = useSWR(
    "http://localhost:8000/api/auth/",
    authFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 3600000,
    },
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the top streams. </div>;

  return (
    <main className="flex-1 p-4">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Top Streams</h1>
      <TopStreams />
    </main>
  );
}
