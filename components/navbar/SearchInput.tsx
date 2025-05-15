"use client";

import { Input } from "@heroui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { KickIcon, TwitchIcon, YouTubeIcon } from "../icons";

import { ENV } from "@/data/env";

const DEBOUNCE_MS = 400;

interface PlatformUser {
  platform: string;
  id: string;
  username: string;
  display_name: string;
  profile_image_url: string;
  broadcaster_type: string | null;
  is_live: boolean | null;
  live_viewer_count: number | null;
}

type SearchResult = Record<string, PlatformUser | null>;

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const platformIcons = {
    kick: <KickIcon className="h-4 w-4" />,
    youtube: <YouTubeIcon className="h-4 w-4" />,
    twitch: <TwitchIcon className="h-4 w-4" />,
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setQuery(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (value.length < 2) {
        setResults(null);
        setLoading(false);

        return;
      }

      setLoading(true);
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `${ENV.apiUrl}/api/search?q=${encodeURIComponent(value)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            },
          );

          if (!res.ok) {
            throw new Error("Search failed");
          }

          const data = await res.json();

          setResults(data);
        } catch {
          setResults(null);
        } finally {
          setLoading(false);
        }
      }, DEBOUNCE_MS);
    },
    [],
  );

  return (
    <div className="relative w-full max-w-[300px]">
      <Input
        aria-label="Search"
        autoComplete="off"
        classNames={{
          inputWrapper: "bg-default-200",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
        }
        type="search"
        value={query}
        onChange={handleInputChange}
      />
      {loading && (
        <div className="bg-blur-md absolute left-0 right-0 top-full z-10 rounded bg-default-100 p-2 text-center text-xs text-gray-500 shadow backdrop-blur-md">
          Searching...
        </div>
      )}
      {results && !loading && (
        <div className="absolute left-0 right-0 top-full z-10 rounded-b bg-default-100 shadow backdrop-blur-md">
          {Object.values(results).every((v) => !v) ? (
            <div className="p-2 text-xs text-gray-500">No results found</div>
          ) : (
            <ul>
              {Object.entries(results).map(([platform, user]) =>
                user ? (
                  <li
                    key={platform}
                    className="flex items-center gap-2 truncate p-4 text-xs font-semibold text-foreground hover:bg-default-200"
                  >
                    <span className="flex items-center gap-2 capitalize">
                      {platformIcons[platform.toLowerCase()] || platform}
                    </span>
                    {user.profile_image_url && (
                      <Image
                        alt={`${user.display_name} profile`}
                        className="h-6 w-6 rounded-full object-cover"
                        src={user.profile_image_url}
                      />
                    )}
                    <span className="flex-1">
                      {user.display_name || user.username}
                    </span>
                    {user.is_live && (
                      <span className="ml-auto rounded bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
                        LIVE
                      </span>
                    )}
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
