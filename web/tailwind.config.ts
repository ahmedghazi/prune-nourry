import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "768px",
      md: "1080px",
      lg: "1600px",
    },
    spacing: {
      "0": "0",
      "02e": "0.2em",
      "05e": "0.5em",
      1: "1px",
      "1e": "1em",
      "1re": "1rem",
      sm: "var(--space-sm)",
      md: "var(--space-md)",
      lg: "var(--space-lg)",
      "md--mobile": "var(--space-md--mobile)",
      gutter: "var(--gutter)",
      "header-height": "var(--header-height)",
    },
    colors: {
      black: "black",
      white: "white",
      red: "var(--color-red)",

      gray: "var(--color-gray)",
    },
    fontSize: {
      sm: ["var(--text-sm)", "1.1"],
      md: ["var(--text-md)", "1.4"],
      lg: ["var(--text-lg)", "1"],
      "sm--mobile": ["var(--text-sm--mobile)", "1.1"],
      // md: ["var(--text-md)", "1.4"],
      "lg--mobile": ["var(--text-lg--mobile)", "1"],
      // "text-lg--mobile": ["var(--text-lg--mobile)", "1"],
    },
    fontFamily: {
      // "font-primary-300": ["var(--primary-300)"],
      // "font-primary-400": ["var(--primary-400)"],
      // "primary-700": ["var(--primary-150)"],
    },
  },
  plugins: [],
};
export default config;
