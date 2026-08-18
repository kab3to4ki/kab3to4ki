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
        brand: {
          50: "#eefbf5",
          100: "#d5f5e6",
          200: "#aeeaca",
          300: "#78d9a9",
          400: "#3fc186",
          500: "#1ba86a",
          600: "#118755",
          700: "#106c47",
          800: "#10553a",
          900: "#0e4531",
          950: "#03271b",
        },
        sand: {
          50: "#fdfaf3",
          100: "#f8f0dc",
          200: "#efdcaf",
          300: "#e5c281",
          400: "#d9a355",
          500: "#c68737",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
