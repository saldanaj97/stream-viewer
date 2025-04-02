export interface StreamInfo {
  channel: string;
  platform: "Twitch" | "YouTube" | "Kick";
  liveStreamId?: string | null;
}

export interface MultiStreamViewerProps {
  streams: StreamInfo[];
}
