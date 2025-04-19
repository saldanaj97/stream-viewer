import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";
import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function AuthenticatedSidebar() {
  const { twitch, youtube } = useFollowedStreams();
  const { isSidebarOpen } = useSidebarStore((state) => state);

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
        <ExpandedSidebar twitch={twitch} youtube={youtube} />
      ) : (
        <CollapsedSidebar twitch={twitch} youtube={youtube} />
      )}
    </div>
  );
}
