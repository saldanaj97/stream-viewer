import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

import { useFollowedStreams } from "@/hooks/useFollowedStreams";

export default function AuthenticatedSidebar() {
  const { streams, error, isLoading } = useFollowedStreams();

  if (error) {
    console.log(error);

    return;
  }

  return (
    <aside className="h-full overflow-y-auto bg-transparent p-4 shadow-md transition-all duration-300 ease-in-out">
      <ExpandedSidebar followedStreams={streams} isLoading={isLoading} />
      <CollapsedSidebar followedStreams={streams} isLoading={isLoading} />
    </aside>
  );
}
