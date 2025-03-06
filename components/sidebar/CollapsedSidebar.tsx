import Link from "next/link";

import { mockFollowedUsers } from "../../data/mockData";

import { platformsArray } from "./platforms";
import SidebarToggle from "./SidebarToggle";
import { FollowedUser, Platform } from "./types";

const CollapsedFollowerList = ({
  platform,
  users,
}: {
  platform: Platform;
  users: FollowedUser[];
}) => {
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
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-col items-center">
        <SidebarToggle isOpen={false} onClick={toggleSidebar} />
        <div className="flex h-8 w-8 items-center justify-center rounded-full">
          <svg
            className="h-7 w-7 text-blue-600"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      </div>

      {platformsArray.map((platform) => {
        const filteredUsers = mockFollowedUsers.filter(
          (user) => user.platform === platform.name && user.isLive,
        );

        if (filteredUsers.length === 0) return null;

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
