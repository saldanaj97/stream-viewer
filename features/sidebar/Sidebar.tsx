"use client";

import { useState } from "react";

import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: followedStreams, error, isLoading } = useFollowedStreams();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (error) return <div>Error loading followed streams: {error.message}</div>;

  return (
    <aside
      className={`h-full overflow-y-auto bg-transparent p-4 shadow-md transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {isOpen ? (
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
