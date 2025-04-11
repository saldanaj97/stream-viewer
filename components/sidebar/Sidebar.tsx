"use client";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

import { useAuthStatus } from "@/hooks/useAuthStatusCheck";

export default function Sidebar() {
  const { error, platforms, isLoading } = useAuthStatus();

  if (error) {
    return <div>Error loading platforms: {error.message}</div>;
  }

  const userLoggedInPlatformCount = Object.values(platforms).filter(
    (platform) => platform,
  ).length;

  if (!isLoading && userLoggedInPlatformCount === 0) {
    return;
  }

  return <AuthenticatedSidebar />;
}
