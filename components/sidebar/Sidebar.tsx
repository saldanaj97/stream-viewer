"use client";

import { Button } from "@heroui/button";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

import { useAuthStatus } from "@/hooks/useAuthStatusCheck";
import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function Sidebar() {
  const { error, platforms, isLoading, refetch } = useAuthStatus();
  const { isSidebarOpen } = useSidebarStore((state) => state);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-2 text-lg">⚠️ Unable to load sidebar</div>
        <p className="text-muted-foreground mb-3">
          We ran into an issue while checking your login status.
        </p>
        <Button size="sm" onPress={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const userLoggedInPlatformCount = Object.values(platforms).filter(
    (platform) => platform,
  ).length;

  if (!isLoading && userLoggedInPlatformCount === 0) {
    return null;
  }

  return (
    <aside
      className={`flex-shrink-0 border-r border-divider transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-72" : "w-20"}`}
    >
      <AuthenticatedSidebar />
    </aside>
  );
}

{
  /* Platform loading indicators */
}
{
  /* <div className="mb-4 flex gap-4">
        {platformStatus.twitch.isLoading && (
          <div className="flex items-center rounded-md bg-purple-900/20 px-3 py-1 text-purple-400">
            <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
            <span className="text-xs">Loading Twitch streams...</span>
          </div>
        )}
        {platformStatus.youtube.isLoading && (
          <div className="flex items-center rounded-md bg-red-900/20 px-3 py-1 text-red-400">
            <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
            <span className="text-xs">Loading YouTube streams...</span>
          </div>
        )}
      </div> */
}
