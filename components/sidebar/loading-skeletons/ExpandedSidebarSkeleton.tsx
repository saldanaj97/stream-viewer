import { Skeleton } from "@heroui/skeleton";

export default function ExpandedSidebarSkeleton({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <ul className="flex flex-col space-y-2">
      {[...Array(5)].map((_, i) => (
        <li key={i} className="flex items-center space-x-3">
          <Skeleton
            className="h-10 w-10 rounded-full bg-neutral-700"
            isLoaded={!isLoading}
          />
          <div className="flex flex-col space-y-2">
            <Skeleton
              className="h-4 w-24 rounded-sm bg-neutral-700"
              isLoaded={!isLoading}
            />
            <Skeleton
              className="h-2 w-36 rounded-sm bg-neutral-800"
              isLoaded={!isLoading}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
