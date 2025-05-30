"use client";

import {
  ChevronDown,
  CircleMinus,
  Grid2X2Icon,
  Grid2X2Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { PlatformIconWthColor } from "@/components/icons";
import { useMultiViewBarStore } from "@/providers/multiview-bar-provider";
import { MultiViewStream } from "@/stores/multiview-bar-store";

const OpenMultiViewList = ({ streams }: { streams: MultiViewStream[] }) => {
  const removeStream = useMultiViewBarStore((state) => state.removeStream);
  const clearStreams = useMultiViewBarStore((state) => state.clearStreams);
  const setIsHidden = useMultiViewBarStore((state) => state.setIsHidden);
  const atLeastOneStream = streams.length > 0;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="bg-foreground/70 fixed right-4 bottom-4 z-50 flex min-w-[300px] flex-col rounded-sm p-4 shadow-lg backdrop-blur-md"
      exit={{ opacity: 0, y: 40 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <p className="text-background text-center text-lg font-semibold">
        Multiview Selections{" "}
        <span
          className={`${streams.length === 4 ? "text-red-500" : "text-background"}`}
        >
          ({streams.length} / 4)
        </span>
      </p>
      {atLeastOneStream ? (
        <>
          <p className="text-background p-2 text-right text-sm font-bold">
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
                <span className="text-background max-w-[120px] truncate text-sm">
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
        </>
      ) : (
        <div className="mx-auto flex max-w-[220px] flex-col items-center justify-center gap-2 py-4 text-center">
          <span className="text-background text-base font-medium">
            To quickly add streams to multiview, click the
          </span>
          <Grid2X2Plus className="text-background" size={28} />
          <span className="text-background text-base font-medium">
            icon on the stream card.
          </span>
        </div>
      )}
      <button
        className="flex w-full justify-center"
        title="Hide Multiview"
        onClick={() => setIsHidden(true)}
      >
        <ChevronDown className="text-background" size={20} />
      </button>
    </motion.div>
  );
};

const ClosedMultiViewList = ({ streams }: { streams: MultiViewStream[] }) => {
  const setIsHidden = useMultiViewBarStore((state) => state.setIsHidden);
  const atLeastOneStream = streams.length > 0;

  return (
    <motion.button
      animate={{ opacity: 1, y: 0 }}
      className="bg-foreground/70 text-background fixed right-4 bottom-4 z-50 rounded-full p-4 shadow-lg backdrop-blur-md"
      exit={{ opacity: 0, y: 40 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      onClick={() => setIsHidden(false)}
    >
      {atLeastOneStream ? (
        <p className="text-background text-center text-lg font-semibold">
          <span
            className={`${streams.length === 4 ? "text-red-500" : "text-background"}`}
          >
            ({streams.length} / 4)
          </span>
        </p>
      ) : (
        <Grid2X2Icon className="text-background" size={20} />
      )}
    </motion.button>
  );
};

export function MultiViewBar() {
  const streams = useMultiViewBarStore((state) => state.streams);
  const isHidden = useMultiViewBarStore((state) => state.isHidden);

  return (
    <AnimatePresence initial={false} mode="wait">
      {isHidden ? (
        <ClosedMultiViewList key="closed" streams={streams} />
      ) : (
        <OpenMultiViewList key="open" streams={streams} />
      )}
    </AnimatePresence>
  );
}
