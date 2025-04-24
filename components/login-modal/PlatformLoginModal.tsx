"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

import { PlatformLogin } from "./PlatformLogin";

import { CheckIcon, TwitchIcon, XIcon, YouTubeIcon } from "@/components/icons";
import { useAuthStatus } from "@/hooks/useAuthStatusCheck";

export default function PlatformLoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, error, platforms } = useAuthStatus();

  const userLoggedInPlatformCount = Object.values(platforms).filter(
    (platform) => platform,
  ).length;

  const isUserLoggedInAllPlatforms = userLoggedInPlatformCount === 2;

  const PlatformStatus = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        <TwitchIcon
          className={platforms.twitch ? "text-purple-500" : "text-gray-500"}
          size={20}
        />
        <span>
          {platforms.twitch ? (
            <CheckIcon className="text-foreground" size={15} />
          ) : (
            <XIcon className="text-red-500" size={15} />
          )}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <YouTubeIcon
          className={platforms.youtube ? "text-red-500" : "text-gray-500"}
          size={20}
        />
        <span>
          {platforms.youtube ? (
            <CheckIcon className="text-foreground" size={15} />
          ) : (
            <XIcon className="text-red-500" size={15} />
          )}
        </span>
      </div>
      {/*  Currently, no use for kick since they do not have a public API call to fetch the followed streamers */}
      {/* <div className="flex items-center space-x-1">
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
      </div> */}
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="w-48 capitalize transition-all duration-300 ease-in-out"
          color={isUserLoggedInAllPlatforms ? "success" : "primary"}
          isLoading={isLoading}
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

      <PlatformLogin
        authStatusError={error}
        isCheckingAuth={isLoading}
        isOpen={isOpen}
        platformLoginState={platforms}
        onClose={onClose}
      />
    </>
  );
}
