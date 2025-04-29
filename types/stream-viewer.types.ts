export type StreamInfo = {
  channel: string;
  platform: "twitch" | "youtube" | "kick";
  liveStreamId: string | null | undefined;
};

export type PageTitleProps = {
  channel: string;
  platform: string;
  isMultiView?: boolean;
};
