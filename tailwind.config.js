/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "rgb(133, 136, 246)",
        darktransparent: "#61616195",
      },
    },
  },
  plugins: [],
}
