"use client";

import { CircleMinus } from "lucide-react";

import { PlatformIconWthColor } from "@/components/icons";
import { useMultiViewBarStore } from "@/providers/multiview-bar-provider";

export function MultiViewBar() {
  const streams = useMultiViewBarStore((state) => state.streams);
  const removeStream = useMultiViewBarStore((state) => state.removeStream);
  const clearStreams = useMultiViewBarStore((state) => state.clearStreams);

  if (streams.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex min-w-[300px] flex-col rounded bg-foreground/70 p-4 shadow-lg backdrop-blur-md">
      <p className="text-center text-lg font-semibold text-background">
        Multiview Selections{" "}
        <span
          className={`${streams.length === 4 ? "text-red-500" : "text-background"}`}
        >
          ({streams.length} / 4)
        </span>
      </p>
      <p className="p-2 text-right text-sm font-bold text-background">
        <button
          className="text-red-500"
          title="Clear all streams"
          onClick={clearStreams}
        >
          Clear all
        </button>
      </p>
      {streams.map((s) => (
        <div
          key={`${s.platform}-${s.id}`}
          className="flex items-center justify-between px-2 py-1"
        >
          <div className="flex items-center gap-2">
            <PlatformIconWthColor platform={s.platform} />
            <span className="max-w-[120px] truncate text-sm text-background">
              {s.user_name}
            </span>
          </div>
          <button
            className="text-red-500"
            title="Remove from multiview"
            onClick={() =>
              removeStream({
                id: s.id,
                platform: s.platform,
                user_name: s.user_name,
              })
            }
          >
            <CircleMinus size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
