"use client";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";

export default function Sidebar() {
  const { streams, error, isLoading } = useFollowedStreams();

  // Only show sidebar when:
  // 1. Not loading
  // 2. No error
  // 3. Streams exists as an array (not undefined)
  const shouldShowSidebar = !isLoading && !error && streams !== undefined;

  return (
    <>
      {shouldShowSidebar && (
        <aside className="h-full overflow-y-auto bg-transparent p-4 shadow-md transition-all duration-300 ease-in-out">
          <AuthenticatedSidebar />
        </aside>
      )}
    </>
  );
}
