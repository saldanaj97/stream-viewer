"use client";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";

export default function Sidebar() {
  const { streams, error, isLoading } = useFollowedStreams();

  return (
    <aside className="h-full overflow-y-auto bg-transparent p-4 shadow-md transition-all duration-300 ease-in-out">
      {streams ? (
        <>
          <AuthenticatedSidebar />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">General Sidebar</h1>
          {/* <ExpandedSidebar
            followedStreams={followedStreams}
            isLoading={isLoading}
          />
          <CollapsedSidebar
            followedStreams={followedStreams}
            isLoading={isLoading}
          /> */}
        </>
      )}
    </aside>
  );
}
