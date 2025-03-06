import "@/styles/globals.css";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { GithubIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex h-screen flex-col">
            <Navbar />
            <div className="flex flex-1 flex-row">
              <div className="sidebar-container h-full">
                <Sidebar />
              </div>
              <div className="flex-1">{children}</div>
            </div>
            <footer className="flex w-full flex-col items-center justify-center gap-2 py-3">
              <span className="text-sm text-gray-500">
                OmniView - Multiplatform Livestream Viewing Tool
              </span>
              <span className="text-sm text-gray-500">
                Developed by Juan Saldana
              </span>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={siteConfig.links.github}
              >
                <GithubIcon size={20} />
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
