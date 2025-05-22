"use client";

import { Spinner } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const TIMEOUT_IN_MS = 3000;

function PlatformLoginSuccess() {
  const router = useRouter();
  const [redirectTimer, setRedirectTimer] = useState(TIMEOUT_IN_MS / 1000);
  const [platform, setPlatform] = useState<string>("Platform");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("platform");

    if (value) {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);

      setPlatform(capitalized);
    }

    const interval = setInterval(() => {
      setRedirectTimer((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
    }, TIMEOUT_IN_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-success text-center text-lg">
        {platform} authentication successful.
      </p>
      <p className="text-center text-lg">
        You will now be redirected to the homepage in {redirectTimer}s. If you
        are not redirected, please click <Link href="/">here</Link>.
      </p>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner
            classNames={{ label: "text-foreground mt-4" }}
            label="Authenticating with selected platform..."
            variant="gradient"
          />
        </div>
      }
    >
      <PlatformLoginSuccess />
    </Suspense>
  );
}
