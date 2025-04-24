import { Button } from "@heroui/button";
import React from "react";

interface PlatformLogoutButtonProps {
  name: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  isLoading: boolean;
  onPress: () => void;
}

const PlatformLogoutButton = ({
  Icon,
  isLoading,
  name,
  onPress,
}: PlatformLogoutButtonProps) => {
  return (
    <Button
      className={`justify-start border-red-500 text-red-500 hover:bg-red-300 hover:text-red-700`}
      isLoading={isLoading}
      variant="flat"
      onPress={onPress}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <Icon
            aria-label={`${name} logout icon`}
            className="h-5 w-5"
            size={20}
          />
          Logout {name}
        </span>
      </div>
    </Button>
  );
};

export default PlatformLogoutButton;
