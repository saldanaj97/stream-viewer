import { KickIcon } from "@/components/icons";
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
        <div className="flex h-full w-full flex-col gap-4 md:flex-row">
          <div className="aspect-video min-h-[300px] max-w-[calc(100%-350px)] flex-1 overflow-hidden rounded-lg shadow-xl">
            <iframe
              allowFullScreen={true}
              className="h-full w-full border-0"
              src={`https://www.youtube.com/embed/${liveStreamId}?enablejsapi=1`}
              title={`${channel} stream`}
            />
          </div>
          <div className="h-[500px] w-full overflow-hidden rounded-lg shadow-xl md:h-auto md:w-[350px]">
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
        <div className="flex h-full w-full flex-col gap-4 md:flex-row">
          <div className="aspect-video min-h-[300px] max-w-[calc(100%-350px)] flex-1 overflow-hidden rounded-lg shadow-xl">
            <iframe
              allowFullScreen={true}
              className="h-full w-full border-0"
              src={`https://player.kick.com/${channel}?muted=true`}
              title={`${channel} stream`}
            />
          </div>
          <div className="flex h-[500px] w-full flex-col overflow-hidden rounded-lg shadow-xl md:h-auto md:w-[350px]">
            <div className="flex items-center bg-[#6448ff] px-4 py-2 text-white">
              <KickIcon className="mr-2 text-white" size={20} />
              <span className="font-semibold">Kick Chat</span>
            </div>
            <div className="flex grow items-center justify-center bg-gray-50 p-4">
              <p className="text-center text-gray-500 italic">
                Chat not available: Kick currently has no chat API.
              </p>
            </div>
          </div>
        </div>
      );
    case "twitch":
    default:
      return (
        <div className="flex h-full w-full flex-col gap-4 md:flex-row">
          <div className="aspect-video min-h-[300px] max-w-[calc(100%-350px)] flex-1 overflow-hidden rounded-lg shadow-xl">
            <iframe
              allowFullScreen={true}
              className="h-full w-full border-0"
              src={`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`}
              title={`${channel} stream`}
            />
          </div>
          <div className="h-[500px] w-full overflow-hidden rounded-lg shadow-xl md:h-auto md:w-[350px]">
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
