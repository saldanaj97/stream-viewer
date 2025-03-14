import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";
import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function AuthenticatedSidebar() {
  const { streams, error, isLoading } = useFollowedStreams();
  const { isSidebarOpen } = useSidebarStore((state) => state);

  if (error) {
    console.log(error);

    return;
  }

  return (
    <aside
      className={`relative h-full overflow-hidden bg-transparent p-4 shadow-md transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}
    >
      <div
        className={`absolute left-0 top-0 w-72 p-4 ${isSidebarOpen ? "translate-x-0" : "-translate-x-72"} transition-transform duration-300`}
      >
        <ExpandedSidebar followedStreams={streams} isLoading={isLoading} />
      </div>
      <div
        className={`absolute right-0 top-0 w-20 p-4 ${isSidebarOpen ? "translate-x-72" : "translate-x-0"} transition-transform duration-300`}
      >
        <CollapsedSidebar followedStreams={streams} isLoading={isLoading} />
      </div>
    </aside>
  );
}
