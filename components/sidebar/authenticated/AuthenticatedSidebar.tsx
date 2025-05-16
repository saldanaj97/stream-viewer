import { useState } from "react";

import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useStreams";
import { useSidebarStore } from "@/providers/sidebar-store-provider";
import { PlatformKey } from "@/types/sidebar.types";

export default function AuthenticatedSidebar() {
  const { twitch, youtube } = useFollowedStreams();
  const { isSidebarOpen } = useSidebarStore((state) => state);

  const [expandedPlatforms, setExpandedPlatforms] = useState<
    Record<PlatformKey, boolean>
  >({ Twitch: false, YouTube: false });

  const toggleExpandPlatform = (platform: PlatformKey) => {
    setExpandedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  if (twitch.error && youtube.error) {
    return (
      <div>
        Error loading followed streams:
        {twitch.error.message || youtube.error.message}
      </div>
    );
  }

  return (
    <div className="relative h-full bg-transparent p-4 shadow-md">
      {isSidebarOpen ? (
        <ExpandedSidebar
          expandedPlatforms={expandedPlatforms}
          toggleExpandPlatform={toggleExpandPlatform}
          twitch={twitch}
          youtube={youtube}
        />
      ) : (
        <CollapsedSidebar
          expandedPlatforms={expandedPlatforms}
          toggleExpandPlatform={toggleExpandPlatform}
          twitch={twitch}
          youtube={youtube}
        />
      )}
    </div>
  );
}
