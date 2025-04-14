import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function SidebarToggle() {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);

  return (
    <button
      aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
      onClick={toggleSidebar}
    >
      {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
    </button>
  );
}
