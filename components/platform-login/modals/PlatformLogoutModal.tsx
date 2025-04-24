"use client";

// New modal to handle logging out of connected platforms
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useEffect, useState } from "react";

import { TwitchIcon, YouTubeIcon } from "@/components/icons";
import PlatformLogoutButton from "@/components/platform-login/buttons/PlatformLogoutButton";

interface PlatformLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformLoginState: { twitch: boolean; youtube: boolean };
}

const PlatformLogoutModal = ({
  isOpen,
  onClose,
  platformLoginState,
}: PlatformLogoutModalProps) => {
  const [isLoggingOut, setIsLoggingOut] = useState<Record<string, boolean>>({
    twitch: false,
    youtube: false,
  });

  const handleLogout = (platform: string) => {
    setIsLoggingOut((prev) => ({ ...prev, [platform]: true }));
    // Dummy API call simulation
    setTimeout(() => {
      setIsLoggingOut((prev) => ({ ...prev, [platform]: false }));
    }, 1000);
  };

  // Close modal automatically when no platforms remain logged in
  useEffect(() => {
    if (!platformLoginState.twitch && !platformLoginState.youtube) {
      onClose();
    }
  }, [platformLoginState, onClose]);

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h2 className="text-xl font-bold">Logout from Platforms</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                {platformLoginState.twitch && (
                  <PlatformLogoutButton
                    Icon={TwitchIcon}
                    isLoading={isLoggingOut.twitch}
                    name="Twitch"
                    onPress={() => handleLogout("twitch")}
                  />
                )}
                {platformLoginState.youtube && (
                  <PlatformLogoutButton
                    Icon={YouTubeIcon}
                    isLoading={isLoggingOut.youtube}
                    name="YouTube"
                    onPress={() => handleLogout("youtube")}
                  />
                )}
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
  );
};

export default PlatformLogoutModal;
