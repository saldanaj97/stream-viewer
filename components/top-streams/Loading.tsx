import { Skeleton } from "@heroui/skeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { PLATFORM_ICONS } from "../sidebar/platforms";

export const PlatformLoadingSkeleton = ({
  isLoading = true,
}: {
  isLoading?: boolean;
}) => {
  // Create an array of 5 placeholders
  const skeletons = Array(10).fill(null);

  return (
    <div className="relative">
      <div className="flex snap-x gap-4 overflow-x-auto pb-4">
        {skeletons.map((_, index) => (
          <div key={index} className="min-w-[360px] max-w-[640px] snap-start">
            <div className="overflow-hidden rounded-lg bg-neutral-500 dark:bg-neutral-900">
              <div className="relative">
                {/* Thumbnail placeholder */}
                <Skeleton
                  className="aspect-video w-full bg-neutral-700"
                  isLoaded={!isLoading}
                />

                {/* Stream type badge placeholder */}
                <Skeleton
                  className="absolute bottom-2 left-2 h-5 w-16 rounded bg-neutral-700"
                  isLoaded={!isLoading}
                />

                {/* Viewer count placeholder */}
                <Skeleton
                  className="absolute bottom-2 right-2 h-5 w-20 rounded bg-neutral-700"
                  isLoaded={!isLoading}
                />

                {/* Duration placeholder */}
                <Skeleton
                  className="absolute right-2 top-2 h-5 w-14 rounded bg-neutral-700"
                  isLoaded={!isLoading}
                />

                {/* Platform badge placeholder */}
                <Skeleton
                  className="absolute left-2 top-2 h-7 w-7 rounded bg-neutral-700"
                  isLoaded={!isLoading}
                />
              </div>

              <div className="p-3">
                <div className="flex items-start">
                  {/* Avatar placeholder */}
                  <Skeleton
                    className="h-10 w-10 shrink-0 rounded-full bg-neutral-700"
                    isLoaded={!isLoading}
                  />

                  <div className="ml-3 w-full">
                    {/* Title placeholder */}
                    <Skeleton
                      className="mb-2 h-4 w-4/5 rounded bg-neutral-700"
                      isLoaded={!isLoading}
                    />

                    {/* Username placeholder */}
                    <Skeleton
                      className="mb-2 h-3 w-3/5 rounded bg-neutral-700"
                      isLoaded={!isLoading}
                    />

                    {/* Game name placeholder */}
                    <Skeleton
                      className="h-3 w-2/5 rounded bg-neutral-700"
                      isLoaded={!isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StreamsLoadingSkeleton = ({
  isLoading = true,
}: {
  isLoading?: boolean;
}) => {
  // Create 3 platform sections (Twitch, YouTube, Kick)
  const platforms = ["Twitch", "YouTube", "Kick"];

  return (
    <div className="flex flex-col space-y-8">
      {platforms.map((platform) => {
        const { color, icon, text } =
          PLATFORM_ICONS[platform] ?? PLATFORM_ICONS.default;

        return (
          <section key={platform} className="w-full">
            <h1 className="text-2xl font-bold md:text-3xl">Top Streams</h1>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <span className={text}>{icon}</span>
                <h2 className="text-xl font-bold">
                  Live channels on {platform}
                </h2>
              </div>
              <Link
                className={`flex items-center rounded-md px-3 py-1 text-sm ${color} text-background-500 hover:bg-opacity-50`}
                href={`/browse`}
              >
                See all
                <ChevronRight className="ml-1" size={16} />
              </Link>
            </div>

            <PlatformLoadingSkeleton isLoading={isLoading} />
          </section>
        );
      })}
    </div>
  );
};
