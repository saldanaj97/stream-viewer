import Link from "next/link";

type Platform = {
  name: "Kick" | "Twitch" | "YouTube";
  url: string;
};

type FollowedUser = {
  id: number;
  name: string;
  avatar: string;
  isLive: boolean;
  viewers?: number;
  platform: Platform["name"];
};

// Mock data for followed users
const followedUsers: FollowedUser[] = [
  {
    id: 1,
    name: "StreamMaster",
    avatar: "/avatars/user1.png",
    isLive: true,
    viewers: 12500,
    platform: "Twitch",
  },
  {
    id: 2,
    name: "GameWarlord",
    avatar: "/avatars/user2.png",
    isLive: true,
    viewers: 8340,
    platform: "Kick",
  },
  {
    id: 3,
    name: "PixelPro",
    avatar: "/avatars/user3.png",
    isLive: false,
    platform: "Twitch",
  },
  {
    id: 4,
    name: "EpicGamer",
    avatar: "/avatars/user4.png",
    isLive: false,
    platform: "YouTube",
  },
  {
    id: 5,
    name: "TechTalker",
    avatar: "/avatars/user5.png",
    isLive: true,
    viewers: 2100,
    platform: "Kick",
  },
];

const platforms: Platform[] = [
  { name: "Twitch", url: "https://www.twitch.tv" },
  { name: "YouTube", url: "https://www.youtube.com" },
  { name: "Kick", url: "https://www.kick.com" },
];

const FilteredFollowerList = ({
  _followedUsers,
}: {
  _followedUsers: FollowedUser[];
}) => {
  return (
    <>
      {platforms.map((platform) => {
        const filteredUsers = _followedUsers.filter(
          (user) => user.platform === platform.name,
        );

        return (
          <div key={platform.name} className="mb-6">
            <h2 className="mb-4 text-xl font-bold">{platform.name}</h2>
            <ul className="space-y-2">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="rounded-xl bg-gray-500 dark:bg-transparent"
                >
                  <Link
                    className="flex items-center rounded p-2 hover:bg-gray-700"
                    href={`/user/${user.id}`}
                  >
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
                        {/* Placeholder for avatar - in production use real images */}
                        {user.name.charAt(0)}
                      </div>
                      {user.isLive && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-800 bg-red-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      <span className="font-medium">{user.name}</span>
                      {user.isLive && (
                        <p className="text-xs text-gray-400">
                          {new Intl.NumberFormat().format(user.viewers ?? 0)}
                          viewers
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-full bg-gray-700 p-4 dark:bg-transparent md:min-h-screen md:w-64">
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-bold">Followed Channels</h2>
        <ul className="space-y-2">
          <FilteredFollowerList _followedUsers={followedUsers} />
        </ul>
      </div>
    </aside>
  );
}
