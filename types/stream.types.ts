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

// Update Stream type to use UnifiedStream
export type Stream = {
  id: string; // Unique identifier for the stream
  user_id: string; // User or channel ID
  user_name: string; // Display name of the user or channel
  title: string; // Stream title
  viewer_count: number; // Number of viewers
  started_at: string; // ISO 8601 date string for when the stream started
  language: string; // Language of the stream
  thumbnail_url: string; // URL for the stream thumbnail
  is_mature: boolean; // Whether the stream is marked as mature content
  platform: StreamPlatform; // Platform of the stream (twitch, kick, youtube)
  game_name?: string; // Name of the game or category (optional)
  stream_type?: string; // Type of stream (e.g., live, vodcast) (optional)
};

// Helper type for common properties across platforms
export interface CommonStreamProperties {
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  platform: StreamPlatform;
  thumbnail: string;
}
