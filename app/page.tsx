"use client";

import TopStreams from "@/features/top-streams/TopStreams";

export default function Home() {
  return (
    <main className="flex-1 p-4">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Top Streams</h1>
      <TopStreams />
    </main>
  );
}
