import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { ScrollableStreamGrid } from "../stream-grid/ScrollableStreamGrid";

import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { Stream, StreamPlatform } from "@/types/stream.types";

interface PlatformStreamCategoryProps {
  platform: StreamPlatform;
  streams: Stream[];
  title: string;
}

export const PlatformStreamCategory = ({
  platform,
  streams,
  title,
}: PlatformStreamCategoryProps) => {
  // Get platform-specific color and icon
  const platformInfo = useMemo(() => {
    switch (platform) {
      case "twitch":
        return {
          color: "bg-purple-600 hover:bg-purple-700",
          icon: <TwitchIcon className="mr-2" size={20} />,
        };
      case "youtube":
        return {
          color: "bg-red-600 hover:bg-red-700",
          icon: <YouTubeIcon className="mr-2" size={20} />,
        };
      case "kick":
        return {
          color: "bg-green-600 hover:bg-green-700",
          icon: <KickIcon className="mr-2" size={20} />,
        };
      default:
        return {
          color: "bg-blue-600 hover:bg-blue-700",
          icon: null,
        };
    }
  }, [platform]);

  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          {platformInfo.icon}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <Link
          className={`flex items-center rounded-md px-3 py-1 text-sm ${platformInfo.color}`}
          href={`/browse/${platform}`}
        >
          See all
          <ChevronRight className="ml-1" size={16} />
        </Link>
      </div>

      {/* Replace the old horizontal scrolling with our new ScrollableStreamGrid component */}
      {streams.length > 0 ? (
        <ScrollableStreamGrid maxVisibleCards={6} streams={streams} />
      ) : (
        <div className="w-full text-center">
          <p className="text-gray-500">
            No streams available for this platform.
          </p>
        </div>
      )}
    </section>
  );
};
