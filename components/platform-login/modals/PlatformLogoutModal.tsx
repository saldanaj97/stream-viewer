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
import { useEffect, useState } from "react";

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

type Platform = "twitch" | "youtube";

interface AlertItem {
  id: string;
  platform: string;
  type: "success" | "error";
  message: string;
}

const ALERT_TIMEOUT = 3000; // 3 seconds

const PlatformLogoutModal = ({
  isOpen,
  onClose,
  platformLoginState,
}: PlatformLogoutModalProps) => {
  const twitchLogout = useTwitchLogout();
  const youtubeLogout = useYoutubeLogout();
  const setPlatformStatus = useAuthStore((state) => state.setPlatformStatus);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const handleLogout = (platform: Platform) => {
    const logoutMutation = platform === "twitch" ? twitchLogout : youtubeLogout;

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setPlatformStatus(platform, false);
        const alertId = `${platform}-${Date.now()}`;

        setAlerts((prev) => [
          ...prev.filter((alert) => alert.platform !== platform),
          {
            id: alertId,
            platform,
            type: "success",
            message: `Logged out from ${platform} successfully.`,
          },
        ]);

        // Auto-dismiss alert after timeout
        setTimeout(() => {
          setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
        }, ALERT_TIMEOUT);
      },
      onError: (error) => {
        const errorMessage =
          (error as { message?: string })?.message ||
          `Error logging out from ${platform}.`;

        const alertId = `${platform}-${Date.now()}`;

        setAlerts((prev) => [
          ...prev.filter((alert) => alert.platform !== platform),
          {
            id: alertId,
            platform,
            type: "error",
            message: errorMessage,
          },
        ]);

        // Auto-dismiss alert after timeout
        setTimeout(() => {
          setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
        }, ALERT_TIMEOUT);
      },
    });
  };

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  // Close modal if no platforms are logged in
  useEffect(() => {
    if (isOpen && !platformLoginState.twitch && !platformLoginState.youtube) {
      onClose();
    }
  }, [platformLoginState, onClose, isOpen]);

  // Platform config for rendering logout buttons
  const platformConfig = [
    {
      name: "Twitch" as const,
      key: "twitch" as const,
      Icon: TwitchIcon,
      isLoggedIn: platformLoginState.twitch,
      isLoading: twitchLogout.isPending,
    },
    {
      name: "YouTube" as const,
      key: "youtube" as const,
      Icon: YouTubeIcon,
      isLoggedIn: platformLoginState.youtube,
      isLoading: youtubeLogout.isPending,
    },
  ];

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-xl font-bold">Logout from Platforms</h2>
        </ModalHeader>
        <ModalBody>
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              className="relative mb-2 pr-8"
              color={alert.type === "success" ? "success" : "danger"}
            >
              {alert.message}
              <button
                aria-label="Close"
                className="absolute right-1 top-1 p-1 text-xs"
                onClick={() => dismissAlert(alert.id)}
              >
                ✕
              </button>
            </Alert>
          ))}

          <div className="mt-4 flex flex-col gap-4">
            {platformConfig
              .filter((platform) => platform.isLoggedIn)
              .map((platform) => (
                <PlatformLogoutButton
                  key={platform.key}
                  Icon={platform.Icon}
                  isLoading={platform.isLoading}
                  name={platform.name}
                  onPress={() => handleLogout(platform.key)}
                />
              ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlatformLogoutModal;
