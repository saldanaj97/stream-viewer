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
    <div className="relative h-full overflow-hidden bg-transparent p-4 shadow-md">
      {isSidebarOpen ? (
        <ExpandedSidebar
          followedStreams={streams}
          isLoading={isTwitchLoading && isYoutubeLoading}
          platformLoadingStates={loadingStates}
        />
      ) : (
        <CollapsedSidebar
          followedStreams={streams}
          isLoading={isTwitchLoading && isYoutubeLoading}
          platformLoadingStates={loadingStates}
        />
      )}
    </div>
  );
}
