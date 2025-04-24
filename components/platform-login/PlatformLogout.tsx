import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import PlatformLogoutModal from "./modals/PlatformLogoutModal";

interface PlatformLogoutProps {
  isLoading: boolean;
  error: Error | null;
  platforms: {
    twitch: boolean;
    youtube: boolean;
    kick: boolean;
  };
}

const PlatformLogout = ({ platforms }: PlatformLogoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userLoggedInPlatformCount = Object.values(platforms).filter(
    (platform) => platform,
  ).length;

  return (
    <>
      {userLoggedInPlatformCount > 0 && (
        <>
          <Button color="danger" variant="flat" onPress={onOpen}>
            Logout
          </Button>
          <PlatformLogoutModal
            isOpen={isOpen}
            platformLoginState={platforms}
            onClose={onClose}
          />
        </>
      )}
    </>
  );
};

export default PlatformLogout;
