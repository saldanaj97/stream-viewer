"use client";

import FeaturedStreamsCarousel from "@/components/carousel/FeaturedStreamsCarousel";
import TopStreams from "@/components/top-streams/TopStreams";

export default function Home() {
  return (
    <main className="flex-1 flex-col items-center justify-center p-4">
      <FeaturedStreamsCarousel maxPerPlatform={2} maxStreams={6} />
      <h1 className="my-4 text-2xl font-bold md:text-3xl">Top Streams</h1>
      <TopStreams />
    </main>
  );
}
