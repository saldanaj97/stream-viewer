import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { PLATFORM_ICONS } from "../sidebar/platforms";
import { ScrollableStreamGrid } from "../stream-grid/ScrollableStreamGrid";

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
  const { color, icon } = PLATFORM_ICONS[platform] ?? PLATFORM_ICONS.default;

  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          {icon}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <Link
          className={`flex items-center rounded-md px-3 py-1 text-sm ${color} text-background-500 hover:bg-opacity-50`}
          href={`/browse`}
        >
          See all
          <ChevronRight className="ml-1" size={16} />
        </Link>
      </div>

      {streams.length > 0 ? (
        <ScrollableStreamGrid streams={streams} />
      ) : (
        <div className="w-full text-center">
          <p className="text-background">
            No streams available for this platform.
          </p>
        </div>
      )}
    </section>
  );
};
