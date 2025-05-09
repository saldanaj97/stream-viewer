"use client";

import { ENV } from "@/data/env";
import { StreamInfo } from "@/types/stream-viewer.types";

interface StreamItemProps {
  stream: StreamInfo;
  index: number;
}

// Function to render embeds for different platforms
const renderEmbed = (stream: StreamInfo) => {
  const { channel, platform, liveStreamId } = stream;

  switch (platform) {
    case "youtube":
      return (
        <iframe
          allowFullScreen={true}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${liveStreamId}?enablejsapi=1`}
          title={`${channel} stream`}
        />
      );
    case "kick":
      return (
        <iframe
          allowFullScreen={true}
          className="h-full w-full"
          src={`https://player.kick.com/${channel}?muted=true&autoplay=true`}
          title={`${channel} stream`}
        />
      );
    case "twitch":
    default:
      return (
        <iframe
          allowFullScreen={true}
          className="h-full w-full"
          src={`https://player.twitch.tv/?channel=${channel}&parent=${ENV.domainUrl}`}
          title={`${channel} stream`}
        />
      );
  }
};

export const StreamEmbed = ({ stream, index }: StreamItemProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg shadow-md">
      <div className="absolute left-0 right-0 top-0 z-10 flex h-[26px] cursor-move items-center justify-between bg-black bg-opacity-50 px-2">
        <div className="stream-drag-handle h-full w-full cursor-move">
          <span className="text-sm text-white">
            {`Stream ${index + 1}`} {stream.channel} ({stream.platform})
          </span>
        </div>
      </div>
      <div className="z-0 h-full w-full pt-[26px]">{renderEmbed(stream)}</div>
    </div>
  );
};
