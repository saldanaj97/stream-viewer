import { platformsArray } from "../platforms";
import SidebarToggle from "../SidebarToggle";
import { Platform } from "../types";

const SkeletonFollowerItem = () => (
  <div className="flex items-center rounded p-2">
    <div className="relative">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-700" />
    </div>
    <div className="ml-3 overflow-hidden">
      <div className="block h-4 w-32 animate-pulse rounded bg-gray-700" />
    </div>
  </div>
);

const SkeletonPlatformSection = ({ platform }: { platform: Platform }) => (
  <div className="mb-6">
    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
      <span style={{ color: platform.color }}>{platform.icon}</span>
      {platform.name}
    </h2>
    <ul className="space-y-2">
      {[1, 2, 3].map((i) => (
        <li key={`${platform.name}-${i}`} className="w-full">
          <SkeletonFollowerItem />
        </li>
      ))}
    </ul>
  </div>
);

export default function ExpandedSidebarSkeleton({}: {}) {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="mb-4 text-xl font-bold">Followed Channels</h2>
        <SidebarToggle />
      </div>
      {platformsArray.map((platform) => (
        <SkeletonPlatformSection key={platform.name} platform={platform} />
      ))}
    </div>
  );
}
