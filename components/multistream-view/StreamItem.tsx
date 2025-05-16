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
        <div className="flex h-full w-full flex-col md:flex-row">
          <div className="aspect-video h-1/2 md:h-full md:w-2/3">
            <iframe
              allowFullScreen={true}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${liveStreamId}?enablejsapi=1`}
              title={`${channel} stream`}
            />
          </div>
          <div className="h-1/2 md:h-full md:w-1/3">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/live_chat?v=${liveStreamId}&embed_domain=${ENV.domainUrl}`}
              title={`${channel} chat`}
            />
          </div>
        </div>
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
        <div className="flex h-full w-full flex-col md:flex-row">
          <div className="aspect-video h-1/2 md:h-full md:w-2/3">
            <iframe
              allowFullScreen={true}
              className="h-full w-full"
              src={`https://player.twitch.tv/?channel=${channel}&parent=${ENV.domainUrl}`}
              title={`${channel} stream`}
            />
          </div>
          <div className="h-1/2 md:h-full md:w-1/3">
            <iframe
              className="h-full w-full"
              id="twitch-chat-embed"
              src={`https://www.twitch.tv/embed/${channel}/chat?parent=${ENV.domainUrl}`}
              title={`${channel}'s chat`}
            />
          </div>
        </div>
      );
  }
};

export const StreamEmbed = ({ stream, index }: StreamItemProps) => {
  const backgroundColor = `bg-platform-${stream.platform}`;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg shadow-md">
      <div
        className={`${backgroundColor} absolute left-0 right-0 top-0 z-10 flex h-[26px] cursor-move items-center justify-between bg-opacity-50 px-2`}
      >
        <div className="stream-drag-handle h-full w-full cursor-move">
          <span className="text-sm text-white">
            {`Stream ${index + 1}`} {stream.channel} (
            {stream.platform.slice(0, 1).toUpperCase() +
              stream.platform.slice(1)}
            )
          </span>
        </div>
      </div>
      <div className="h-full w-full overflow-hidden pt-[26px]">
        {renderEmbed(stream)}
      </div>
    </div>
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg shadow-md">
      <div
        className={`${backgroundColor} absolute left-0 right-0 top-0 z-10 flex h-[26px] cursor-move items-center justify-between bg-opacity-50 px-2`}
      >
        <div className="stream-drag-handle h-full w-full cursor-move">
          <span className="text-sm text-white">
            {`Stream ${index + 1}`} {stream.channel} (
            {stream.platform.slice(0, 1).toUpperCase() +
              stream.platform.slice(1)}
            )
          </span>
        </div>
      </div>
      <div className="h-full w-full overflow-hidden pt-[26px]">
        {renderEmbed(stream)}
      </div>
    </div>
  );
};
