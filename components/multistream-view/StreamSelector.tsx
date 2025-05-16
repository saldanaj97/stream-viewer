import { useRouter } from "next/navigation";
import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useShallow } from "zustand/shallow";

import { useMultiViewBarStore } from "@/providers/multiview-bar-provider";
import { MultiViewStream } from "@/stores/multiview-bar-store";

// Extend stream with internal key for stable list rendering
interface LocalStream extends MultiViewStream {
  _key: string;
}

interface StreamSelectorProps {
  initialStreams?: MultiViewStream[];
}

// Helper to derive initial local state
const getInitialStreams = (
  storeStreams: MultiViewStream[],
  initial: MultiViewStream[],
): LocalStream[] => {
  const base = storeStreams.length ? storeStreams : initial;

  if (!base.length) {
    return [{ _key: uuid(), id: "", user_name: "", platform: "twitch" }];
  }

  return base.map((s) => ({ _key: uuid(), ...s }));
};

// Memoized row component
const StreamRow = memo<{
  stream: LocalStream;
  onChange: (field: keyof MultiViewStream, value: string) => void;
  onRemove: () => void;
  disableRemove: boolean;
}>(function StreamRow({ stream, onChange, onRemove, disableRemove }) {
  return (
    <div
      key={stream._key}
      className="mb-4 rounded-lg border p-4 dark:border-default-200"
    >
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex-1">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Channel</span>
            <input
              required
              className="h-10 w-full rounded-md bg-default-200 p-2"
              placeholder="Channel name"
              type="text"
              value={stream.user_name}
              onChange={(e) => onChange("user_name", e.target.value)}
            />
          </label>
        </div>

        <div className="w-full md:w-1/4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Platform</span>
            <select
              className="h-10 w-full rounded-md bg-default-200 p-2"
              value={stream.platform}
              onChange={(e) => onChange("platform", e.target.value)}
            >
              <option value="twitch">Twitch</option>
              <option value="youtube">YouTube</option>
              <option value="kick">Kick</option>
            </select>
          </label>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Stream ID{" "}
              {stream.platform === "youtube"
                ? "(required)"
                : "(not applicable)"}
            </span>
            <div className="relative">
              <input
                className={`h-10 w-full rounded-md bg-default-200 p-2 ${
                  stream.platform !== "youtube"
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
                disabled={stream.platform !== "youtube"}
                placeholder={
                  stream.platform === "youtube"
                    ? "Enter YouTube stream ID"
                    : "Only needed for YouTube"
                }
                required={stream.platform === "youtube"}
                type="text"
                value={stream.id || ""}
                onChange={(e) => onChange("id", e.target.value)}
              />
              {stream.platform !== "youtube" && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-xs text-neutral-500">Disabled</span>
                </div>
              )}
            </div>
          </label>
        </div>

        <div className="flex items-end">
          <button
            aria-disabled={disableRemove}
            aria-label="Remove stream"
            className="rounded-md bg-red-600 p-2 text-background hover:bg-red-700 disabled:opacity-50 dark:text-foreground"
            disabled={disableRemove}
            type="button"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});

export const StreamSelector = ({
  initialStreams = [],
}: StreamSelectorProps) => {
  const router = useRouter();

  // Batch selectors with shallow compare to avoid re-renders
  // and only re-render when the streams change
  const [storeStreams, addStream, removeStream] = useMultiViewBarStore(
    useShallow((s) => [s.streams, s.addStream, s.removeStream]),
  );

  const [streams, setStreams] = useState<LocalStream[]>(() =>
    getInitialStreams(storeStreams, initialStreams),
  );

  // Sync with store on changes
  useEffect(() => {
    setStreams(getInitialStreams(storeStreams, []));
  }, [storeStreams]);

  const handleAddStream = useCallback(() => {
    setStreams((prev) => [
      ...prev,
      { _key: uuid(), id: "", user_name: "", platform: "twitch" },
    ]);
  }, []);

  const handleRemoveStream = useCallback(
    (idx: number) => {
      setStreams((prev) => {
        const next = [...prev];
        const [removed] = next.splice(idx, 1);

        if (removed.user_name && removed.platform) {
          removeStream({
            id: removed.id || removed.user_name,
            user_name: removed.user_name,
            platform: removed.platform,
          });
        }

        return next;
      });
    },
    [removeStream],
  );

  const handleInputChange = useCallback(
    (idx: number, field: keyof MultiViewStream, value: string) => {
      setStreams((prev) => {
        const next = prev.map((s, i) =>
          i === idx
            ? { ...s, [field]: field === "platform" ? (value as any) : value }
            : s,
        );
        const s = next[idx];

        if (s.id && s.platform) {
          addStream({ id: s.id, user_name: s.user_name, platform: s.platform });
        }

        return next;
      });
    },
    [addStream],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const valid = streams.filter((s) => s.user_name.trim());

      if (!valid.length) return;

      valid.forEach((s) => {
        addStream({
          id: s.id || s.user_name,
          user_name: s.user_name,
          platform: s.platform,
        });
      });

      const channels = valid.map((s) => s.user_name).join(",");
      const platforms = valid.map((s) => s.platform).join(",");
      const ids = valid
        .map((s) => s.id || "")
        .filter(Boolean)
        .join(",");

      const params = new URLSearchParams({
        multiview: "true",
        channels,
        platforms,
      });

      if (ids) params.set("ids", ids);

      router.push(`/watch?${params}`);
    },
    [streams, addStream, router],
  );

  return (
    <div className="mt-6 rounded-lg p-4 dark:bg-default-100">
      <h3 className="mb-4 text-xl font-bold">Multi-Stream Viewer</h3>
      <form onSubmit={handleSubmit}>
        {streams.map((stream, idx) => (
          <StreamRow
            key={stream._key}
            disableRemove={streams.length <= 1}
            stream={stream}
            onChange={(f, v) => handleInputChange(idx, f, v)}
            onRemove={() => handleRemoveStream(idx)}
          />
        ))}

        <div className="mt-4 flex justify-between text-background dark:text-foreground">
          <button
            aria-label="Add stream"
            className="rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
            disabled={streams.length >= 4}
            type="button"
            onClick={handleAddStream}
          >
            Add Stream ({streams.length}/4)
          </button>
          <button
            className="rounded-md bg-green-600 px-4 py-2 hover:bg-green-700"
            type="submit"
          >
            Start Watching
          </button>
        </div>
      </form>
    </div>
  );
};
