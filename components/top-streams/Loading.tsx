export const StreamsLoadingSkeleton = () => {
  // Create an array of 6 placeholders
  const skeletons = Array(6).fill(null);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skeletons.map((_, index) => (
        <div key={index} className="block">
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

              {/* Mature content badge placeholder (showing on some skeletons) */}
              {index % 3 === 0 && (
                <div className="absolute left-2 top-2 h-5 w-8 animate-pulse rounded bg-gray-700" />
              )}
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
  );
};
