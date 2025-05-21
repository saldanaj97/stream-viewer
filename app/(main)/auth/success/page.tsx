"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function AuthSuccessContent() {
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams?.get("data");

  useEffect(() => {
    if (!data) {
      setHasError(true);
      setTimeout(() => {
        router.push(`/?error=invalid_auth_data`);
      }, 2000);

      return;
    }
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, [data, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {hasError ? (
        <p>
          Authentication failed. Please try again. If you are not redirected,
          please click <Link href="/">here</Link>.
        </p>
      ) : (
        <p>
          Authentication successful. You will now be redirected to the homepage.
          If you are not redirected, please click <Link href="/">here</Link>.
        </p>
      )}
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Authenticating with selected platform...</p>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
