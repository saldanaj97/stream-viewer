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

const platformIcons = {
  kick: <KickIcon className="h-4 w-4" />,
  youtube: <YouTubeIcon className="h-4 w-4" />,
  twitch: <TwitchIcon className="h-4 w-4" />,
} as const;

const platformColor = {
  kick: "platform-kick",
  youtube: "platform-youtube",
  twitch: "platform-twitch",
} as const;

type Platform = keyof typeof platformColor;

function UserItem({
  platform,
  user,
}: {
  platform: Platform;
  user: PlatformUser;
}) {
  const [imgError, setImgError] = useState(false);

  const {
    username,
    display_name,
    profile_image_url,
    broadcaster_type,
    is_live,
    live_viewer_count,
  } = user;

  return (
    <li
      key={platform}
      className="text-foreground hover:bg-default-200 flex items-center gap-2 truncate rounded p-4 text-xs font-semibold"
    >
      <span className="flex items-center gap-2 capitalize">
        {platformIcons[platform] ?? platform}
      </span>

      {profile_image_url && !imgError ? (
        <Image
          priority
          unoptimized
          alt={`${username} profile`}
          className="rounded-full object-cover"
          height={25}
          sizes="25px"
          src={profile_image_url}
          width={25}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-600 text-sm font-semibold text-white">
          {username?.charAt(0).toUpperCase()}
        </span>
      )}

      <span className="flex-1">{display_name || username}</span>

      {broadcaster_type === "partner" && (
        <BadgeCheck
          className={`ml-auto h-5 w-5 text-${platformColor[platform]}`}
        />
      )}

      {is_live && (
        <span className="ml-2 rounded-sm bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
          LIVE
        </span>
      )}

      {is_live && live_viewer_count !== null && (
        <span className="ml-2 rounded-sm bg-green-500 px-1.5 py-0.5 text-[10px] text-white">
          {live_viewer_count} viewers
        </span>
      )}
    </li>
  );
}

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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

  const hasResults =
    results && Object.values(results).some((user) => user !== null);

  return (
    <div
      className={`relative w-full max-w-[300px] rounded-t-lg p-1.5 ${
        isFocused && "bg-default-100/80 z-20 shadow-xl/70"
      }`}
    >
      <Input
        isClearable
        aria-label="Search"
        autoComplete="off"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            "focus-visible:outline-none",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "bg-default-200/50",
            "dark:bg-default-60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "shadow-inner",
            "!cursor-text",
          ],
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-default-400 pointer-events-none size-4 shrink-0 text-base" />
        }
        type="search"
        value={query}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        onClear={() => {
          setQuery("");
          setResults(null);
          setLoading(false);
        }}
        onFocus={() => setIsFocused(true)}
      />

      {loading && (
        <div className="bg-default-100 absolute top-full right-0 left-0 z-10 w-full rounded-b-lg p-2 text-center text-xs text-gray-500 shadow-xl/70 backdrop-blur-md">
          Searching...
        </div>
      )}

      {isFocused && query.length === 0 && !loading && (
        <div className="bg-default-100 absolute top-full right-0 left-0 z-10 w-full rounded-b-lg shadow-xl/70">
          <div className="p-3 text-xs text-gray-500">
            <div>
              <span className="font-semibold">YouTube:</span> Use the{" "}
              <span className="font-mono">handle</span> (e.g.{" "}
              <span className="font-mono">@channelname</span>)
            </div>
            <div>
              <span className="font-semibold">Twitch & Kick:</span> Use the{" "}
              <span className="font-mono">username</span>
            </div>
          </div>
        </div>
      )}

      {!loading && results && isFocused && (
        <div className="bg-default-100 absolute top-full right-0 left-0 z-10 w-full rounded-b-lg shadow-xl/70">
          {hasResults ? (
            <ul>
              {Object.entries(results).map(
                ([platform, user]) =>
                  user && (
                    <UserItem
                      key={platform}
                      platform={platform as Platform}
                      user={user}
                    />
                  ),
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
