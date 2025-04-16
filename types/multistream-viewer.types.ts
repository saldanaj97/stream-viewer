export interface StreamInfo {
  channel: string;
  platform: "twitch" | "youtube" | "kick";
  liveStreamId: string | null | undefined;
}

export interface MultiStreamViewerProps {
  streams: StreamInfo[];
}
