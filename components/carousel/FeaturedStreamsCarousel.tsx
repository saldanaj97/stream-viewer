import React, { useMemo } from "react";

import TopStreamCarousel from "./StreamCarousel";
import { getRandomStreamsForCarousel } from "./carousel-utils";

import { useTopStreams } from "@/hooks/useTopStreams";

interface FeaturedStreamsCarouselProps {
  maxStreams?: number;
  maxPerPlatform?: number;
}

export const FeaturedStreamsCarousel: React.FC<
  FeaturedStreamsCarouselProps
> = ({ maxStreams = 6, maxPerPlatform = 2 }) => {
  const { data: allStreams, error, isPending } = useTopStreams();

  // Select random streams from each platform for the carousel
  const carouselStreams = useMemo(() => {
    if (!allStreams || allStreams.length === 0) return [];

    return getRandomStreamsForCarousel(allStreams, maxPerPlatform, maxStreams);
  }, [allStreams, maxPerPlatform, maxStreams]);

  if (isPending) {
    return <CarouselSkeleton />;
  }

  if (error || carouselStreams.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="mb-4 text-2xl font-bold">Featured Streams</h2>
      <TopStreamCarousel streams={carouselStreams} />
    </div>
  );
};

const CarouselSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-700" />
      <div className="aspect-[16/7] w-full animate-pulse rounded-lg bg-gray-800">
        <div className="flex h-full items-center justify-center">
          <span className="text-gray-600">Loading featured streams...</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStreamsCarousel;
