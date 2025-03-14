"use client";

import AuthenticatedSidebar from "./authenticated/AuthenticatedSidebar";

// TODO: Potentially display a sidebar for top streams when not authenticted
export default function Sidebar() {
  return <AuthenticatedSidebar />;
}
