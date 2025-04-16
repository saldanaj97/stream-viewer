import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";
import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function AuthenticatedSidebar() {
  const { twitch, youtube } = useFollowedStreams();
  const { isSidebarOpen } = useSidebarStore((state) => state);

  // if (twitch.isLoading || youtube.isLoading) {
  //   return (
  //     <div className="mb-4 flex flex-col gap-4">
  //       {twitch.isLoading && (
  //         <div className="flex items-center rounded-md bg-purple-900/20 px-3 py-1 text-purple-400">
  //           <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
  //           <span className="text-xs">Loading Twitch streams...</span>
  //         </div>
  //       )}
  //       {youtube.isLoading && (
  //         <div className="flex items-center rounded-md bg-red-900/20 px-3 py-1 text-red-400">
  //           <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
  //           <span className="text-xs">Loading YouTube streams...</span>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  if (twitch.error && youtube.error) {
    return (
      <div>
        Error loading followed streams:
        {twitch.error.message || youtube.error.message}
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-transparent p-4 shadow-md">
      {isSidebarOpen ? (
        <ExpandedSidebar twitch={twitch} youtube={youtube} />
      ) : (
        <CollapsedSidebar twitch={twitch} youtube={youtube} />
      )}
    </div>
  );
}
