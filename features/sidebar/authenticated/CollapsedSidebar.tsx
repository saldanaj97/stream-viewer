import Link from "next/link";

import CollapsedSidebarSkeleton from "../loading-skeletons/CollapsedSidebarSkeleton";
import { platformsArray } from "../platforms";
import SidebarToggle from "../SidebarToggle";

import { FollowingHeartIcon } from "@/components/icons";
import { FollowedUser, Platform } from "@/types/sidebar.types";

const CollapsedFollowerList = ({
  platform,
  users,
}: {
  platform: Platform;
  users: FollowedUser[];
}) => {
  if (users && users.length > 5) users = users.slice(0, 5);

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ color: platform.color }}
      >
        {platform.icon}
      </div>
      <ul className="flex flex-col items-center space-y-2">
        {users.map((user) => (
          <li key={user.id} className="w-full">
            <Link
              className="flex justify-center rounded p-2 hover:bg-gray-700"
              href={`/watch/?platform=${user.platform}&channel=${user.user_name}&id=${user.id}`}
              title={user.user_name}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
                  {user.user_name.charAt(0)}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CollapsedSidebar({
  followedStreams,
  isLoading,
}: {
  followedStreams: FollowedUser[] | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <CollapsedSidebarSkeleton />;
  }

  if (!followedStreams) return;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-4">
        <SidebarToggle />
        <FollowingHeartIcon />
      </div>

      {platformsArray.map((platform) => {
        if (followedStreams && followedStreams.length === 0) return;
        const filteredUsers = followedStreams
          .filter(
            (user) => user.platform === platform.name && user.type === "live",
          )
          .sort((a, b) => b.viewer_count - a.viewer_count); // Sort by viewer count in descending order

        return (
          <CollapsedFollowerList
            key={platform.name}
            platform={platform}
            users={filteredUsers}
          />
        );
      })}
    </div>
  );
}
