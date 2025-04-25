import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { useEffect, useState } from "react";

import { TwitchIcon, YouTubeIcon } from "@/components/icons";
import PlatformLoginButton from "@/components/platform-login/buttons/PlatformLoginButton";
import { useTwitchLogin } from "@/hooks/useTwitchLogin";
import { useYoutubeLogin } from "@/hooks/useYoutubeLogin";
import { useAuthStore } from "@/providers/auth-store-provider";

interface PlatformLoginProps {
  isOpen: boolean;
  onClose: () => void;
  isCheckingAuth: boolean;
  authStatusError: Error | null;
  platformLoginState: { twitch: boolean; youtube: boolean };
}

// Temporarily disable kick login until they add public API access for followed users

export const PlatformLoginModal = ({
  isOpen,
  onClose,
  isCheckingAuth,
  authStatusError,
  platformLoginState,
}: PlatformLoginProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const setPlatformStatus = useAuthStore((state) => state.setPlatformStatus);

  const {
    mutate: getTwitchLoginUrl,
    data: twitchData,
    isPending: isLoadingTwitchUrl,
    reset: resetTwitch,
  } = useTwitchLogin();

  const {
    mutate: getYoutubeLoginUrl,
    data: youtubeData,
    isPending: isLoadingYoutubeUrl,
    reset: resetYoutube,
  } = useYoutubeLogin();

  useEffect(() => {
    if (twitchData?.url && selectedPlatform === "twitch") {
      // Store that we're starting authentication process
      localStorage.setItem("auth_in_progress", "twitch");
      window.open(twitchData.url, "_self");
    }
    if (youtubeData?.url && selectedPlatform === "youtube") {
      // Store that we're starting authentication process
      localStorage.setItem("auth_in_progress", "youtube");
      window.open(youtubeData.url, "_self");
    }
  }, [selectedPlatform, twitchData, youtubeData]);

  useEffect(() => {
    if (isOpen) {
      resetTwitch();
      resetYoutube();
      setSelectedPlatform(null);
    }
  }, [isOpen, resetTwitch, resetYoutube]);

  useEffect(() => {
    const authInProgress = localStorage.getItem("auth_in_progress");

    // Handle completed authentication
    if (
      authInProgress &&
      (platformLoginState.twitch || platformLoginState.youtube)
    ) {
      // Update Zustand store when login is detected
      if (authInProgress === "twitch" && platformLoginState.twitch) {
        setPlatformStatus("twitch", true);
        localStorage.removeItem("auth_in_progress");
      }
      if (authInProgress === "youtube" && platformLoginState.youtube) {
        setPlatformStatus("youtube", true);
        localStorage.removeItem("auth_in_progress");
      }
    }

    // Add a timeout to handle failed authentication
    if (authInProgress) {
      const authTimeout = setTimeout(() => {
        localStorage.removeItem("auth_in_progress");
      }, 60000);

      return () => clearTimeout(authTimeout);
    }
  }, [platformLoginState, setPlatformStatus]);

  const handleLogin = (platform: string) => {
    setSelectedPlatform(platform);
    if (platform === "twitch") {
      getTwitchLoginUrl();
    } else if (platform === "youtube") {
      getYoutubeLoginUrl();
    }
  };

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <h1 className="text-2xl font-bold">Login to Platforms</h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">
                    Connect your accounts for a better experience!
                  </p>
                  <Tooltip
                    content={
                      <div className="max-w-xs rounded-md text-xs text-foreground shadow-lg">
                        Logging in lets Omniview fetch your subscriptions and
                        personalize your feed. Your data is secure, never shared
                        with third parties, and stored locally on your device.
                      </div>
                    }
                    placement="top"
                  >
                    <button
                      aria-label="More information"
                      className="flex h-3 w-3 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400"
                      type="button"
                    >
                      ?
                    </button>
                  </Tooltip>
                </div>
              </ModalHeader>

              <ModalBody>
                {/* Error handling */}
                {authStatusError && (
                  <div className="mb-4 text-center text-red-500">
                    Error checking login status: {authStatusError.message}
                  </div>
                )}

                {/* Platform Buttons Container */}
                <div className="flex flex-col gap-4">
                  <PlatformLoginButton
                    Icon={TwitchIcon}
                    isDisabled={platformLoginState.twitch}
                    isLoading={isCheckingAuth || isLoadingTwitchUrl}
                    isLoggedIn={platformLoginState.twitch}
                    name="Twitch"
                    onPress={() => handleLogin("twitch")}
                  />
                  <PlatformLoginButton
                    Icon={YouTubeIcon}
                    isDisabled={platformLoginState.youtube}
                    isLoading={isCheckingAuth || isLoadingYoutubeUrl}
                    isLoggedIn={platformLoginState.youtube}
                    name="YouTube"
                    onPress={() => handleLogin("youtube")}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
