import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import React from "react";

import { MultiViewBar } from "@/components/multistream-view/MultiViewBar";
import { Navbar } from "@/components/navbar/navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { MultiViewBarProvider } from "@/providers/multiview-bar-provider";
import { Providers } from "@/providers/providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const Footer = () => {
  return (
    <footer className="mt-auto flex w-full flex-shrink-0 flex-col items-center justify-center gap-2 py-3">
      <span className="text-sm text-neutral-500">
        OmniView - Multiplatform Livestream Viewing Tool
      </span>
      <span className="text-sm text-neutral-500">
        Developed by <a href="https://www.twitch.tv/thatjuandev">thatjuandev</a>
      </span>
    </footer>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>{siteConfig.name}</title>
      </head>
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <MultiViewBarProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <Navbar />
            <div>{children}</div>
            <MultiViewBar />
            <Footer />
          </Providers>
        </MultiViewBarProvider>
      </body>
    </html>
  );
}
