export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "OmniView",
  description: "Watch and view chat from multiple stream platforms at once.",
  navItems: [],
  navMenuItems: [
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/saldanaj97",
  },
};
