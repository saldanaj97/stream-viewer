import Link from "next/link";

// Mock data for top streams
const topStreams = [
  {
    id: 1,
    title: "Championship Finals!",
    streamer: "ProGamer123",
    game: "League of Legends",
    viewers: 45230,
    thumbnail: "/thumbnails/stream1.jpg",
    tags: ["esports", "competitive", "finals"],
  },
  {
    id: 2,
    title: "Casual Sunday Games w/ Friends",
    streamer: "FunStreamer",
    game: "Minecraft",
    viewers: 12400,
    thumbnail: "/thumbnails/stream2.jpg",
    tags: ["building", "chill", "multiplayer"],
  },
  {
    id: 3,
    title: "Speedrunning World Record Attempts",
    streamer: "SpeedyGonzalez",
    game: "Super Mario 64",
    viewers: 8920,
    thumbnail: "/thumbnails/stream3.jpg",
    tags: ["speedrun", "world-record", "challenge"],
  },
  {
    id: 4,
    title: "Art Commission Stream - Drawing Your Requests",
    streamer: "ArtisticSoul",
    game: "Art & Design",
    viewers: 3450,
    thumbnail: "/thumbnails/stream4.jpg",
    tags: ["art", "commissions", "drawing"],
  },
  {
    id: 5,
    title: "Day 100 of Hardcore Survival",
    streamer: "SurvivalExpert",
    game: "Don't Starve Together",
    viewers: 7620,
    thumbnail: "/thumbnails/stream5.jpg",
    tags: ["survival", "hardcore", "day100"],
  },
];

export default function TopStreams() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {topStreams.map((stream) => (
        <Link key={stream.id} className="block" href={`/stream/${stream.id}`}>
          <div className="overflow-hidden rounded-lg bg-gray-800 transition-all hover:ring-2 hover:ring-purple-500">
            <div className="relative">
              {/* Placeholder for thumbnail */}
              <div className="flex aspect-video items-center justify-center bg-gray-700 text-sm">
                {stream.game} Stream Thumbnail
              </div>
              <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-0.5 text-xs">
                LIVE
              </div>
              <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
                {new Intl.NumberFormat().format(stream.viewers)} viewers
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-600">
                  {stream.streamer.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="truncate text-sm font-bold">{stream.title}</h3>
                  <p className="text-sm text-gray-400">{stream.streamer}</p>
                  <p className="text-sm text-gray-400">{stream.game}</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {stream.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-700 px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
