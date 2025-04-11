"use client";

import TopStreams from "@/components/top-streams/TopStreams";

export default function Home() {
  return (
    <main className="flex-1 px-4">
      <h1 className="my-4 text-2xl font-bold md:text-3xl">Top Streams</h1>
      <TopStreams />
    </main>
  );
}
