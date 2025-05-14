"use client";

import { PlatformIconWthColor } from "@/components/icons";
import { useMultiViewBarStore } from "@/stores/multiview-bar-store";

export function MultiViewBar() {
  const streams = useMultiViewBarStore((state) => state.streams);

  if (streams.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex min-w-[220px] flex-col rounded bg-neutral-200/90 p-4 shadow-lg">
      {streams.map((s) => (
        <div
          key={`${s.platform}-${s.id}`}
          className="flex items-center justify-between px-2 py-1"
        >
          <span className="max-w-[120px] truncate text-sm font-medium text-black">
            {s.user_name}
          </span>
          <PlatformIconWthColor platform={s.platform} />
        </div>
      ))}
    </div>
  );
}
