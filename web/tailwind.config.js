/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        heroLeaves: "url('/src/assets/leaves.jpg')",
      },
    },
  },
  plugins: [],
};
