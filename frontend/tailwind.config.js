/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'trackify-blue': '#3B82F6', // Replace with your desired blue color code
        },
      },
    },
    plugins: [],
  }