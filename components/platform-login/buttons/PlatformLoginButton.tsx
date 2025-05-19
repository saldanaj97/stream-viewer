import { Button } from "@heroui/react";
import React from "react";

import { CheckIcon, XIcon } from "@/components/icons";
import { getPlatformByKey } from "@/components/sidebar/platforms";

interface PlatformLoginButtonProps {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  isDisabled: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  onPress: () => void;
}

export const PlatformLoginButton = ({
  name,
  Icon,
  isDisabled,
  isLoading,
  isLoggedIn,
  onPress,
}: PlatformLoginButtonProps) => {
  const platform = getPlatformByKey(name);
  const bgColor = platform?.color || "";

  return (
    <Button
      className={`justify-start ${bgColor}`}
      isDisabled={isDisabled}
      isLoading={isLoading}
      variant="flat"
      onPress={onPress}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <Icon aria-label={`${name} icon`} className="h-5 w-5" />
          {name}
        </span>
        <span>
          {isLoggedIn ? (
            <CheckIcon className="text-foreground" size={20} />
          ) : (
            <XIcon className="text-foreground" size={20} />
          )}
        </span>
      </div>
    </Button>
  );
};

export default PlatformLoginButton;
