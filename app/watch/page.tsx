"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Loading from "./loading";

type Platform = "Twitch" | "YouTube";

const WatchContent = () => {
  const searchParams = useSearchParams();
  const [channel, setChannel] = useState<string | null>(null);
  const [platform, setPlatform] = useState<Platform>("Twitch");
  const [liveStreamId, setLiveStreamId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      const channelParam = searchParams.get("channel");
      const platformParam = searchParams.get("platform") as Platform;

      if (channelParam && platformParam) {
        setChannel(channelParam);
        setPlatform(platformParam || "Twitch");
        setLiveStreamId(searchParams.get("id"));
      } else {
        setError(
          "Missing parameters. Required: ?channel=channelname&platform=platformname",
        );
      }
    }
  }, [searchParams]);

  const renderEmbed = () => {
    if (!channel) return null;

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

  return (
    <div className="px-4">
      <h1 className="mb-4 text-2xl font-bold md:text-3xl">
        {channel ? `Watching ${channel} on ${platform}` : "Watch"}
      </h1>
      {channel
        ? renderEmbed()
        : error && (
            <div className="rounded-md bg-danger-500 p-4">
              <p className="text-xl text-white">{error}</p>
            </div>
          )}
    </div>
  );
};

export default function WatchPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Suspense fallback={<Loading />}>
        <WatchContent />
      </Suspense>
    </div>
  );
}
