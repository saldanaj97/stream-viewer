import { Button, useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";

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
  const [userLoggedInPlatformCount, setUserLoggedInPlatformCount] = useState(0);

  useEffect(() => {
    // Recalculate logged in platforms count whenever platforms change
    const count = Object.values(platforms).filter(
      (platform) => platform,
    ).length;

    setUserLoggedInPlatformCount(count);
  }, [platforms]);

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
