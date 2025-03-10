"use client";

import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";
import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);
  const { data: followedStreams, error, isLoading } = useFollowedStreams();

  if (error) return <div>Error loading followed streams: {error.message}</div>;

  return (
    <aside
      className={`h-full overflow-y-auto bg-transparent p-4 shadow-md transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {isSidebarOpen ? (
        <ExpandedSidebar
          followedStreams={followedStreams}
          isLoading={isLoading}
          toggleSidebar={toggleSidebar}
        />
      ) : (
        <CollapsedSidebar
          followedStreams={followedStreams}
          isLoading={isLoading}
          toggleSidebar={toggleSidebar}
        />
      )}
    </aside>
  );
}
