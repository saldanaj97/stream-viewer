"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Main component for the watch page
export default function WatchPage() {
  const searchParams = useSearchParams();
  const [channel, setChannel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const channelFromParams = searchParams.get("channel");

    if (channelFromParams) {
      setChannel(channelFromParams);
    } else {
      setError("No channel specified. Add ?channel=channelname to the URL.");
    }
    setIsLoading(false);
  }, [searchParams]);

  return (
    <div className="min-h-screen text-foreground">
      <div className="px-4">
        <h1 className="mb-6 text-3xl font-bold">Watch</h1>

        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-xl">Loading...</p>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-800 p-4">
            <p className="text-xl">{error}</p>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <div className="container aspect-video min-h-[300px] w-full min-w-[400px] shadow-xl">
              <iframe
                allowFullScreen={true}
                className="h-full w-full"
                src={`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`}
                title={`${channel} stream`}
              />
            </div>

            <div className="rounded-md shadow-xl">
              <iframe
                allowFullScreen={true}
                className="h-full w-full"
                src={`https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}`}
                title={`${channel} chat`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
