import Link from "next/link";

import ExpandedSidebarSkeleton from "../loading-skeletons/ExpandedSidebarSkeleton";
import { platformsArray } from "../platforms";
import SidebarToggle from "../SidebarToggle";

import { FollowedUser, Platform } from "@/types/sidebar.types";

const ExpandedFollowerList = ({
  platform,
  users,
}: {
  platform: Platform;
  users: FollowedUser[];
}) => {
  if (users && users.length > 5) users = users.slice(0, 5);

  return (
    <div className="my-4 flex w-64 flex-col">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <span style={{ color: platform.color }}>{platform.icon}</span>
        {platform.name}
      </h2>
      <ul className="space-y-2">
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
              <div className="ml-3 flex w-full overflow-hidden">
                <div className="mr-2 flex max-w-[60%] flex-col overflow-hidden">
                  <span className="block truncate font-bold">
                    {user.user_name}
                  </span>
                  <span className="truncate text-xs text-gray-400">
                    {user.game_name}
                  </span>
                </div>
                <div className="ml-auto flex min-w-[40px] flex-shrink-0 items-center gap-1">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                  <p className="text-xs font-semibold text-gray-400">
                    {new Intl.NumberFormat().format(user.viewer_count)}
                  </p>
                </div>
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

  if (!followedStreams) return;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold">Followed Channels</h2>
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
        const filteredUsers = followedStreams
          .filter(
            (user) => user.platform === platform.name && user.type === "live",
          )
          .sort((a, b) => b.viewer_count - a.viewer_count); // Sort by viewer count in descending order

        return (
          <ExpandedFollowerList
            key={platform.name}
            platform={platform}
            users={filteredUsers}
          />
        );
      })}
    </div>
  );
}
