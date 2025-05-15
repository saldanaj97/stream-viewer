import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { SearchIcon } from "lucide-react";

export default function SearchInput() {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-200",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
      }
      type="search"
    />
  );
}
