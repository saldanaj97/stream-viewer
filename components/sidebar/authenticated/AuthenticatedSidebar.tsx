import SidebarToggle from "../SidebarToggle";

import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";
import { useTwitchFollowedStreams } from "@/hooks/useTwitchFollowedStreams";
import { useYoutubeFollowedStreams } from "@/hooks/useYoutubeFollowedStreams";
import { useSidebarStore } from "@/providers/sidebar-store-provider";
import { FollowedUser } from "@/types/sidebar.types";

export default function AuthenticatedSidebar() {
  // Get data from platform-specific hooks for progressive loading
  const { data: twitchStreams, isLoading: isTwitchLoading } =
    useTwitchFollowedStreams();
  const { data: youtubeStreams, isLoading: isYoutubeLoading } =
    useYoutubeFollowedStreams();

  // Keep using combined hook for compatibility with other components
  const { error } = useFollowedStreams();
  const { isSidebarOpen } = useSidebarStore((state) => state);

  // Combine available streams as they load
  const streams: FollowedUser[] = [
    ...(twitchStreams || []),
    ...(youtubeStreams || []),
  ];

  // Platform-specific loading states for UI indicators
  const loadingStates = {
    twitch: isTwitchLoading,
    youtube: isYoutubeLoading,
  };

  if (error) {
    return <div>Error loading followed streams: {error.message}</div>;
  }

  return (
    <aside
      className={`relative h-full overflow-hidden bg-transparent p-4 shadow-md transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Add the sidebar toggle button */}
      <SidebarToggle />

      <div
        className={`absolute left-0 top-0 w-72 p-4 ${isSidebarOpen ? "translate-x-0" : "-translate-x-72"} transition-transform duration-300`}
      >
        <ExpandedSidebar
          followedStreams={streams}
          isLoading={isTwitchLoading && isYoutubeLoading}
          platformLoadingStates={loadingStates}
        />
      </div>
      <div
        className={`absolute right-0 top-0 w-20 p-4 ${isSidebarOpen ? "translate-x-72" : "translate-x-0"} transition-transform duration-300`}
      >
        <CollapsedSidebar
          followedStreams={streams}
          isLoading={isTwitchLoading && isYoutubeLoading}
          platformLoadingStates={loadingStates}
        />
      </div>
    </aside>
  );
}
