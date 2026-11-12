import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "warm-ivory": "#FAF9F5",
        "pure-white": "#FFFFFF",
        "deep-forest": "#264A3B",
        "deep-forest-hover": "#1E3B2F",
        "muted-sage": "#829887",
        "soft-sage": "#EAF0E9",
        "warm-charcoal": "#252923",
        "secondary-text": "#74786F",
        "muted-sand": "#F0EDE5",
        "sand-border": "#E9E7DF",
        "subtle-gold": "#B89B67",
      },
      fontFamily: {
        heading: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        card: "16px",
        panel: "20px",
        pill: "12px",
      },
      boxShadow: {
        editorial: "0 12px 32px -12px rgba(37, 41, 35, 0.08), 0 2px 6px -1px rgba(37, 41, 35, 0.04)",
        "editorial-hover": "0 20px 44px -14px rgba(37, 41, 35, 0.12), 0 4px 12px -2px rgba(37, 41, 35, 0.05)",
        modal: "0 28px 64px -16px rgba(24, 28, 24, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;

