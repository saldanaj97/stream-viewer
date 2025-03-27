"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";

import { SidebarProvider } from "@/providers/sidebar-store-provider";
import { UserStoreProvider } from "@/providers/user-store-provider";
import { queryClient } from "@/services/react-query";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <QueryClientProvider client={queryClient}>
        <UserStoreProvider>
          <SidebarProvider>
            <ToastProvider />
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </SidebarProvider>
        </UserStoreProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
