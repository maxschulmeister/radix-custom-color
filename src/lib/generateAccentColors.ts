import Color from "colorjs.io";
import { generateContrastColor } from "./generateContrastColor";

export function generateAccentColors(accentScale: Color[], accentColor: Color) {
  const firstScaleColor = accentScale[0];
  const colorDifference = accentColor.deltaEOK(firstScaleColor) * 100;

  if (colorDifference < 25) {
    const accentColor9 = accentScale[8];
    const accentContrast = generateContrastColor(accentColor9);
    return [accentColor9, accentContrast];
  } else {
    const accentContrast = generateContrastColor(accentColor);
    return [accentColor, accentContrast];
  }
}
