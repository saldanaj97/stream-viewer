"use client";

import { Button } from "@heroui/button";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

import { useAuthStatus } from "@/hooks/useAuthStatusCheck";

export default function Sidebar() {
  const { error, platforms, isLoading, refetch } = useAuthStatus();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-2 text-lg">⚠️ Unable to load sidebar</div>
        <p className="text-muted-foreground mb-3">
          We ran into an issue while checking your login status.
        </p>
        <Button size="sm" onClick={() => refetch()}>
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

  return <AuthenticatedSidebar />;
}
