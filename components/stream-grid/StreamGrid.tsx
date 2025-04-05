import { useMemo, useState } from "react";

import { StreamCard } from "./StreamCard";

import { Stream, StreamPlatform } from "@/types/stream.types";

// Helper function to generate a consistent key for streams from different platforms
const getStreamKey = (stream: Stream): string => {
  if (stream.platform === "twitch") {
    return `twitch-${stream.id}`;
  } else {
    return `kick-${stream.channel_id}`;
  }
};

// Helper function to get display name for language codes
const getLanguageDisplayName = (code: string): string => {
  try {
    // Try to get language name in English
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) || code;
  } catch {
    // Fallback to the code if not supported
    return code;
  }
};

export const StreamGrid = ({ streams }: { streams: Stream[] }) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<
    "all" | StreamPlatform
  >("all");

  const [activeLanguageFilter, setActiveLanguageFilter] =
    useState<string>("all");

  // Extract unique languages from streams
  const uniqueLanguages = useMemo(() => {
    const languages = streams.map((stream) => stream.language);

    // Use Array.from instead of spread to avoid TypeScript issues with Set
    return Array.from(new Set(languages)).sort();
  }, [streams]);

  // Filter streams by platform and language
  const filteredStreams = useMemo(() => {
    return streams.filter((stream) => {
      const matchesPlatform =
        activePlatformFilter === "all" ||
        stream.platform === activePlatformFilter;

      const matchesLanguage =
        activeLanguageFilter === "all" ||
        stream.language === activeLanguageFilter;

      return matchesPlatform && matchesLanguage;
    });
  }, [streams, activePlatformFilter, activeLanguageFilter]);

  // Sort streams by viewer count in descending order (highest first)
  const sortedStreams = useMemo(() => {
    return [...filteredStreams].sort((a, b) => b.viewer_count - a.viewer_count);
  }, [filteredStreams]);

  return (
    <div className="flex flex-col gap-4">
      {/* Platform filter buttons */}
      <div className="mb-2 flex items-center gap-3">
        <span className="text-sm font-medium text-gray-400">
          Filter by platform:
        </span>
        <div className="flex gap-2">
          <button
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activePlatformFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActivePlatformFilter("all")}
          >
            All
          </button>
          <button
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activePlatformFilter === "twitch"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActivePlatformFilter("twitch")}
          >
            Twitch
          </button>
          <button
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activePlatformFilter === "kick"
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActivePlatformFilter("kick")}
          >
            Kick
          </button>
        </div>
      </div>

      {/* Language filter buttons */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm font-medium text-gray-400">
          Filter by language:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activeLanguageFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveLanguageFilter("all")}
          >
            All
          </button>
          {uniqueLanguages.map((language) => (
            <button
              key={language}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                activeLanguageFilter === language
                  ? "bg-amber-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveLanguageFilter(language)}
            >
              {getLanguageDisplayName(language)}
            </button>
          ))}
        </div>
      </div>

      {/* Stream grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedStreams.length > 0 ? (
          sortedStreams.map((stream) => (
            <StreamCard key={getStreamKey(stream)} stream={stream} />
          ))
        ) : (
          <div className="col-span-full p-8 text-center text-gray-400">
            No streams found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
