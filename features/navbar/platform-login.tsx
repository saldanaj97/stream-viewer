"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import { PlatformLoginModal } from "./platform-login-modal";

export default function PlatformLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="capitalize"
          color="primary"
          variant="flat"
          onPress={onOpen}
        >
          Login To Platforms
        </Button>
      </div>

      <PlatformLoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
