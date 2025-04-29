import { StreamInfo } from "@/types/stream-viewer.types";

interface SingleStreamViewerProps {
  stream: StreamInfo;
}

export const SingleStreamView = ({ stream }: SingleStreamViewerProps) => {
  const { channel, platform, liveStreamId } = stream;

  if (!channel) return null;

  switch (platform) {
    case "youtube":
      return (
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="container aspect-video min-h-[300px] w-full min-w-[400px] overflow-hidden rounded-lg shadow-xl">
            <iframe
              allowFullScreen={true}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${liveStreamId}?enablejsapi=1`}
              title={`${channel} stream`}
            />
          </div>
          <div className="h-[500px] w-full overflow-hidden rounded-lg shadow-xl md:h-auto md:w-96">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/live_chat?v=${liveStreamId}&embed_domain=${window.location.hostname}`}
              title={`${channel} chat`}
            />
          </div>
        </div>
      );
    case "kick":
      return (
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="container aspect-video min-h-[300px] w-full min-w-[400px] overflow-hidden rounded-lg shadow-xl">
            <iframe
              allowFullScreen={true}
              className="h-full w-full"
              src={`https://player.kick.com/${channel}?muted=true`}
              title={`${channel} stream`}
            />
          </div>
        </div>
      );
    case "twitch":
    default:
      return (
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="container aspect-video min-h-[300px] w-full min-w-[400px] overflow-hidden rounded-lg shadow-xl">
            <iframe
              allowFullScreen={true}
              className="h-full w-full"
              src={`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`}
              title={`${channel} stream`}
            />
          </div>
          <div className="h-[500px] w-full overflow-hidden rounded-lg shadow-xl md:h-auto md:w-96">
            <iframe
              allowFullScreen={true}
              className="h-full w-full"
              src={`https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}`}
              title={`${channel} chat`}
            />
          </div>
        </div>
      );
  }
};
