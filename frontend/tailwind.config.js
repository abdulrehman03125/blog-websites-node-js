/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "node_modules/antd/dist/antd.css" // Ensure Tailwind scans Ant Design styles
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  