"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";

import { TokenRefreshProvider } from "@/context/TokenRefreshContext";
import { SidebarProvider } from "@/providers/sidebar-store-provider";
import { queryClient } from "@/services/react-query";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <TokenRefreshProvider>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <ToastProvider />
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </SidebarProvider>
        </QueryClientProvider>
      </TokenRefreshProvider>
    </HeroUIProvider>
  );
}
