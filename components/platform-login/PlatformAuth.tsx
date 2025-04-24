"use client";

import PlatformLogin from "./PlatformLogin";
import PlatformLogout from "./PlatformLogout";

import { useAuthStatus } from "@/hooks/useAuthStatusCheck";

export const PlatformAuth = () => {
  const { isLoading, error, platforms } = useAuthStatus();

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
