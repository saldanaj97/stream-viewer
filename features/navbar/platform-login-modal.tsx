import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useEffect, useState } from "react";

import { useAuthStatus } from "@/hooks/useAuthStatusCheck";
import { useKickLogin } from "@/hooks/useKickLogin";
import { useTwitchLogin } from "@/hooks/useTwitchLoginAuth";
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

  // This hook will check the login status of the user
  // and return the login status for each platform
  const {
    isLoading: isCheckingAuth,
    error: authStatusError,
    platforms: platformLoginState,
  } = useAuthStatus();

  // These hooks will fetch the login URL for each platform
  // but only if the user is not already authenticated with that platform
  const { data: twitchData, isLoading: isLoadingTwitchUrl } = useTwitchLogin({
    enabled: !isCheckingAuth && !platformLoginState.twitch,
  });

  const { data: youtubeData, isLoading: isLoadingYoutubeUrl } = useYoutubeLogin(
    {
      enabled: !isCheckingAuth && !platformLoginState.youtube,
    },
  );

  const { data: kickData, isLoading: isLoadingKickUrl } = useKickLogin({
    enabled: !isCheckingAuth && !platformLoginState.kick,
  });

  useEffect(() => {
    // When we get the URL, redirect to it and get the tokens
    if (twitchData?.url && selectedPlatform == "twitch") {
      window.open(twitchData.url, "_self");
    }

    if (youtubeData?.url && selectedPlatform == "youtube") {
      window.open(youtubeData.url, "_self");
    }

    if (kickData?.url && selectedPlatform == "kick") {
      window.open(kickData.url, "_self");
    }
  }, [selectedPlatform, twitchData, youtubeData, kickData]);

  useEffect(() => {
    const authInProgress = localStorage.getItem("auth_in_progress");

    // Add a timeout to handle failed authentication
    if (authInProgress) {
      const authTimeout = setTimeout(() => {
        localStorage.removeItem("auth_in_progress");
      }, 60000);

      return () => clearTimeout(authTimeout);
    }
  }, []);

  const handleLogin = (platform: string) => {
    setSelectedPlatform(platform);
    localStorage.setItem("auth_in_progress", platform);
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
                  isDisabled={platformLoginState.twitch}
                  isLoading={isCheckingAuth || isLoadingTwitchUrl}
                  variant="flat"
                  onPress={() => handleLogin("twitch")}
                >
                  <p className="text-lg font-semibold">
                    Twitch {platformLoginState.twitch ? <>✅</> : <>❌</>}
                  </p>
                </Button>

                {/* Youtube */}
                <Button
                  color="primary"
                  isDisabled={platformLoginState.youtube}
                  isLoading={isCheckingAuth || isLoadingYoutubeUrl}
                  variant="flat"
                  onPress={() => handleLogin("youtube")}
                >
                  <p className="text-lg font-semibold">
                    YouTube {platformLoginState.youtube ? <>✅</> : <>❌</>}
                  </p>
                </Button>

                {/* Kick */}
                <Button
                  color="primary"
                  isDisabled={platformLoginState.kick}
                  isLoading={isCheckingAuth || isLoadingKickUrl}
                  variant="flat"
                  onPress={() => handleLogin("kick")}
                >
                  <p className="text-lg font-semibold">
                    Kick {platformLoginState.kick ? <>✅</> : <>❌</>}
                  </p>
                </Button>

                {authStatusError && (
                  <div className="mt-2 text-red-500">
                    Error checking login status: {authStatusError.message}
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
