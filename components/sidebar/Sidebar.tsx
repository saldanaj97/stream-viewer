"use client";

import { useState } from "react";

import CollapsedSidebar from "./CollapsedSidebar";
import ExpandedSidebar from "./ExpandedSidebar";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
