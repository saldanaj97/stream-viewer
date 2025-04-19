import type { FollowedStreamer } from "../types/sidebar.types";
import type { Stream, StreamPlatform } from "../types/stream.types";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateTopStreamsData(count: number): Stream[] {
  const streams: Stream[] = [];
  const platforms: StreamPlatform[] = ["twitch", "youtube", "kick"];
  const now = new Date().toISOString();

  for (let i = 1; i <= count; i++) {
    streams.push({
      id: `${i}`,
      user_id: `user${i}`,
      user_name: `User ${i}`,
      title: `Title ${i}`,
      viewer_count: Math.floor(Math.random() * 10000),
      started_at: now,
      language: "en",
      thumbnail_url: `https://dummyimage.com/640x400/000/fff.png&text=Mock+Thumbnail+${i}`,
      is_mature: false,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      game_name: `Game ${i}`,
      stream_type: "live",
    });
  }

  return streams;
}

function generateFollowedStreamersData(count: number): FollowedStreamer[] {
  const streamers: FollowedStreamer[] = [];
  const now = new Date().toISOString();
  const platforms = {
    Twitch: "Twitch",
    YouTube: "YouTube",
  };
  const platformKeys = Object.keys(platforms) as Array<keyof typeof platforms>;

  for (let i = 1; i <= count; i++) {
    streamers.push({
      id: `${i}`,
      login: `user${i}`,
      display_name: `User ${i}`,
      type: "live",
      broadcaster_type: "none",
      description: `Description for streamer ${i}`,
      profile_image_url: `https://dummyimage.com/128x128/000/fff.png&text=${i}`,
      offline_image_url: `https://dummyimage.com/400x300/000/fff.png&text=Offline+${i}`,
      view_count: Math.floor(Math.random() * 100000),
      created_at: now,
      user_id: `user${i}`,
      user_login: `user${i}`,
      user_name: `User ${i}`,
      game_id: `${i}`,
      game_name: `Game ${i}`,
      title: `Title ${i}`,
      viewer_count: Math.floor(Math.random() * 10000),
      started_at: now,
      language: "en",
      thumbnail_url: `https://dummyimage.com/640x400/000/fff.png&text=Thumbnail+${i}`,
      tag_ids: [`tag${i}`],
      tags: [`tag${i}`],
      is_mature: false,
      platform: platformKeys[Math.floor(Math.random() * platformKeys.length)],
    });
  }

  return streamers;
}

function writeTopStreamsMockDataToFile(fileName: string, count: number): void {
  const data = generateTopStreamsData(count);
  const filePath = path.join(__dirname, fileName);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Mock data written to ${filePath}`);
}

function writeFollowedStreamersMockDataToFile(
  fileName: string,
  count: number,
): void {
  const data = generateFollowedStreamersData(count);
  const filePath = path.join(__dirname, fileName);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Mock data written to ${filePath}`);
}

writeTopStreamsMockDataToFile("mockTopStreamsData.json", 100);
writeFollowedStreamersMockDataToFile("mockFollowedStreamersData.json", 25);
