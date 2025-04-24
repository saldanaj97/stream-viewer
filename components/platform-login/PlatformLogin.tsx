import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import { CheckIcon, TwitchIcon, XIcon, YouTubeIcon } from "../icons";

import { PlatformLoginModal } from "./modals/PlatformLoginModal";

interface PlatformLoginProps {
  isLoading: boolean;
  error: Error | null;
  platforms: {
    twitch: boolean;
    youtube: boolean;
    kick: boolean;
  };
}

const PlatformStatus = ({
  platforms,
}: {
  platforms: PlatformLoginProps["platforms"];
}) => (
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
  </div>
);

export default function PlatformLogin({
  platforms,
  isLoading,
  error,
}: PlatformLoginProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const userLoggedInPlatformCount = Object.values(platforms).filter(
    (platform) => platform,
  ).length;

  const isUserLoggedInAllPlatforms = userLoggedInPlatformCount === 2;

  return (
    <>
      <Button
        className="w-48 capitalize transition-all duration-300 ease-in-out"
        color={isUserLoggedInAllPlatforms ? "success" : "primary"}
        isLoading={isLoading}
        variant="flat"
        onPress={onOpen}
      >
        {!isLoading && (
          <div className="group relative flex w-full items-center justify-center overflow-hidden">
            <div className="absolute opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <PlatformStatus platforms={platforms} />
            </div>
            <div className="opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
              {isUserLoggedInAllPlatforms
                ? "All Accounts Linked"
                : "Connect Accounts"}
            </div>
          </div>
        )}
      </Button>
      <PlatformLoginModal
        authStatusError={error}
        isCheckingAuth={isLoading}
        isOpen={isOpen}
        platformLoginState={platforms}
        onClose={onClose}
      />
    </>
  );
}
