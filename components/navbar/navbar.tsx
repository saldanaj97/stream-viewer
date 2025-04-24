import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import NextLink from "next/link";

import { PlatformAuth } from "../platform-login/PlatformAuth";

import { Logo, SearchIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/styles/theme/theme-switch";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-200",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      className="shadow-md dark:bg-default-100"
      maxWidth="full"
      position="sticky"
    >
      {/* Desktop Navbar */}
      <NavbarContent className="basis-1/4" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">OmniView</p>
          </NextLink>
        </NavbarBrand>
        <NavbarItem>
          <NextLink href="/multiview">
            <span className="cursor-pointer text-sm font-medium hover:text-primary">
              Multi-Stream
            </span>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/following">
            <span className="cursor-pointer text-sm font-medium hover:text-primary">
              Following
            </span>
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      {/* Navbar Buttons and Search Bar */}
      <NavbarContent className="hidden basis-2/4 sm:flex" justify="center">
        <NavbarItem className="hidden w-full lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden basis-1/4 sm:flex" justify="end">
        <ThemeSwitch />
        <PlatformAuth />
      </NavbarContent>

      {/* Mobile Navbar */}
      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Link color="foreground" href="/multiview" size="lg">
              Multi-Stream Viewer
            </Link>
          </NavbarMenuItem>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
