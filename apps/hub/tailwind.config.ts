import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#05080f", accent: "#a78bfa" },
    },
  },
  plugins: [],
};
export default config;
