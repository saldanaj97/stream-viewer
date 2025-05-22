"use client";

import { Spinner } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const TIMEOUT_IN_MS = 7000;

function PlatformLoginError() {
  const router = useRouter();
  const [redirectTimer, setRedirectTimer] = useState(TIMEOUT_IN_MS / 1000);

  useEffect(() => {
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
      <p className="text-center text-lg text-red-500">
        Platform authentication failed. Please try again.
      </p>
      <p className="text-center text-lg">
        If you continue to have issues, feel free to reach out to support. You
        will now be redirected to the homepage in {redirectTimer}s. If you are
        not redirected, please click <Link href="/">here</Link>.
      </p>
    </div>
  );
}

export default function AuthError() {
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
      <PlatformLoginError />
    </Suspense>
  );
}
