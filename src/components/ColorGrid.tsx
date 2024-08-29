import { GeneratePaletteResult } from "@/lib/generateColorPalette";
import React, { useState } from "react";
import { ColorInfoDialog } from "./ColorInfoDialog";
interface ColorGridProps {
  title: string;
  colors: GeneratePaletteResult;
}

const ColorGrid: React.FC<ColorGridProps> = ({ title, colors }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );

  return (
    <section className="space-y-4">
      <h3 className="text-sm text-center capitalize">{title}</h3>
      <div className="grid grid-cols-12 gap-1">
        {colors.scale.map((color, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-sm cursor-pointer aspect-w-1 aspect-h-1"
            style={{
              backgroundColor: color,
            }}
            onClick={() => setSelectedColorIndex(index)}
          ></div>
        ))}
      </div>
      <ColorInfoDialog
        color={
          selectedColorIndex !== null
            ? {
                solidColor: colors.scale[selectedColorIndex],
                alphaColor: colors.scaleAlpha[selectedColorIndex],
                wideGamutColor: colors.scaleWideGamut[selectedColorIndex],
                wideGamutAlphaColor:
                  colors.scaleAlphaWideGamut[selectedColorIndex],
              }
            : null
        }
        index={selectedColorIndex}
        isOpen={selectedColorIndex !== null}
        onClose={() => setSelectedColorIndex(null)}
      />
    </section>
  );
};

export default ColorGrid;
