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
  language: string;
  has_mature_content: boolean;
  viewer_count: number;
  thumbnail: string;
  started_at: string; // ISO 8601 date string
  category: KickCategory;
}

// YouTube stream interface
export interface YouTubeStream {
  id: string;
  user_id: string; // Channel ID
  user_login: string; // Channel name
  user_name: string; // Channel display name
  title: string;
  viewer_count: number;
  started_at: string; // ISO 8601 date string
  language: string;
  thumbnail_url: string;
  is_mature: boolean;
  // YouTube-specific fields
  video_id?: string; // The specific video/stream ID
  channel_id?: string; // Same as user_id
  description?: string; // Stream description
}

// Platform type
export type StreamPlatform = "twitch" | "kick" | "youtube";

// Unified stream type that can represent all platforms with discriminator
export type Stream =
  | (TwitchStream & { platform: "twitch" })
  | (KickStream & { platform: "kick" })
  | (YouTubeStream & { platform: "youtube" });

// Helper type for common properties across platforms
export interface CommonStreamProperties {
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  platform: StreamPlatform;
  thumbnail: string;
}
