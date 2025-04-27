"use client";

import FeaturedStreamsCarousel from "@/components/carousel/FeaturedStreamsCarousel";
import TopStreams from "@/components/top-streams/TopStreams";

export default function Home() {
  return (
    <main className="flex-col items-center justify-center py-8">
      <FeaturedStreamsCarousel />
      <TopStreams />
    </main>
  );
}
