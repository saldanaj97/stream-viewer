"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Loading from "./loading";

import { MultiStreamViewer } from "@/components/multistream-view/MultiStreamViewer";
import { StreamInfo } from "@/types/multistream-viewer.types";

const WatchContent = () => {
  const searchParams = useSearchParams();
  const [streams, setStreams] = useState<StreamInfo[]>([]);
  const [isMultiView, setIsMultiView] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      // Check if this is a multi-view request
      const multiViewParam = searchParams.get("multiview");

      setIsMultiView(multiViewParam === "true");

      // Handle single stream view (legacy mode)
      const channelParam = searchParams.get("channel");
      const platformParam = searchParams.get(
        "platform",
      ) as StreamInfo["platform"];
      const liveStreamId = searchParams.get("id");

      if (channelParam && platformParam) {
        setStreams([
          {
            channel: channelParam,
            platform: platformParam || "Twitch",
            liveStreamId: liveStreamId,
          },
        ]);
      }
      // Handle multi-stream view
      else if (multiViewParam === "true") {
        // Parse multiple stream parameters
        // Format: channels=channel1,channel2&platforms=Twitch,YouTube&ids=id1,id2
        const channelsParam = searchParams.get("channels");
        const platformsParam = searchParams.get("platforms");
        const idsParam = searchParams.get("ids");

        if (channelsParam && platformsParam) {
          const channels = channelsParam.split(",");
          const platforms = platformsParam.split(
            ",",
          ) as StreamInfo["platform"][];
          const ids = idsParam ? idsParam.split(",") : [];

          const streamInfos: StreamInfo[] = channels
            .map((channel, index) => ({
              channel,
              platform: platforms[index] || "Twitch",
              liveStreamId: ids[index] || null,
            }))
            .slice(0, 4); // Ensure maximum of 4 streams

          setStreams(streamInfos);
        } else {
          setError(
            "Missing parameters. For multi-view, required: ?multiview=true&channels=channel1,channel2&platforms=Twitch,YouTube",
          );
        }
      } else {
        setError(
          "Missing parameters. Single view requires: ?channel=channelname&platform=platformname. Multi-view requires: ?multiview=true&channels=channel1,channel2&platforms=Twitch,YouTube",
        );
      }
    }
  }, [searchParams]);

  const renderSingleEmbed = () => {
    if (streams.length === 0) return null;

    const { channel, platform, liveStreamId } = streams[0];

    switch (platform) {
      case "YouTube":
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
            {/* YouTube doesn't have a built-in chat embed like Twitch */}
          </div>
        );
      case "Kick":
        return (
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="container aspect-video min-h-[300px] w-full min-w-[400px] overflow-hidden rounded-lg shadow-xl">
              <iframe
                allowFullScreen={true}
                className="h-full w-full"
                src={`https://kick.com/${channel}/embed`}
                title={`${channel} stream`}
              />
            </div>
          </div>
        );
      case "Twitch":
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

  const getPageTitle = () => {
    if (streams.length === 0) return "Watch";

    if (isMultiView) {
      return `Watching ${streams.length} streams`;
    }

    return `Watching ${streams[0].channel} on ${streams[0].platform}`;
  };

  return (
    <div className="px-4 pb-8">
      <h1 className="mt-4 text-2xl font-bold md:text-3xl">{getPageTitle()}</h1>

      {error ? (
        <div className="rounded-md bg-danger-500 p-4">
          <p className="text-xl text-white">{error}</p>
        </div>
      ) : streams.length > 0 ? (
        isMultiView ? (
          <div className="h-auto">
            <MultiStreamViewer streams={streams} />
          </div>
        ) : (
          renderSingleEmbed()
        )
      ) : null}
    </div>
  );
};

export default function WatchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <WatchContent />
    </Suspense>
  );
}
