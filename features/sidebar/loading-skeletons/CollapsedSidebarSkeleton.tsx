import { platformsArray } from "../platforms";
import SidebarToggle from "../SidebarToggle";
import { Platform } from "../types";

import { FollowingHeartIcon } from "@/components/icons";

const SkeletonCollapsedFollower = () => (
  <li className="w-full">
    <div className="flex justify-center rounded p-2">
      <div className="relative">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-700" />
      </div>
    </div>
  </li>
);

const SkeletonCollapsedPlatform = ({ platform }: { platform: Platform }) => (
  <div className="mb-6 flex flex-col items-center">
    <div
      className="mb-2 flex h-6 w-6 items-center justify-center rounded-full"
      style={{ color: platform.color }}
    >
      {platform.icon}
    </div>
    <ul className="flex flex-col items-center space-y-2">
      {[1, 2, 3].map((i) => (
        <SkeletonCollapsedFollower key={`${platform.name}-${i}`} />
      ))}
    </ul>
  </div>
);

export default function CollapsedSidebarSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-col items-center">
        <SidebarToggle />
        <div className="flex h-8 w-8 items-center justify-center rounded-full">
          <FollowingHeartIcon />
        </div>
      </div>

      {platformsArray.map((platform) => (
        <SkeletonCollapsedPlatform key={platform.name} platform={platform} />
      ))}
    </div>
  );
}
