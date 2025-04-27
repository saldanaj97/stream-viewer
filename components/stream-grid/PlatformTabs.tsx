import { Tab, Tabs } from "@heroui/tabs";
import { Dispatch, SetStateAction } from "react";

import { getPlatformCursorClass } from "./utils";

import { StreamPlatform } from "@/types/stream.types";

export const PlatformTabs = ({
  setActivePlatformFilter,
  activePlatformFilter,
}: {
  setActivePlatformFilter: Dispatch<SetStateAction<StreamPlatform | "all">>;
  activePlatformFilter: "all" | StreamPlatform;
}) => {
  return (
    <Tabs
      aria-label="Platform filters"
      className="border-b border-neutral-800"
      classNames={{
        tabList: "gap-8",
        tab: "py-4 px-1",
        cursor: `${getPlatformCursorClass(activePlatformFilter)} h-0.5 transition-colors`,
        tabContent: `text-sm font-medium`,
      }}
      selectedKey={activePlatformFilter}
      variant="underlined"
      onSelectionChange={(key) =>
        setActivePlatformFilter(key as "all" | StreamPlatform)
      }
    >
      <Tab key="all" title="Overview" />
      <Tab key="twitch" title="Twitch" />
      <Tab key="youtube" title="YouTube" />
      <Tab key="kick" title="Kick" />
    </Tabs>
  );
};
