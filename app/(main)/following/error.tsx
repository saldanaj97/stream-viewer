"use client";

import { AlertCircle } from "lucide-react";

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorComponentProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="my-4 text-2xl font-bold md:text-3xl">Following</h1>
      <div className="rounded-lg bg-red-900/20 p-4 text-red-500">
        <div className="flex items-center">
          <AlertCircle className="mr-2" size={20} />
          <p>Error loading followed streams: {error.message}</p>
        </div>
        <button
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
