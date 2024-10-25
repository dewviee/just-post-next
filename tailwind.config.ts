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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#00A9FF",
        primaryActive: "#1D9BF0",
        skyBlue: "#89CFF3",
        paleBlue: "#A0E9FF",
        iceBlue: "#CDF5FD",
      },
    },
  },
  plugins: [],
};
export default config;
