import { PageTitleProps, StreamInfo } from "@/types/stream-viewer.types";

// Function to get the page title based on channel, platform, and view mode
export function getPageTitle({
  channel,
  platform,
  isMultiView,
}: PageTitleProps): string {
  if (isMultiView === true) {
    return "Multi-Stream Viewer";
  }

  if (!channel || !platform) {
    return "Stream Viewer";
  }

  return `${channel} on ${platform}`;
}

// Utility to parse search parameters into streams, view mode, and error
export function parseStreamParams(searchParams: URLSearchParams | null) {
  if (!searchParams) {
    return {
      streams: [] as StreamInfo[],
      isMultiView: false,
      error: "No search parameters available",
    };
  }
  const isMulti = searchParams.get("multiview") === "true";

  if (!isMulti) {
    const channel = searchParams.get("channel");
    const platform = searchParams.get("platform") as StreamInfo["platform"];
    const liveStreamId = searchParams.get("id");

    if (channel && platform) {
      return {
        streams: [{ channel, platform, liveStreamId }],
        isMultiView: false,
        error: null,
      };
    }

    return {
      streams: [],
      isMultiView: false,
      error:
        "Missing parameters. Single view requires: ?channel=channelname&platform=platformname. Multi-view requires: ?multiview=true&channels=channel1,channel2&platforms=Twitch,YouTube",
    };
  }
  const channelsParam = searchParams.get("channels");
  const platformsParam = searchParams.get("platforms");
  const idsParam = searchParams.get("ids");

  if (channelsParam && platformsParam) {
    const channels = channelsParam.split(",");
    const platforms = platformsParam.split(",") as StreamInfo["platform"][];
    const ids = idsParam ? idsParam.split(",") : [];
    const streams = channels
      .map((ch, i) => ({
        channel: ch,
        platform: platforms[i] || "Twitch",
        liveStreamId: ids[i] || null,
      }))
      .slice(0, 4);

    return {
      streams,
      isMultiView: true,
      error: null,
    };
  }

  return {
    streams: [],
    isMultiView: true,
    error:
      "Missing parameters. For multi-view, required: ?multiview=true&channels=channel1,channel2&platforms=Twitch,YouTube",
  };
}
