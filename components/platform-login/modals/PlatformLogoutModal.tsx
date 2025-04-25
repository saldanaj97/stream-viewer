"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useEffect } from "react";

import { TwitchIcon, YouTubeIcon } from "@/components/icons";
import PlatformLogoutButton from "@/components/platform-login/buttons/PlatformLogoutButton";
import { useTwitchLogout } from "@/hooks/useTwitchLogout";
import { useYoutubeLogout } from "@/hooks/useYoutubeLogout";
import { useAuthStore } from "@/providers/auth-store-provider";

interface PlatformLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformLoginState: { twitch: boolean; youtube: boolean; kick: boolean };
}

const PlatformLogoutModal = ({
  isOpen,
  onClose,
  platformLoginState,
}: PlatformLogoutModalProps) => {
  const twitchLogout = useTwitchLogout();
  const youtubeLogout = useYoutubeLogout();
  const setPlatformStatus = useAuthStore((state) => state.setPlatformStatus);

  const handleLogout = (platform: string) => {
    if (platform === "twitch") {
      twitchLogout.mutate();
      setPlatformStatus("twitch", false);
    }
    if (platform === "youtube") {
      youtubeLogout.mutate();
      setPlatformStatus("youtube", false);
    }
  };

  const renderAlert = (
    isSuccess: boolean,
    isError: boolean,
    error: unknown,
    platform: string,
  ) => {
    if (isSuccess) {
      return (
        <Alert color="success">Logged out from {platform} successfully.</Alert>
      );
    }
    if (isError) {
      const message =
        (error as { message?: string })?.message ||
        `Error logging out from ${platform}.`;

      return <Alert color="danger">{message}</Alert>;
    }

    return null;
  };

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
              {renderAlert(
                twitchLogout.isSuccess,
                twitchLogout.isError,
                twitchLogout.error,
                "Twitch",
              )}
              {renderAlert(
                youtubeLogout.isSuccess,
                youtubeLogout.isError,
                youtubeLogout.error,
                "YouTube",
              )}

              <div className="mt-4 flex flex-col gap-4">
                {platformLoginState.twitch && (
                  <PlatformLogoutButton
                    Icon={TwitchIcon}
                    isLoading={twitchLogout.isPending}
                    name="Twitch"
                    onPress={() => handleLogout("twitch")}
                  />
                )}
                {platformLoginState.youtube && (
                  <PlatformLogoutButton
                    Icon={YouTubeIcon}
                    isLoading={youtubeLogout.isPending}
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
