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
        primary: "hsl(39, 100%, 47%)",
        error: "hsl(11, 80%, 60%)",
        white: "#ffff",
        black: "#000",
        secondary: "#FFBA19",
        brown: "#88361E",
        "brown-500": "hsl(13.2deg 50% 19.61%)",
        "gray-100": "#F9F8F4",
        "gray-200": "#9E9E9E",
        "gray-300": "#f5f5f5",
        yellow: "hsl(38, 94%, 49%);",
      },
    },
  },
  plugins: [],
};
export default config;
