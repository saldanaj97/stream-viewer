import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { StreamPlatform } from "@/types/stream.types";

export type MultiViewStream = {
  id: string;
  user_name: string;
  platform: StreamPlatform;
};

export interface MultiViewBarState {
  streams: MultiViewStream[];
  max: number;
  isHidden: boolean;
}

export interface MultiViewBarActions {
  addStream: (stream: MultiViewStream) => void;
  removeStream: (stream: MultiViewStream) => void;
  clearStreams: () => void;
  setIsHidden: (isHidden: boolean) => void;
}

export type MultiViewBarStore = MultiViewBarState & MultiViewBarActions;

const initialState: MultiViewBarState = {
  streams: [],
  max: 4,
  isHidden: true,
};

export const createMultiViewBarStore = () => {
  return createStore<MultiViewBarStore>()(
    persist(
      (set, _get) => ({
        ...initialState,
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
        setIsHidden: (isHidden) => set({ isHidden }),
      }),

      {
        name: "omniview-multiview-bar",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
