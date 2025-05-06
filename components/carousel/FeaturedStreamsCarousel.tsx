import { Skeleton } from "@heroui/skeleton";
import { useMemo } from "react";

import TopStreamCarousel from "./TopStreamCarousel";
import { getRandomStreamsForCarousel } from "./carousel-utils";

import { useTopStreams } from "@/hooks/useTopStreams";

const MAX_STREAMS = 6;
const MAX_PER_PLATFORM = 2;

export const FeaturedStreamsCarousel = () => {
  const { data: allStreams, error, isPending } = useTopStreams();

  // Select random streams from each platform for the carousel
  const carouselStreams = useMemo(() => {
    if (!allStreams) return [];
    // Flatten all streams from all platforms into a single array
    const flatStreams = [
      ...allStreams.twitch,
      ...allStreams.youtube,
      ...allStreams.kick,
    ];

    return getRandomStreamsForCarousel(
      flatStreams,
      MAX_PER_PLATFORM,
      MAX_STREAMS,
    );
  }, [allStreams]);

  if (isPending) {
    return <CarouselSkeleton isLoading={isPending} />;
  }

  if (error || carouselStreams.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto">
      <TopStreamCarousel streams={carouselStreams} />
    </div>
  );
};

const CarouselSkeleton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="embla mx-auto max-w-[72rem]">
      <Skeleton
        className="rounded-[1.8rem] bg-neutral-700"
        isLoaded={!isLoading}
        style={{ height: "var(--slide-height, 28rem)" }}
      />
      <div className="mt-7 flex justify-between">
        <div className="flex gap-2">
          {/* Button skeletons */}
          <Skeleton
            className="h-9 w-9 rounded-full bg-neutral-700"
            isLoaded={!isLoading}
          />
          <Skeleton
            className="h-9 w-9 rounded-full bg-neutral-700"
            isLoaded={!isLoading}
          />
        </div>
        <div className="flex gap-1">
          {/* Dots skeletons */}
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-4 w-4 rounded-full bg-neutral-700"
              isLoaded={!isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedStreamsCarousel;
