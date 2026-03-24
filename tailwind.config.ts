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
        mystic: {
          50: "#f5f0ff",
          100: "#ede0ff",
          200: "#d9c0ff",
          300: "#c190ff",
          400: "#a855f7",
          500: "#8b2fc9",
          600: "#7218a0",
          700: "#5a1280",
          800: "#3d0d5c",
          900: "#200630",
          950: "#100318",
        },
        gold: {
          300: "#fde68a",
          400: "#fbbf24",
          500: "#c9a84c",
          600: "#a07832",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        display: ["Georgia", "serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "card-flip": "cardFlip 0.6s ease-in-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,168,76,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(201,168,76,0.7)" },
        },
        cardFlip: {
          "0%": { transform: "rotateY(90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
