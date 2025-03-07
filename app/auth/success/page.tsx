"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  useEffect(() => {
    try {
      router.push("/");
    } catch (error: any) {
      console.error("Authentication error:", error);
      router.push(`/?error=invalid_auth_data`);
    }
  }, [data, router]);

  return <div>Completing authentication...</div>;
}
