"use client";

import { categorizeColor } from "@/lib/categorizeColor";
import { generateColorPalette } from "@/lib/generateColorPalette";
import { useEffect, useState } from "react";
import ColorGrid from "./ColorGrid";

const NewColorPaletteGenerator = ({
  appearance,
  accentColor,
  grayColor,
  backgroundColor,
}: {
  appearance: "light" | "dark";
  accentColor: string;
  grayColor: string;
  backgroundColor: string;
}) => {
  const [generatedPalette, setGeneratedPalette] = useState<ReturnType<
    typeof generateColorPalette
  > | null>(null);

  useEffect(() => {
    const palette = generateColorPalette({
      appearance,
      background: backgroundColor,
      gray: grayColor,
      accent: accentColor,
    });
    setGeneratedPalette(palette);
  }, [appearance, backgroundColor, grayColor, accentColor]);

  return (
    <section>
      {/* <h2 className="text-2xl font-bold text-center">
        Color Palette Creator (662)
      </h2> */}
      <div className="space-y-8">
        {generatedPalette && (
          <>
            <ColorGrid
              title={`${categorizeColor(accentColor)}`}
              colors={generatedPalette.accentPalette}
            />
            <ColorGrid title={`Gray`} colors={generatedPalette.grayPalette} />
          </>
        )}
      </div>
    </section>
  );
};

export default NewColorPaletteGenerator;
