import Link from "next/link";

import ExpandedSidebarSkeleton from "../loading-skeletons/ExpandedSidebarSkeleton";
import { platformsArray } from "../platforms";
import SidebarToggle from "../SidebarToggle";

import { useSidebarStore } from "@/providers/sidebar-store-provider";
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
              className="flex items-center rounded p-2 hover:bg-gray-700"
              href={`/watch/?channel=${user.user_name}`}
              title={user.user_name}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
                  {user.user_name.charAt(0)}
                </div>
              </div>
              <div className="ml-3 flex w-full justify-between overflow-hidden">
                <div className="flex flex-col">
                  <span className="block truncate font-bold">
                    {user.user_name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {user.game_name}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-primary" />
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
  const { isSidebarOpen } = useSidebarStore((state) => state);

  if (!isSidebarOpen) return;

  if (isLoading) {
    return <ExpandedSidebarSkeleton />;
  }

  if (!followedStreams) return;

  return (
    <div className="flex w-64 flex-col">
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
        const filteredUsers = followedStreams.filter(
          (user) => user.platform === platform.name && user.type === "live",
        );

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
