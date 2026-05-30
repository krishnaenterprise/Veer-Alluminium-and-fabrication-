import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        // Brand palette — deep graphite + aluminium silver + gold accent
        brand: {
          DEFAULT: "#0B1F3A", // deep navy graphite
          50: "#eef2f7",
          100: "#d6e0ec",
          900: "#0B1F3A",
          950: "#06121f",
        },
        gold: {
          DEFAULT: "#C8A04F",
          light: "#E4C77E",
          dark: "#9A7A33",
        },
        steel: {
          DEFAULT: "#8A97A8",
          light: "#C7CED7",
          dark: "#5A6678",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      backgroundImage: {
        "glass-sheen":
          "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0) 60%)",
        "gold-gradient":
          "linear-gradient(135deg, #E4C77E 0%, #C8A04F 50%, #9A7A33 100%)",
      },
      boxShadow: {
        luxe: "0 30px 60px -20px rgba(11,31,58,0.45)",
        "luxe-gold": "0 20px 50px -15px rgba(200,160,79,0.45)",
        glass: "0 8px 32px rgba(11,31,58,0.18)",
      },
      keyframes: {
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 18s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
