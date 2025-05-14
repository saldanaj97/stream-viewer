"use client";

import { useEffect, useState } from "react";

import { Stream } from "@/types/stream.types";

const LOCAL_STORAGE_KEY = "multiview-streams";
const MAX_STREAMS = 4;

export type MultiViewStream = Pick<Stream, "id" | "user_name" | "platform">;

export function useMultiViewStreams() {
  const [streams, setStreams] = useState<MultiViewStream[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (stored) {
      try {
        setStreams(JSON.parse(stored));
      } catch {
        setStreams([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(streams));
  }, [streams]);

  function addStream(stream: MultiViewStream) {
    setStreams((prev) => {
      if (
        prev.find((s) => s.id === stream.id && s.platform === stream.platform)
      )
        return prev;
      if (prev.length >= MAX_STREAMS) return prev;

      return [...prev, stream];
    });
  }

  function removeStream(stream: MultiViewStream) {
    setStreams((prev) =>
      prev.filter(
        (s) => !(s.id === stream.id && s.platform === stream.platform),
      ),
    );
  }

  function clearStreams() {
    setStreams([]);
  }

  return { streams, addStream, removeStream, clearStreams, max: MAX_STREAMS };
}
