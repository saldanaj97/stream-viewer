"use client";

import { Input } from "@heroui/react";
import { BadgeCheck, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { KickIcon, TwitchIcon, YouTubeIcon } from "../icons";

import { ENV } from "@/data/env";

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 2;

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

const platformIcons: Record<string, React.JSX.Element> = {
  kick: <KickIcon className="h-4 w-4" />,
  youtube: <YouTubeIcon className="h-4 w-4" />,
  twitch: <TwitchIcon className="h-4 w-4" />,
};

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchResults = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${ENV.apiUrl}/api/search?q=${encodeURIComponent(q)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();

      setResults(data);
    } catch {
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setQuery(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (value.length < MIN_QUERY_LENGTH) {
        setResults(null);
        setLoading(false);

        return;
      }

      debounceRef.current = setTimeout(() => fetchResults(value), DEBOUNCE_MS);
    },
    [],
  );

  const renderUserItem = (platform: string, user: PlatformUser) => (
    <li
      key={platform}
      className="text-foreground hover:bg-default-200 flex items-center gap-2 truncate p-4 text-xs font-semibold"
    >
      <span className="flex items-center gap-2 capitalize">
        {platformIcons[platform.toLowerCase()] ?? platform}
      </span>

      {user.profile_image_url && (
        <Image
          alt={`${user.display_name} profile`}
          className="h-6 w-6 rounded-full object-cover"
          height={24}
          src={user.profile_image_url}
          width={24}
        />
      )}

      <span className="flex-1">{user.display_name || user.username}</span>

      {user.broadcaster_type === "partner" && (
        <BadgeCheck className="ml-auto h-5 w-5 text-blue-500" />
      )}

      {user.is_live && (
        <span className="ml-2 rounded-sm bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
          LIVE
        </span>
      )}

      {user.is_live && user.live_viewer_count !== null && (
        <span className="ml-2 rounded-sm bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
          {user.live_viewer_count} viewers
        </span>
      )}
    </li>
  );

  const hasResults =
    results && Object.values(results).some((user) => user !== null);

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
          <SearchIcon className="text-default-400 pointer-events-none shrink-0 text-base" />
        }
        type="search"
        value={query}
        onChange={handleInputChange}
      />

      {loading && (
        <div className="bg-default-100 absolute top-full right-0 left-0 z-10 rounded-sm p-2 text-center text-xs text-gray-500 shadow-sm backdrop-blur-md">
          Searching...
        </div>
      )}

      {!loading && results && (
        <div className="bg-default-100 absolute top-full right-0 left-0 z-10 rounded-b shadow-sm backdrop-blur-md">
          {hasResults ? (
            <ul>
              {Object.entries(results).map(
                ([platform, user]) => user && renderUserItem(platform, user),
              )}
            </ul>
          ) : (
            <div className="p-2 text-xs text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
