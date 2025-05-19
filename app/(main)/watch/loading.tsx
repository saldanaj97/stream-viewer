export default function Loading() {
  return (
    <div className="flex flex-row gap-4">
      <div className="bg-foreground-300 container aspect-video min-h-[300px] w-full min-w-[400px] animate-pulse rounded-lg">
        {/* Video area loading placeholder */}
      </div>

      <div className="bg-foreground-300 h-[900px] w-[340px] animate-pulse rounded-lg">
        {/* Chat loading placeholder */}
      </div>
    </div>
  );
}
