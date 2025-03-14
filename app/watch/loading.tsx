export default function Loading() {
  return (
    <div className="flex flex-row gap-4">
      <div className="container aspect-video min-h-[300px] w-full min-w-[400px] animate-pulse rounded-lg bg-foreground-300">
        {/* Video area loading placeholder */}
      </div>

      <div className="h-[900px] w-[340px] animate-pulse rounded-lg bg-foreground-300">
        {/* Chat loading placeholder */}
      </div>
    </div>
  );
}
