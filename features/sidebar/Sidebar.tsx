"use client";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";

export default function Sidebar() {
  const { streams, error, isLoading } = useFollowedStreams();

  if (isLoading || error || streams === undefined) {
    return null;
  }

  return <AuthenticatedSidebar />;
}
