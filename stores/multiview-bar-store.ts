import { create } from "zustand";
import { persist } from "zustand/middleware";

import { StreamPlatform } from "@/types/stream.types";

export type MultiViewStream = {
  id: string;
  user_name: string;
  platform: StreamPlatform;
};

interface MultiViewBarState {
  streams: MultiViewStream[];
  max: number;
  addStream: (stream: MultiViewStream) => void;
  removeStream: (stream: MultiViewStream) => void;
  clearStreams: () => void;
}

export const useMultiViewBarStore = create<MultiViewBarState>()(
  persist(
    (set, get) => ({
      streams: [],
      max: 4,
      addStream: (stream) => {
        set((state) => {
          if (
            state.streams.find(
              (s) => s.id === stream.id && s.platform === stream.platform,
            )
          )
            return state;
          if (state.streams.length >= state.max) return state;

          return { streams: [...state.streams, stream] };
        });
      },
      removeStream: (stream) => {
        set((state) => ({
          streams: state.streams.filter(
            (s) => !(s.id === stream.id && s.platform === stream.platform),
          ),
        }));
      },
      clearStreams: () => set({ streams: [] }),
    }),
    {
      name: "omniview-multiview-bar",
    },
  ),
);
