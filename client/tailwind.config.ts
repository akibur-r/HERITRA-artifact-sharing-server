import { type Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables toggling via class (e.g., 'dark')
  content: ["./index.html", "./src/**/*.{ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        highlight: "var(--color-highlight)",
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
      },
    },
  },
};

export default config;
