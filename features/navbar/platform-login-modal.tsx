import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useEffect, useState } from "react";

import { useTwitchLoginAuth } from "@/hooks/useTwitchLoginAuth";
import { useYoutubeLogin } from "@/hooks/useYoutubeLoginAuth";

interface PlatformLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlatformLoginModal = ({
  isOpen,
  onClose,
}: PlatformLoginModalProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const {
    data: twitchData,
    error: twitchDataError,
    isLoading: isLoadingTwitchData,
    isLoggedIn: isLoggedInToTwitch,
  } = useTwitchLoginAuth();

  const {
    data: youtubeData,
    error: youtubeDataError,
    isLoading: isLoadingYoutubeData,
    isLoggedIn: isLoggedInToYoutube,
  } = useYoutubeLogin();

  // Default values for other platforms until their auth hooks are implemented
  const isLoggedInToKick = false;

  useEffect(() => {
    // When we get the URL, redirect to it and get the tokens
    if (twitchData?.url && selectedPlatform == "twitch") {
      localStorage.setItem("auth_in_progress", selectedPlatform);
      window.open(twitchData.url, "_self");
    }

    if (youtubeData?.url && selectedPlatform == "youtube") {
      localStorage.setItem("auth_in_progress", selectedPlatform);
      window.open(youtubeData.url, "_self");
    }
  }, [twitchData, selectedPlatform, youtubeData]);

  // Returing to the app after authentication
  useEffect(() => {
    const authInProgress = localStorage.getItem("auth_in_progress");

    if (authInProgress === "twitch" && isLoggedInToTwitch) {
      localStorage.removeItem("auth_in_progress");
    } else if (authInProgress === "youtube" && isLoggedInToYoutube) {
      localStorage.removeItem("auth_in_progress");
    } else if (authInProgress === "kick" && isLoggedInToKick) {
      localStorage.removeItem("auth_in_progress");
    }
  }, [isLoggedInToTwitch, isLoggedInToYoutube]);

  const handleLogin = (platform: string) => {
    setSelectedPlatform(platform);
  };

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Login to Platforms</h1>
                <p className="text-sm text-gray-500">
                  Connect your accounts for a better experience!
                </p>
              </ModalHeader>
              <ModalBody>
                {/* Twitch */}
                <Button
                  color="primary"
                  isDisabled={isLoggedInToTwitch}
                  isLoading={isLoadingTwitchData}
                  variant="flat"
                  onPress={() => handleLogin("twitch")}
                >
                  <p className="text-lg font-semibold">
                    Twitch {isLoggedInToTwitch ? <>✅</> : <>❌</>}
                  </p>
                </Button>
                {twitchDataError && (
                  <div className="mt-2 text-red-500">
                    Error connecting with Twitch: {twitchDataError.message}
                  </div>
                )}
                {/* Youtube */}
                <Button
                  color="primary"
                  isDisabled={isLoggedInToYoutube}
                  isLoading={isLoadingYoutubeData}
                  variant="flat"
                  onPress={() => handleLogin("youtube")}
                >
                  <p className="text-lg font-semibold">
                    YouTube {isLoggedInToYoutube ? <>✅</> : <>❌</>}
                  </p>
                </Button>
                {youtubeDataError && (
                  <div className="mt-2 text-red-500">
                    Error connecting with Youtube: {youtubeDataError.message}
                  </div>
                )}
                {/* Kick */}
                <Button
                  color="primary"
                  isDisabled={isLoggedInToKick}
                  isLoading={isLoadingTwitchData}
                  variant="flat"
                  onPress={() => handleLogin("kick")}
                >
                  <p className="text-lg font-semibold">
                    Kick {isLoggedInToKick ? <>✅</> : <>❌</>}
                  </p>
                </Button>
                {twitchDataError && (
                  <div className="mt-2 text-red-500">
                    Error connecting with Kick: {twitchDataError.message}
                  </div>
                )}
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
