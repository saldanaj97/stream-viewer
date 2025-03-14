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
    data,
    error,
    isLoading,
    isLoggedIn: isLoggedInToTwitch,
  } = useTwitchLoginAuth();

  // Default values for other platforms until their auth hooks are implemented
  const isLoggedInToYoutube = false;
  const isLoggedInToKick = false;

  useEffect(() => {
    // When we get the URL, redirect to it and get the tokens
    if (data?.url && selectedPlatform) {
      localStorage.setItem("auth_in_progress", selectedPlatform);
      window.open(data.url, "_self");
    }
  }, [data, selectedPlatform]);

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
  }, [isLoggedInToTwitch]);

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
                  isLoading={isLoading}
                  variant="flat"
                  onPress={() => handleLogin("twitch")}
                >
                  <p className="text-lg font-semibold">
                    Twitch {isLoggedInToTwitch ? <>✅</> : <>❌</>}
                  </p>
                </Button>
                {error && (
                  <div className="mt-2 text-red-500">
                    Error connecting: {error.message}
                  </div>
                )}
                {/* Youtube */}
                <Button
                  color="primary"
                  isDisabled={isLoggedInToYoutube}
                  isLoading={isLoading}
                  variant="flat"
                  onPress={() => handleLogin("youtube")}
                >
                  <p className="text-lg font-semibold">
                    YouTube {isLoggedInToYoutube ? <>✅</> : <>❌</>}
                  </p>
                </Button>
                {error && (
                  <div className="mt-2 text-red-500">
                    Error connecting: {error.message}
                  </div>
                )}
                {/* Kick */}
                <Button
                  color="primary"
                  isDisabled={isLoggedInToKick}
                  isLoading={isLoading}
                  variant="flat"
                  onPress={() => handleLogin("kick")}
                >
                  <p className="text-lg font-semibold">
                    Kick {isLoggedInToKick ? <>✅</> : <>❌</>}
                  </p>
                </Button>
                {error && (
                  <div className="mt-2 text-red-500">
                    Error connecting: {error.message}
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
