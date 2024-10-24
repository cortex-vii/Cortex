/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#181840", // Cor que você definiu
        secondary: "#181840",
        grey: "#72757a",
        lightGrey: "#bfbfbf",
        white: "#ffffff",
        error: "#f91d1d",
        danger: "#f91d1d",
        success: "#78ff5d",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#181840", // A cor personalizada para o botão primary
          secondary: "#181840",
          accent: "#72757a",
          neutral: "#bfbfbf",
          "base-100": "#ffffff",
          white: "#ffffff",
          error: "#f91d1d",
          success: "#78ff5d",
        },
      },
    ],
  },
};
