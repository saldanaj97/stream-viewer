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
