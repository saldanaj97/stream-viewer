"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Loading from "./loading";

const WatchContent = () => {
  const searchParams = useSearchParams();
  const [channel, setChannel] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>("twitch"); // Default to twitch
  const [livestreamId, setlivestreamId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      searchParams &&
      searchParams.has("channel") &&
      searchParams.has("platform")
    ) {
      setChannel(searchParams.get("channel"));
      setPlatform(searchParams.get("platform")?.toLowerCase() || "twitch");
      setlivestreamId(searchParams.get("id"));
    } else {
      setError("No channel specified. Add ?channel=channelname to the URL.");
    }
  }, [searchParams]);

  const renderEmbed = () => {
    if (!channel) return null;

    switch (platform) {
      case "youtube":
        return (
          <div className="flex flex-row gap-4">
            <div className="container aspect-video min-h-[300px] w-full min-w-[400px] overflow-hidden rounded-lg shadow-xl">
              <iframe
                allowFullScreen={true}
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${livestreamId}?enablejsapi=1`}
                title={`${channel} stream`}
              />
            </div>
            {/* YouTube doesn't have a built-in chat embed like Twitch */}
          </div>
        );
      case "twitch":
      default:
        return (
          <div className="flex flex-row gap-4">
            <div className="container aspect-video min-h-[300px] w-full min-w-[400px] overflow-hidden rounded-lg shadow-xl">
              <iframe
                allowFullScreen={true}
                className="h-full w-full"
                src={`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`}
                title={`${channel} stream`}
              />
            </div>

            <div className="overflow-hidden rounded-lg shadow-xl">
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
      <h1 className="mb-4 text-2xl font-bold md:text-3xl">Watch</h1>
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
