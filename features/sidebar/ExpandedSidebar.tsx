import Link from "next/link";

import ExpandedSidebarSkeleton from "./loading-skeletons/ExpandedSidebarSkeleton";
import { platformsArray } from "./platforms";
import SidebarToggle from "./SidebarToggle";
import { FollowedUser, Platform } from "./types";

const ExpandedFollowerList = ({
  platform,
  users,
}: {
  platform: Platform;
  users: FollowedUser[];
}) => {
  if (users && users.length > 5) users = users.slice(0, 5);

  return (
    <div className="mb-6">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        <span style={{ color: platform.color }}>{platform.icon}</span>
        {platform.name}
      </h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="w-full">
            <Link
              className="flex items-center rounded p-2 hover:bg-gray-700"
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
              <div className="ml-3 overflow-hidden">
                <span className="block truncate font-medium">{user.name}</span>
                {user.isLive && user.viewers && (
                  <p className="text-xs text-gray-400">
                    {new Intl.NumberFormat().format(user.viewers)} viewers
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ExpandedSidebar({
  followedStreams,
  isLoading,
}: {
  followedStreams: FollowedUser[] | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <ExpandedSidebarSkeleton />;
  }
  if (!followedStreams) return null;

  return (
    <>
      <div className="flex flex-row justify-between">
        <h2 className="mb-4 text-xl font-bold">Followed Channels</h2>
        <SidebarToggle />
      </div>
      {platformsArray.map((platform) => {
        if (followedStreams.length === 0) {
          return (
            <div key={platform.name} className="flex flex-col items-center">
              <h2 className="mb-4 text-xl font-bold">No followed channels</h2>
            </div>
          );
        }
        const filteredUsers = followedStreams.filter(
          (user) => user.platform === platform.name && user.isLive,
        );

        return (
          <ExpandedFollowerList
            key={platform.name}
            platform={platform}
            users={filteredUsers}
          />
        );
      })}
    </>
  );
}
