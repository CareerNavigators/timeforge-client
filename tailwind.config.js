/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        d: "#161927",
        d1: "#0f111a",
        d2: "#2b314d",
        dt: "#576ee0",
        dw: "#f5f5f5f5",
        dg: "#bfc3c2",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        helvitica: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
