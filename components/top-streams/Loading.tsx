export const PlatformLoadingSkeleton = () => {
  // Create an array of 5 placeholders
  const skeletons = Array(5).fill(null);

  return (
    <div className="relative">
      <div className="flex snap-x gap-4 overflow-x-auto pb-4">
        {skeletons.map((_, index) => (
          <div key={index} className="min-w-[300px] max-w-[300px] snap-start">
            <div className="overflow-hidden rounded-lg bg-gray-800">
              <div className="relative">
                {/* Thumbnail placeholder */}
                <div className="aspect-video w-full animate-pulse bg-gray-700" />

                {/* Stream type badge placeholder */}
                <div className="absolute bottom-2 left-2 h-5 w-16 animate-pulse rounded bg-gray-700" />

                {/* Viewer count placeholder */}
                <div className="absolute bottom-2 right-2 h-5 w-20 animate-pulse rounded bg-gray-700" />

                {/* Duration placeholder */}
                <div className="absolute right-2 top-2 h-5 w-14 animate-pulse rounded bg-gray-700" />

                {/* Platform badge placeholder */}
                <div className="absolute left-2 top-2 h-7 w-7 animate-pulse rounded bg-gray-700" />
              </div>

              <div className="p-3">
                <div className="flex items-start">
                  {/* Avatar placeholder */}
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-700" />

                  <div className="ml-3 w-full">
                    {/* Title placeholder */}
                    <div className="mb-2 h-4 w-4/5 animate-pulse rounded bg-gray-700" />

                    {/* Username placeholder */}
                    <div className="mb-2 h-3 w-3/5 animate-pulse rounded bg-gray-700" />

                    {/* Game name placeholder */}
                    <div className="h-3 w-2/5 animate-pulse rounded bg-gray-700" />
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

export const StreamsLoadingSkeleton = () => {
  // Create 3 platform sections (Twitch, YouTube, Kick)
  const platforms = ["Twitch", "YouTube", "Kick"];

  return (
    <div className="flex flex-col space-y-8">
      {platforms.map((platform, index) => (
        <section key={platform} className="w-full">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-7 w-48 animate-pulse rounded bg-gray-700" />
            <div className="h-7 w-20 animate-pulse rounded bg-gray-700" />
          </div>

          <PlatformLoadingSkeleton />
        </section>
      ))}
    </div>
  );
};
