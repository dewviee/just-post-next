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
        brightBlue: "#00A9FF",
        skyBlue: "#89CFF3",
        paleBlue: "#A0E9FF",
        iceBlue: "#CDF5FD",
      },
    },
  },
  plugins: [],
};
export default config;
