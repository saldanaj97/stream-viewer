"use client";

import { useState } from "react";
import useSWR from "swr";

import TopStreams from "../components/top-streams/TopStreams";

import Sidebar from "@/components/sidebar/Sidebar";
import { authFetcher } from "@/helpers/fetchers";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { error, isLoading } = useSWR(
    "http://localhost:8000/api/auth/",
    authFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 3600000,
    },
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the top streams. </div>;

  return (
    <div className="flex min-h-screen flex-col text-white md:flex-row">
      <div
        className={`sidebar-container fixed z-10 h-full transition-all duration-300 ease-in-out md:relative ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex flex-col bg-gray-800">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </div>
      <main
        className={`flex-1 p-4 transition-all duration-300 ease-in-out md:ml-16`}
      >
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">Top Streams</h1>
        <TopStreams />
      </main>
    </div>
  );
}
