import { Skeleton } from "@heroui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto p-4">
      <h1 className="my-4 text-2xl font-bold md:text-3xl">Following</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg bg-gray-800">
            <Skeleton className="aspect-video w-full" />
            <div className="p-3">
              <div className="flex items-start">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="ml-3 overflow-hidden">
                  <Skeleton className="mb-1 h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
