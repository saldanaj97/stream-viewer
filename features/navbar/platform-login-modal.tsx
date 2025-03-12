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
import { addToast } from "@heroui/toast";
import { useEffect, useState } from "react";

import { useTwitchLoginAuth } from "@/hooks/useTwitchLoginAuth";

export default function PlatformLoginModal() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isLoading } = useTwitchLoginAuth();

  useEffect(() => {
    // If the URL is null, it means the user is already logged in
    if (data && data.loggedIn) {
      addToast({
        title: "Login Successful",
        description: "You have successfully logged in to Twitch.",
        color: "success",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
      });

      return;
    }

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
                Choose a Platform to Login
              </ModalHeader>
              <ModalBody>
                <Button
                  color="primary"
                  isLoading={isLoading && selectedPlatform === "twitch"}
                  variant="flat"
                  onPress={() => {
                    handleLogin("twitch");
                    // addToast({
                    //   title: "Login Successful",
                    //   description: "You have successfully logged in to Twitch.",
                    //   color: "success",
                    //   promise: new Promise((resolve) =>
                    //     setTimeout(resolve, 3000),
                    //   ),
                    // });
                  }}
                >
                  {isLoading && selectedPlatform === "twitch"
                    ? "Connecting..."
                    : "Twitch"}
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
