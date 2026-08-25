import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#0a0f0a", accent: "#4ade80" },
    },
  },
  plugins: [],
} satisfies Config;
