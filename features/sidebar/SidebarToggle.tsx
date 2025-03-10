import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function SidebarToggle() {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);

  return (
    <button
      aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      className="flex h-8 w-8 items-center justify-center rounded text-white hover:bg-gray-500 focus:outline-none"
      onClick={toggleSidebar}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isSidebarOpen ? (
          <path
            d="M15 19l-7-7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        ) : (
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        )}
      </svg>
    </button>
  );
}
