"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useEffect, useState } from "react";

import { useTwitchLoginAuth } from "@/hooks/useTwitchLoginAuth";

export default function PlatformLoginModal() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data,
    error,
    isLoading,
    isLoggedIn: isLoggedInToTwitch,
  } = useTwitchLoginAuth();

  useEffect(() => {
    // When we have the URL, redirect to it and get the tokens
    if (data?.url && selectedPlatform) {
      // Store that we're authenticating with this platform
      localStorage.setItem("auth_in_progress", selectedPlatform);
      window.open(data.url, "_self");
    }
  }, [data, selectedPlatform]);

  // Check for returning from authentication
  useEffect(() => {
    const authInProgress = localStorage.getItem("auth_in_progress");

    // If we were authenticating and now we're logged in
    if (authInProgress === "twitch" && isLoggedInToTwitch) {
      // Clear the auth flag
      localStorage.removeItem("auth_in_progress");
      // Reopen the modal
      onOpen();
    }
  }, [isLoggedInToTwitch, onOpen]);

  // Make sure to reset selection when opening modal
  const handleOpen = () => {
    setSelectedPlatform(null);
    onOpen();
  };

  const handleLogin = (platform: string) => {
    setSelectedPlatform(platform);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="capitalize"
          color="primary"
          variant="flat"
          onPress={() => handleOpen()}
        >
          Login To Platforms
        </Button>
      </div>
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
                  isDisabled={false} // Update with actual YouTube login status
                  isLoading={isLoading}
                  variant="flat"
                  onPress={() => handleLogin("youtube")}
                >
                  <p className="text-lg font-semibold">
                    YouTube {false ? <>✅</> : <>❌</>}{" "}
                    {/* Update with YouTube login check */}
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
                  isDisabled={false} // Update with actual Kick login status
                  isLoading={isLoading}
                  variant="flat"
                  onPress={() => handleLogin("kick")}
                >
                  <p className="text-lg font-semibold">
                    Kick {false ? <>✅</> : <>❌</>}{" "}
                    {/* Update with Kick login check */}
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
}
