import Link from "next/link";

import { Stream } from "@/features/top-streams/types";

// Format timestamp utility function
const getStreamDuration = (startTime: string) => {
  const start = new Date(startTime);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return diffHrs > 0 ? `${diffHrs}h ${diffMins}m` : `${diffMins}m`;
};

// Process thumbnail URL
const getThumbnailUrl = (url: string) => {
  return url.replace("{width}", "440").replace("{height}", "248");
};

export const StreamCard = ({ stream }: { stream: Stream }) => {
  return (
    <Link className="block" href={`/stream/${stream.id}`}>
      <div className="overflow-hidden rounded-lg bg-gray-800 transition-all hover:ring-2 hover:ring-blue-600">
        <div className="relative">
          <img
            alt={`${stream.user_name} streaming ${stream.game_name}`}
            className="aspect-video w-full object-cover"
            src={getThumbnailUrl(stream.thumbnail_url)}
          />
          <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-0.5 text-xs">
            {stream.type.toUpperCase()}
          </div>
          <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
            {new Intl.NumberFormat().format(stream.viewer_count)} viewers
          </div>
          <div className="absolute right-2 top-2 rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs">
            {getStreamDuration(stream.started_at)}
          </div>
          {stream.is_mature && (
            <div className="absolute left-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs">
              18+
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="flex items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-600">
              {stream.user_name.charAt(0)}
            </div>
            <div className="ml-3">
              <h3 className="truncate text-sm font-bold">{stream.title}</h3>
              <p className="text-sm text-gray-400">{stream.user_name}</p>
              <p className="text-sm text-gray-400">{stream.game_name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
