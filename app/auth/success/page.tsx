"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  useEffect(() => {
    try {
      // Close the current window/tab
      window.close();

      // As a fallback, if the window doesn't close (some browsers prevent it),
      // redirect to the homepage
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      router.push(`/?error=invalid_auth_data`);
    }
  }, [data, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Authentication successful. This window will close automatically...</p>
    </div>
  );
}
