import * as radixColors from "@radix-ui/colors";

function getColors(name: string, newName?: string) {
  let colors = radixColors[name as keyof typeof radixColors];
  if (!colors) return {};
  const newColors: Record<string, string> = {};
  for (const key of Object.keys(colors)) {
    const number = key.replace(/[a-zA-Z]+/, "");
    newColors[(newName || name) + "-" + number] =
      colors[key as keyof typeof colors];
  }
  return newColors;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        ...getColors("gray"),
        ...getColors("grayDark"),
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
