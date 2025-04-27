"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { StreamSelector } from "@/components/multistream-view/StreamSelector";
import { StreamInfo } from "@/types/multistream-viewer.types";

const MultiViewSetupContent = () => {
  const searchParams = useSearchParams();
  const [initialStreams, setInitialStreams] = useState<StreamInfo[]>([]);

  useEffect(() => {
    if (searchParams) {
      // Check if we have existing streams in the URL parameters
      const channelsParam = searchParams.get("channels");
      const platformsParam = searchParams.get("platforms");
      const idsParam = searchParams.get("ids");

      if (channelsParam && platformsParam) {
        const channels = channelsParam.split(",");
        const platforms = platformsParam.split(",") as StreamInfo["platform"][];
        const ids = idsParam ? idsParam.split(",") : [];

        const streamInfos: StreamInfo[] = channels
          .map((channel, index) => ({
            channel,
            platform: platforms[index] || "Twitch",
            liveStreamId: ids[index] || "",
          }))
          .slice(0, 4); // Ensure maximum of 4 streams

        setInitialStreams(streamInfos);
      }
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Multi-Stream Viewer Setup</h1>
      <p className="mb-6 text-neutral-500 dark:text-neutral-300">
        Select up to 4 streams to watch simultaneously. You can drag and resize
        each stream in the viewing layout.
      </p>

      <StreamSelector initialStreams={initialStreams} />

      <div className="mt-8 rounded-lg p-4 dark:bg-default-100">
        <h3 className="mb-2 text-xl font-bold">How to use:</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>Add up to 4 streams using the form above</li>
          <li>For Twitch and Kick, just enter the channel name</li>
          <li>
            For YouTube, enter the channel name and the stream ID (found in the
            URL)
          </li>
          <li>
            In the multi-stream view, you can drag streams to rearrange them
          </li>
          <li>
            Resize streams by dragging the bottom-right corner of each stream
          </li>
          <li>
            Your layout will be preserved as you resize the browser window
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function MultiViewPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <MultiViewSetupContent />
      </Suspense>
    </div>
  );
}
