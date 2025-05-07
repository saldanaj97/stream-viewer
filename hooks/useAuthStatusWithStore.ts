import { useEffect, useRef } from "react";

import { useAuthStatus } from "./useAuthStatusCheck";

import { useAuthStore } from "@/providers/auth-store-provider";

// Helper for deep comparison
const areEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

export const useAuthStatusWithStore = () => {
  // Get data from the API using existing hook
  const { isLoading, error, platforms, refetch } = useAuthStatus();

  // Get setter functions and current state from the Zustand store
  const setPlatformStatus = useAuthStore((state) => state.setPlatformStatus);
  const storePlatforms = useAuthStore((state) => state.platforms);

  // Previous platforms ref to avoid unnecessary updates
  const prevPlatformsRef = useRef(platforms);

  // Update the store with the latest platform statuses when they change
  useEffect(() => {
    if (!isLoading && platforms) {
      // Only update if the platforms data has changed
      if (!areEqual(platforms, prevPlatformsRef.current)) {
        // Instead of replacing all platforms at once (which can cause one platform to log out the other),
        // we update each platform individually if its status has changed
        Object.entries(platforms).forEach(([platform, status]) => {
          const typedPlatform = platform as keyof typeof storePlatforms;

          // Only update this platform's status if it's different from what's in the store
          if (status !== storePlatforms[typedPlatform]) {
            setPlatformStatus(typedPlatform, status);
          }
        });

        // Update prev ref after changes
        prevPlatformsRef.current = platforms;
      }
    }
  }, [isLoading, platforms, setPlatformStatus, storePlatforms]);

  return {
    isLoading,
    error,
    platforms: storePlatforms, // Return platforms from store, not from API
    refetch,
  };
};
