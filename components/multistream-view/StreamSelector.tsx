import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useMultiViewBarStore } from "@/providers/multiview-bar-provider";
import { MultiViewStream } from "@/stores/multiview-bar-store";

interface StreamSelectorProps {
  initialStreams?: MultiViewStream[];
}

export const StreamSelector = ({
  initialStreams = [],
}: StreamSelectorProps) => {
  const router = useRouter();
  const multiviewBarStreams = useMultiViewBarStore((state) => state.streams);
  const addStreamToMultiviewBar = useMultiViewBarStore(
    (state) => state.addStream,
  );
  const removeStreamFromMultiviewBar = useMultiViewBarStore(
    (state) => state.removeStream,
  );

  // Always use StreamInfo[] for local state
  const [streams, setStreams] = useState<MultiViewStream[]>(
    multiviewBarStreams.length > 0
      ? multiviewBarStreams.map((s) => ({
          id: s.id || "",
          user_name: s.user_name || "",
          platform: s.platform,
        }))
      : initialStreams.length > 0
        ? initialStreams.map((s) => ({
            id: s.id || "",
            user_name: s.user_name || "",
            platform: s.platform,
            liveStreamId: s.id || "",
          }))
        : [{ id: "", user_name: "", platform: "twitch", liveStreamId: "" }],
  );

  // Sync local state with MultiViewBarStore if it changes
  useEffect(() => {
    if (multiviewBarStreams.length > 0) {
      const mapped = multiviewBarStreams.map((s) => ({
        id: s.id || "",
        user_name: s.user_name || "",
        platform: s.platform,
      }));
      // Only update if different
      const isDifferent =
        streams.length !== mapped.length ||
        streams.some(
          (stream, i) =>
            stream.id !== mapped[i]?.id ||
            stream.platform !== mapped[i]?.platform ||
            stream.user_name !== mapped[i]?.user_name,
        );

      if (isDifferent) {
        setStreams(mapped);
      }
    }
  }, [multiviewBarStreams]);

  const handleAddStream = () => {
    if (streams.length < 4) {
      const newStream: MultiViewStream = {
        id: "",
        user_name: "",
        platform: "twitch",
      };

      setStreams([...streams, newStream]);
    }
  };

  const handleRemoveStream = (index: number) => {
    if (streams.length > 1) {
      const newStreams = [...streams];
      const removed = newStreams.splice(index, 1)[0];

      setStreams(newStreams);
      // Remove from store if present
      if (removed.user_name && removed.platform) {
        removeStreamFromMultiviewBar({
          id: removed.id || removed.user_name,
          user_name: removed.user_name,
          platform: removed.platform,
        });
      }
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof MultiViewStream,
    value: string,
  ) => {
    const newStreams = [...streams];

    newStreams[index] = {
      ...newStreams[index],
      [field]:
        field === "platform" ? (value as MultiViewStream["platform"]) : value,
    };

    setStreams(newStreams);
    // Sync to store if all required fields are present
    const s = newStreams[index];

    if (s.id && s.platform) {
      addStreamToMultiviewBar({
        id: s.id,
        user_name: s.user_name,
        platform: s.platform,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Filter out empty channels
    const validStreams = streams.filter(
      (stream) => stream.user_name.trim() !== "",
    );

    if (validStreams.length === 0) {
      return;
    }

    // Update MultiViewBar state with all valid streams
    validStreams.forEach((s) => {
      addStreamToMultiviewBar({
        id: s.id || s.user_name,
        user_name: s.user_name,
        platform: s.platform,
      });
    });

    // Build URL query parameters
    const channels = validStreams.map((s) => s.user_name).join(",");
    const platforms = validStreams.map((s) => s.platform).join(",");
    const ids = validStreams.map((s) => s.id || "").join(",");

    const queryParams = new URLSearchParams({
      multiview: "true",
      channels,
      platforms,
    });

    if (ids.trim() !== "") {
      queryParams.append("ids", ids);
    }

    router.push(`/watch?${queryParams.toString()}`);
  };

  return (
    <div className="mt-6 rounded-lg p-4 dark:bg-default-100">
      <h3 className="mb-4 text-xl font-bold">Multi-Stream Viewer</h3>
      <form onSubmit={handleSubmit}>
        {streams.map((stream, index) => {
          return (
            <div
              key={`stream-${index}`}
              className="mb-4 rounded-lg border p-4 dark:border-default-200"
            >
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex-1">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                      Channel
                    </span>
                    <input
                      required
                      className="h-10 w-full rounded-md bg-default-200 p-2"
                      placeholder="Channel name"
                      type="text"
                      value={stream.user_name}
                      onChange={(e) =>
                        handleInputChange(index, "user_name", e.target.value)
                      }
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/4">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                      Platform
                    </span>
                    <select
                      className="h-10 w-full rounded-md bg-default-200 p-2"
                      value={stream.platform}
                      onChange={(e) =>
                        handleInputChange(index, "platform", e.target.value)
                      }
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
                        disabled={
                          stream.platform === "twitch" ||
                          stream.platform === "kick"
                        }
                        placeholder={
                          stream.platform === "youtube"
                            ? "Enter YouTube stream ID"
                            : "Only needed for YouTube"
                        }
                        type="text"
                        value={stream.id || ""}
                        onChange={(e) =>
                          handleInputChange(index, "id", e.target.value)
                        }
                      />
                      {stream.platform !== "youtube" && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-xs text-neutral-500">
                            Disabled
                          </span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                <div className="flex items-end">
                  <button
                    aria-label={`Remove stream ${index + 1}`}
                    className="rounded-md bg-red-600 p-2 text-background hover:bg-red-700 disabled:opacity-50 dark:text-foreground"
                    disabled={streams.length <= 1}
                    type="button"
                    onClick={() => handleRemoveStream(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}

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
