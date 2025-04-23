import { Skeleton } from "@heroui/skeleton";

export default function CollapsedSidebarSkeleton({
  isPending,
}: {
  isPending: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center space-y-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton
          key={i}
          className="h-10 w-10 rounded-full bg-neutral-700"
          isLoaded={!isPending}
        />
      ))}
    </div>
  );
}
