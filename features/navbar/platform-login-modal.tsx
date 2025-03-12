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
      window.open(data.url);
    }
  }, [data, selectedPlatform]);

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
                  isDisabled={isLoggedInToTwitch}
                  isLoading={isLoading}
                  variant="flat"
                  onPress={() => handleLogin("twitch")}
                >
                  <p className="text-lg font-semibold">
                    YouTube {isLoggedInToTwitch ? <>✅</> : <>❌</>}
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
                  isDisabled={isLoggedInToTwitch}
                  isLoading={isLoading}
                  variant="flat"
                  onPress={() => handleLogin("twitch")}
                >
                  <p className="text-lg font-semibold">
                    Kick {isLoggedInToTwitch ? <>✅</> : <>❌</>}
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
