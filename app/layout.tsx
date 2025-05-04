import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import React from "react";

import { Providers } from "../providers/providers";

import { Navbar } from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Navbar />
          <div className="flex min-h-screen">
            <div className="sticky top-0 h-screen">
              <Sidebar />
            </div>
            <div className="container mx-auto flex flex-1 flex-col overflow-auto px-4">
              <main className="flex flex-1 flex-col">
                <div className="flex-grow">{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
