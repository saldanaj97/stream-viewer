import Link from "next/link";

import CollapsedSidebarSkeleton from "./loading-skeletons/CollapsedSidebarSkeleton";
import { platformsArray } from "./platforms";
import SidebarToggle from "./SidebarToggle";
import { FollowedUser, Platform } from "./types";

import { FollowingHeartIcon } from "@/components/icons";

const CollapsedFollowerList = ({
  platform,
  users,
}: {
  platform: Platform;
  users: FollowedUser[];
}) => {
  if (users && users.length > 5) users = users.slice(0, 5);

  return (
    <div className="mb-6 flex flex-col items-center">
      <div
        className="mb-2 flex h-6 w-6 items-center justify-center rounded-full"
        style={{ color: platform.color }}
      >
        {platform.icon}
      </div>
      <ul className="flex flex-col items-center space-y-2">
        {users.map((user) => (
          <li key={user.id} className="w-full">
            <Link
              className="flex justify-center rounded p-2 hover:bg-gray-700"
              href={`/user/${user.id}`}
              title={user.name}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
                  {user.name.charAt(0)}
                </div>
                {user.isLive && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-800 bg-red-500" />
                )}
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

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-col items-center">
        <SidebarToggle />
        <div className="flex h-8 w-8 items-center justify-center rounded-full">
          <FollowingHeartIcon />
        </div>
      </div>

      {platformsArray.map((platform) => {
        if (!followedStreams) return null;

        const filteredUsers = followedStreams.filter(
          (user) => user.platform === platform.name && user.isLive,
        );

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
