"use client";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

import { useAuthStatus } from "@/hooks/useAuthStatusCheck";
import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function Sidebar() {
  const { error, platforms, isLoading } = useAuthStatus();
  const { isSidebarOpen } = useSidebarStore((state) => state);

  if (error) {
    return null;
  }

  const userLoggedInPlatformCount = Object.values(platforms).filter(
    (platform) => platform,
  ).length;

  if (!isLoading && userLoggedInPlatformCount === 0) {
    return null;
  }

  return (
    <aside
      className={`h-full flex-shrink-0 overflow-y-auto border-r border-divider transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-72" : "w-20"}`}
    >
      <AuthenticatedSidebar />
    </aside>
  );
}
