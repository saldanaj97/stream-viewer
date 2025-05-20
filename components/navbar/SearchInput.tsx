"use client";

import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import UserItem, { Platform, PlatformUser } from "./UserItem";

import { ENV } from "@/data/env";

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 2;

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Record<
    string,
    PlatformUser | null
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const resultsListRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  const fetchResults = useCallback(async (q: string) => {
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
  }, []);

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
    [fetchResults],
  );

  const handleBlur = useCallback(() => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    blurTimeoutRef.current = setTimeout(() => {
      if (!isNavigating) {
        setIsFocused(false);
      }
    }, 150);
  }, [isNavigating]);

  const handleItemClick = useCallback(
    (platform: string, channel: string, id?: string) => {
      setIsNavigating(true);

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      setTimeout(() => {
        const url = `/watch?platform=${platform.toLowerCase()}&channel=${channel}${id ? `&id=${id}` : ""}`;

        router.push(url);

        setQuery("");
        setResults(null);
        setIsFocused(false);
        setIsNavigating(false);
      }, 50);
    },
    [router],
  );

  const hasResults = useMemo(
    () => results && Object.values(results).some((user) => user !== null),
    [results],
  );

  const resultEntries = useMemo(
    () =>
      results
        ? Object.entries(results).filter(([, user]) => user !== null)
        : [],
    [results],
  );

  const scrollSelectedIntoView = useCallback((idx: number) => {
    if (!resultsListRef.current) return;
    const item = resultsListRef.current.children[idx] as
      | HTMLElement
      | undefined;

    if (item) item.scrollIntoView({ block: "nearest" });
  }, []);

  // Keyboard navigation accessibility improvements
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isFocused || !resultEntries.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev < resultEntries.length - 1 ? prev + 1 : 0;

          setTimeout(() => scrollSelectedIntoView(next), 0);

          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : resultEntries.length - 1;

          setTimeout(() => scrollSelectedIntoView(next), 0);

          return next;
        });
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        const [platform, user] = resultEntries[selectedIndex];

        if (user) handleItemClick(platform, user.username, user.id);
      } else if (e.key === "Escape") {
        setIsFocused(false);
      }
    },
    [
      isFocused,
      resultEntries,
      selectedIndex,
      handleItemClick,
      scrollSelectedIntoView,
    ],
  );

  useEffect(() => {
    if (!isFocused) setSelectedIndex(-1);
  }, [isFocused, resultEntries.length]);

  return (
    <div
      ref={searchContainerRef}
      className={`relative w-full max-w-[300px] rounded-t-lg p-1.5 ${
        isFocused &&
        "bg-default-100/80 z-20 shadow-xl/70 shadow-[0_-1px_24px_-2px_rgba(0,0,0,0.25)]"
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
        onBlur={handleBlur}
        onChange={handleInputChange}
        onClear={() => {
          setQuery("");
          setResults(null);
          setLoading(false);
        }}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
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
        <div
          aria-label="Search results"
          className="bg-default-100 absolute top-full right-0 left-0 z-10 w-full rounded-b-lg shadow-xl/70"
          role="listbox"
          tabIndex={0}
          onMouseDown={(e) => e.preventDefault()}
        >
          {hasResults ? (
            <ul ref={resultsListRef}>
              {resultEntries.map(([platform, user], idx) =>
                user ? (
                  <UserItem
                    key={platform}
                    platform={platform as Platform}
                    selected={selectedIndex === idx}
                    user={user}
                    onItemClick={handleItemClick}
                  />
                ) : null,
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
