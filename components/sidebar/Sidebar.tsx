import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <aside
      className={`h-full overflow-y-auto bg-gray-700 p-4 transition-all duration-300 ease-in-out dark:bg-gray-800 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {isOpen ? (
        <ExpandedSidebar toggleSidebar={toggleSidebar} />
      ) : (
        <CollapsedSidebar toggleSidebar={toggleSidebar} />
      )}
    </aside>
  );
}