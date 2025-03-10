"use client";

import TopStreams from "@/features/top-streams/TopStreams";
import { usePublicAuth } from "@/hooks/usePublicAuth";

export default function Home() {
  const { error, isLoading } = usePublicAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the top streams. </div>;

  return (
    <main className="flex-1 p-4">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Top Streams</h1>
      <TopStreams />
    </main>
  );
}
