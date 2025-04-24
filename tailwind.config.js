import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@heroui/theme/dist/components/(button|code|input|kbd|link|listbox|modal|navbar|snippet|toggle|ripple|spinner|form|divider|popover|scroll-shadow|skeleton|tabs|divider|tooltip).js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        platform: {
          twitch: "#9146FF", // Twitch color
          youtube: "#FF0000", // YouTube color
          kick: "#53FC19", // Kick color
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
