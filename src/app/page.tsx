"use client";
import ColorField from "@/components/ColorField";
import NewColorPaletteGenerator from "@/components/NewColorPaletteGenerator";
import { ArrowLeftIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [accentColor, setAccentColor] = useState("#00FFCC");
  const [grayColor, setGrayColor] = useState("#8B8D98");
  const [backgroundColor, setBackgroundColor] = useState(
    theme === "light" ? "#FFFFFF" : "#111111"
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const invertBackgroundColor = (color: string, newTheme: string) => {
    const lightBase = parseInt("FFFFFF", 16);
    const darkBase = parseInt("111111", 16);
    const currentColor = parseInt(color.replace("#", ""), 16);

    if (newTheme === "light") {
      const delta = lightBase - currentColor;
      return `#${(darkBase + delta).toString(16).padStart(6, "0")}`;
    } else {
      const delta = currentColor - darkBase;
      return `#${(lightBase - delta).toString(16).padStart(6, "0")}`;
    }
  };

  const toggleTheme = (newTheme: "light" | "dark") => {
    if (theme !== newTheme) {
      setBackgroundColor(
        invertBackgroundColor(backgroundColor, theme ?? "dark")
      );
    }
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <main
      className="container min-h-screen p-8"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="flex flex-col items-center mb-8">
        <a
          href="#"
          className="flex items-center mb-4 text-gray-11 hover:underline dark:text-grayDark-11"
        >
          <ArrowLeftIcon className="mr-2" />
          Radix Colors
        </a>
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-12 dark:text-grayDark-12">
          Generate a custom palette
        </h1>
        <div className="flex overflow-hidden border rounded-md border-gray-6 dark:border-grayDark-6">
          <button
            onClick={() => toggleTheme("light")}
            className={`px-3 py-2 flex items-center transition-colors ${
              theme === "light"
                ? "bg-gray-4 text-gray-12"
                : "dark:bg-grayDark-1 dark:text-grayDark-11 dark:hover:bg-grayDark-3 "
            }`}
          >
            <SunIcon className="w-4 h-4 mr-2" />
            Light
          </button>
          <button
            onClick={() => toggleTheme("dark")}
            className={`px-3 py-2 flex items-center transition-colors ${
              theme === "dark"
                ? "dark:bg-grayDark-4 dark:text-grayDark-12"
                : "bg-gray-1 text-gray-11 hover:bg-gray-3 "
            }`}
          >
            <MoonIcon className="w-4 h-4 mr-2" />
            Dark
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
        <ColorField
          label="Accent"
          value={accentColor}
          onChange={setAccentColor}
        />
        <ColorField label="Gray" value={grayColor} onChange={setGrayColor} />
        <ColorField
          label="Background"
          value={backgroundColor}
          onChange={setBackgroundColor}
        />
      </div>

      <NewColorPaletteGenerator
        appearance={theme as "light" | "dark"}
        accentColor={accentColor}
        grayColor={grayColor}
        backgroundColor={backgroundColor}
      />
    </main>
  );
}
