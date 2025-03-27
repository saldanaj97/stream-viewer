"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

import { PlatformLoginModal } from "./platform-login-modal";

import {
  CheckIcon,
  KickIcon,
  TwitchIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons";
import { useAuthStatus } from "@/hooks/useAuthStatusCheck";

export default function PlatformLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  const {
    isLoading: isCheckingAuth,
    error: authStatusError,
    platforms: platformLoginState,
  } = useAuthStatus();

  const userLoggedInPlatformCount = Object.values(platformLoginState).filter(
    (platform) => platform,
  ).length;

  const isUserLoggedInAllPlatforms = userLoggedInPlatformCount === 3;

  const PlatformStatus = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        <TwitchIcon
          className={
            platformLoginState.twitch ? "text-purple-500" : "text-gray-500"
          }
          size={20}
        />
        <span>
          {platformLoginState.twitch ? (
            <CheckIcon className="text-foreground" size={15} />
          ) : (
            <XIcon className="text-red-500" size={15} />
          )}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <YouTubeIcon
          className={
            platformLoginState.youtube ? "text-red-500" : "text-gray-500"
          }
          size={20}
        />
        <span>
          {platformLoginState.youtube ? (
            <CheckIcon className="text-foreground" size={15} />
          ) : (
            <XIcon className="text-red-500" size={15} />
          )}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <KickIcon
          className={
            platformLoginState.kick ? "text-green-500" : "text-gray-500"
          }
          size={20}
        />
        <span>
          {platformLoginState.kick ? (
            <CheckIcon className="text-foreground" size={15} />
          ) : (
            <XIcon className="text-red-500" size={15} />
          )}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="w-48 capitalize transition-all duration-300 ease-in-out"
          color={isUserLoggedInAllPlatforms ? "success" : "primary"}
          isLoading={isCheckingAuth}
          variant="flat"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPress={onOpen}
        >
          <div className="flex w-full items-center justify-center overflow-hidden">
            <div
              className={`absolute transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"}`}
            >
              <PlatformStatus />
            </div>
            <div
              className={`transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"}`}
            >
              {isUserLoggedInAllPlatforms
                ? "All Accounts Linked"
                : "Connect Accounts"}
            </div>
          </div>
        </Button>
      </div>

      <PlatformLoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
