import FollowedStreamersMockData from "../data/mockFollowedStreamersData.json";
import TopStreamMockData from "../data/mockTopStreamsData.json";

import { FollowedStreamer } from "@/types/sidebar.types";
import { Stream, StreamPlatform } from "@/types/stream.types";

// Auto-generated mock top streams data
// Generated on 2025-04-14T16:40:52.621Z

// AS OF 4-16-2025, KICK IS NOT INCLUDED IN THE MOCK DATA DUE TO LACK OF PUBLIC API FOR
// FETCHING FOLLOWED USERS

export const mockTopStreams: Stream[] = (TopStreamMockData as Stream[]).map(
  (item) => ({
    ...item,
    platform: item.platform as StreamPlatform,
  }),
);

export const mockFollowedStreams: FollowedStreamer[] =
  FollowedStreamersMockData as FollowedStreamer[];
