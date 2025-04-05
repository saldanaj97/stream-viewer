// Twitch stream interface
export interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: "live" | "vodcast" | string;
  title: string;
  viewer_count: number;
  started_at: string; // ISO 8601 date string
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
  is_mature: boolean;
}

// Kick category interface for nested category object
export interface KickCategory {
  id: number;
  name: string;
  thumbnail: string;
}

// Kick stream interface
export interface KickStream {
  broadcaster_user_id: number;
  channel_id: number;
  slug: string;
  stream_title?: string;
  title?: string; // Fallback to stream_title if title is not present
  language: string;
  has_mature_content: boolean;
  viewer_count: number;
  thumbnail: string;
  started_at: string; // ISO 8601 date string
  category: KickCategory;
}

// Platform type
export type StreamPlatform = "twitch" | "kick";

// Unified stream type that can represent both platforms with discriminator
export type Stream =
  | (TwitchStream & { platform: "twitch" })
  | (KickStream & { platform: "kick" });

// Helper type for common properties across platforms
export interface CommonStreamProperties {
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  platform: StreamPlatform;
  thumbnail: string;
}
