import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { StreamInfo } from "@/types/multistream-viewer.types";

interface StreamSelectorProps {
  initialStreams?: StreamInfo[];
}

export const StreamSelector = ({
  initialStreams = [],
}: StreamSelectorProps) => {
  const router = useRouter();
  const [streams, setStreams] = useState<StreamInfo[]>(
    initialStreams.length > 0
      ? initialStreams
      : [{ channel: "", platform: "Twitch", liveStreamId: "" }],
  );

  const handleAddStream = () => {
    if (streams.length < 4) {
      setStreams([
        ...streams,
        { channel: "", platform: "Twitch", liveStreamId: "" },
      ]);
    }
  };

  const handleRemoveStream = (index: number) => {
    if (streams.length > 1) {
      const newStreams = [...streams];

      newStreams.splice(index, 1);
      setStreams(newStreams);
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof StreamInfo,
    value: string,
  ) => {
    const newStreams = [...streams];

    newStreams[index] = {
      ...newStreams[index],
      [field]: field === "platform" ? (value as StreamInfo["platform"]) : value,
    };
    setStreams(newStreams);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Filter out empty channels
    const validStreams = streams.filter(
      (stream) => stream.channel.trim() !== "",
    );

    if (validStreams.length === 0) {
      return;
    }

    // Build URL query parameters
    const channels = validStreams.map((s) => s.channel).join(",");
    const platforms = validStreams.map((s) => s.platform).join(",");
    const ids = validStreams.map((s) => s.liveStreamId || "").join(",");

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
                      value={stream.channel}
                      onChange={(e) =>
                        handleInputChange(index, "channel", e.target.value)
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
                      <option value="Twitch">Twitch</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Kick">Kick</option>
                    </select>
                  </label>
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                      Stream ID{" "}
                      {stream.platform === "YouTube"
                        ? "(required)"
                        : "(not applicable)"}
                    </span>
                    <div className="relative">
                      <input
                        className={`h-10 w-full rounded-md bg-default-200 p-2 ${
                          stream.platform !== "YouTube"
                            ? "cursor-not-allowed opacity-60"
                            : ""
                        }`}
                        disabled={
                          stream.platform === "Twitch" ||
                          stream.platform === "Kick"
                        }
                        placeholder={
                          stream.platform === "YouTube"
                            ? "Enter YouTube stream ID"
                            : "Only needed for YouTube"
                        }
                        type="text"
                        value={stream.liveStreamId || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "liveStreamId",
                            e.target.value,
                          )
                        }
                      />
                      {stream.platform !== "YouTube" && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-xs text-gray-500">
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
