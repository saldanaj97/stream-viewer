"use client";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

import { useAuthStore } from "@/providers/auth-store-provider";
import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function Sidebar() {
  const platforms = useAuthStore((state) => state.platforms);
  const { isSidebarOpen } = useSidebarStore((state) => state);

  const userLoggedInPlatformCount = Object.values(platforms).filter(
    (platform) => platform,
  ).length;

  if (userLoggedInPlatformCount === 0) {
    return null;
  }

  return (
    <aside
      className={`border-divider h-full shrink-0 overflow-y-auto border-r transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-72" : "w-16"}`}
    >
      <AuthenticatedSidebar />
    </aside>
  );
}
