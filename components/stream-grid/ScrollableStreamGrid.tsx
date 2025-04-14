import { ScrollShadow } from "@heroui/scroll-shadow";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { StreamCard } from "./StreamCard";
import { getStreamKey } from "./utils";

import { Stream } from "@/types/stream.types";

interface ScrollableStreamGridProps {
  streams: Stream[];
  title?: string;
}

export const ScrollableStreamGrid = ({
  streams,
  title,
}: ScrollableStreamGridProps) => {
  // Sort streams by viewer count in descending order (highest first)
  const sortedStreams = useMemo(
    () => [...streams].sort((a, b) => b.viewer_count - a.viewer_count),
    [streams],
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check if we can scroll left or right
  const checkScrollable = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth,
    );
  }, []);

  // Function to handle scrolling left or right
  const handleScroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const scrollAmount = 800;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  }, []);

  // Add event listener for scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    // Initial check
    checkScrollable();

    // Add scroll event listener
    container.addEventListener("scroll", checkScrollable);

    // Add resize listener to recheck on window resize
    window.addEventListener("resize", checkScrollable);

    return () => {
      container.removeEventListener("scroll", checkScrollable);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [checkScrollable]);

  const ScrollButton = ({ direction }: { direction: "left" | "right" }) => {
    const isLeft = direction === "left";
    const showButton = isLeft ? canScrollLeft : canScrollRight;

    if (!showButton) return null;

    return (
      <button
        aria-label={`Scroll ${direction}`}
        className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-lg hover:bg-black/80 ${
          isLeft ? "left-0" : "right-0"
        }`}
        onClick={() => handleScroll(direction)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
    );
  };

  return (
    <div className="w-full">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      <div className="relative w-full">
        <ScrollButton direction="left" />

        <ScrollShadow
          ref={scrollContainerRef}
          className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent flex snap-x gap-4 overflow-x-auto pb-4"
          orientation="horizontal"
        >
          {sortedStreams.map((stream) => (
            <div
              key={getStreamKey(stream)}
              className="min-w-[360px] max-w-[640px] snap-start"
            >
              <StreamCard stream={stream} />
            </div>
          ))}
        </ScrollShadow>

        <ScrollButton direction="right" />
      </div>
    </div>
  );
};
