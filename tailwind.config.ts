import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FAFAFA",
          secondary: "#FFF0EE",
          white: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F04444",
          hover: "#DC2626",
          light: "#FFF0EE",
          subtle: "#FEE2E2",
          dark: "#B91C1C",
        },
        foreground: {
          DEFAULT: "#171717",
          secondary: "#646464",
          muted: "#8A8A8A",
          subtle: "#A3A3A3",
        },
        border: {
          DEFAULT: "#E5E5E5",
          dark: "#D4D4D4",
          light: "#F0F0F0",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.02em",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        hover: "0 8px 24px -4px rgba(240, 68, 68, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

