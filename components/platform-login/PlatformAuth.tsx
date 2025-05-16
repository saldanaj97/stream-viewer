"use client";

import PlatformLogin from "./PlatformLogin";
import PlatformLogout from "./PlatformLogout";

import { useAuthStatusWithStore } from "@/hooks/useAuth";

export const PlatformAuth = () => {
  const { isLoading, error, platforms } = useAuthStatusWithStore();

  return (
    <>
      <PlatformLogin
        error={error}
        isLoading={isLoading}
        platforms={platforms}
      />
      <PlatformLogout
        error={error}
        isLoading={isLoading}
        platforms={platforms}
      />
    </>
  );
};
