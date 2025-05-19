"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

import { TokenRefreshProvider } from "@/context/TokenRefreshContext";
import { AuthProvider } from "@/providers/auth-store-provider";
import { MultiViewBarProvider } from "@/providers/multiview-bar-provider";
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
          <MultiViewBarProvider>
            <AuthProvider>
              <SidebarProvider>
                <NextThemesProvider {...themeProps}>
                  {children}
                </NextThemesProvider>
              </SidebarProvider>
            </AuthProvider>
          </MultiViewBarProvider>
        </QueryClientProvider>
      </TokenRefreshProvider>
    </HeroUIProvider>
  );
}
