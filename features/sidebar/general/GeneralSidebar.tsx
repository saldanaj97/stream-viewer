"use client";

import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";

export default function GeneralSidebar() {
  const { data: followedStreams, error, isLoading } = useFollowedStreams();

  if (error) console.log(error);

  return (
    <aside className="h-full overflow-y-auto bg-transparent p-4 shadow-md transition-all duration-300 ease-in-out">
      <ExpandedSidebar
        followedStreams={followedStreams}
        isLoading={isLoading}
      />
      <CollapsedSidebar
        followedStreams={followedStreams}
        isLoading={isLoading}
      />
    </aside>
  );
}
