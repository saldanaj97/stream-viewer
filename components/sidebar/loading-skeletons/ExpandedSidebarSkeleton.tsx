import { Skeleton } from "@heroui/skeleton";

export default function ExpandedSidebarSkeleton({
  isPending,
}: {
  isPending: boolean;
}) {
  return (
    <ul className="flex flex-col space-y-2">
      {[...Array(5)].map((_, i) => (
        <li key={i} className="flex items-center space-x-3">
          <Skeleton
            className="h-10 w-10 rounded-full bg-neutral-700"
            isLoaded={!isPending}
          />
          <div className="flex flex-col space-y-2">
            <Skeleton
              className="h-4 w-24 rounded bg-neutral-700"
              isLoaded={!isPending}
            />
            <Skeleton
              className="h-2 w-36 rounded bg-neutral-800"
              isLoaded={!isPending}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
