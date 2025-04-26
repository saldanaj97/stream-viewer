import { Stream, StreamPlatform } from "@/types/stream.types";

/**
 * Selects random streams from each available platform
 * @param allStreams All available streams
 * @param maxPerPlatform Maximum number of streams to select per platform
 * @param totalStreams Total number of streams to return
 * @returns Array of randomly selected streams
 */
export const getRandomStreamsForCarousel = (
  allStreams: Stream[],
  maxPerPlatform: number = 2,
  totalStreams: number = 6,
): Stream[] => {
  if (!allStreams || allStreams.length === 0) return [];

  // Group streams by platform
  const streamsByPlatform: Record<StreamPlatform, Stream[]> = {
    twitch: [],
    youtube: [],
    kick: [],
  };

  // Populate platform groups
  allStreams.forEach((stream) => {
    if (streamsByPlatform[stream.platform]) {
      streamsByPlatform[stream.platform].push(stream);
    }
  });

  // Sort each platform's streams by viewer count (highest first)
  Object.keys(streamsByPlatform).forEach((platform) => {
    streamsByPlatform[platform as StreamPlatform].sort(
      (a, b) => b.viewer_count - a.viewer_count,
    );
  });

  const selectedStreams: Stream[] = [];
  const availablePlatforms: StreamPlatform[] = Object.keys(
    streamsByPlatform,
  ) as StreamPlatform[];

  // First pass: Get top streams from each platform that has data
  availablePlatforms.forEach((platform) => {
    const platformStreams = streamsByPlatform[platform];

    if (platformStreams.length > 0) {
      // Take random streams up to maxPerPlatform
      const randomStreams = getRandomStreams(platformStreams, maxPerPlatform);

      selectedStreams.push(...randomStreams);
    }
  });

  // Second pass: If we don't have enough streams, fill with more from platforms that have data
  if (selectedStreams.length < totalStreams) {
    const remainingCount = totalStreams - selectedStreams.length;
    const remainingStreams: Stream[] = [];

    availablePlatforms.forEach((platform) => {
      const platformStreams = streamsByPlatform[platform].filter(
        (stream) => !selectedStreams.some((s) => s.id === stream.id),
      );

      remainingStreams.push(...platformStreams);
    });

    if (remainingStreams.length > 0) {
      // Sort by viewer count
      remainingStreams.sort((a, b) => b.viewer_count - a.viewer_count);

      // Get top N remaining
      selectedStreams.push(...remainingStreams.slice(0, remainingCount));
    }
  }

  // Final shuffle to mix platforms
  return shuffleArray(selectedStreams.slice(0, totalStreams));
};

/**
 * Get random streams from an array of streams
 * @param streams Array of streams
 * @param count Number of streams to select
 * @returns Array of randomly selected streams
 */
const getRandomStreams = (streams: Stream[], count: number): Stream[] => {
  if (streams.length <= count) return [...streams];

  // For better quality content, use the top 20 streams as the candidate pool
  const pool = streams.slice(0, Math.min(20, streams.length));
  const result: Stream[] = [];
  const indices = new Set<number>();

  while (result.length < count && result.length < pool.length) {
    const randomIndex = Math.floor(Math.random() * pool.length);

    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      result.push(pool[randomIndex]);
    }
  }

  return result;
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param array Array to shuffle
 * @returns Shuffled array
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};
