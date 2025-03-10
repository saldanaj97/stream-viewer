"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      <ToastProvider
        placement="bottom-right"
        toastProps={{
          radius: "full",
          classNames: {
            base: "bg-white dark:bg-slate-800",
            closeButton:
              "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
      />
    </HeroUIProvider>
  );
}
