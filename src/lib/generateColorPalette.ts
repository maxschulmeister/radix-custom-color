import { adjustAccentColor9 } from "@/lib/adjustAccentColor9";
import { grayRadixColors, radixColors } from "@/lib/constants";
import { formatOklchColor } from "@/lib/formatOklchColor";
import { generateAccentColors } from "@/lib/generateAccentColors";
import { interpolateColorScale } from "@/lib/interpolateColorScale";
import { mixColors, mixColorsWideGamut } from "@/lib/mix";
import Color from "colorjs.io";

interface GenerateColorPaletteProps {
  appearance: "light" | "dark";
  background: string;
  gray: string;
  accent: string;
}

export interface GeneratePaletteResult {
  scale: string[];
  scaleAlpha: string[];
  scaleWideGamut: string[];
  scaleAlphaWideGamut: string[];
  contrast?: string;
  surface: string;
  surfaceWideGamut: string;
}

export function generateAccentPalette(
  accentColor: Color,
  backgroundColor: Color,
  appearance: "light" | "dark"
): GeneratePaletteResult {
  const accentScale = interpolateColorScale(
    accentColor,
    appearance === "light" ? radixColors.light : radixColors.dark,
    backgroundColor
  );

  const accentHex = accentColor
    .to("srgb")
    .toString({ format: "hex" })
    .toUpperCase();
  const backgroundHex = backgroundColor
    .to("srgb")
    .toString({ format: "hex" })
    .toUpperCase();

  if (accentHex === "#000" || accentHex === "#fff") {
    const grayScale = interpolateColorScale(
      accentColor,
      appearance === "light" ? grayRadixColors.light : grayRadixColors.dark,
      backgroundColor
    );
    accentScale.forEach(
      (_: any, i: number) => (accentScale[i] = grayScale[i].clone())
    );
  }

  const [accentColor9, accentContrast] = generateAccentColors(
    accentScale,
    accentColor
  );
  accentScale[8] = accentColor9;
  accentScale[9] = adjustAccentColor9(accentColor9, [accentScale]);

  // Adjust saturation for accent colors 10 and 11
  accentScale[10].coords[1] = Math.min(
    Math.max(accentScale[8].coords[1], accentScale[7].coords[1]),
    accentScale[10].coords[1]
  );
  accentScale[11].coords[1] = Math.min(
    Math.max(accentScale[8].coords[1], accentScale[7].coords[1]),
    accentScale[11].coords[1]
  );

  const accentScaleHex = accentScale.map((color: Color) =>
    color.to("srgb").toString({ format: "hex" }).toUpperCase()
  );
  const accentScaleWideGamut = accentScale.map((color: Color) =>
    formatOklchColor(color)
  );
  const accentScaleAlpha = accentScaleHex.map((color: string) =>
    mixColors(color, backgroundHex)
  );
  const accentScaleAlphaWideGamut = accentScaleHex.map((color: string) =>
    mixColorsWideGamut(color, backgroundHex)
  );

  const accentContrastHex = accentContrast
    .to("srgb")
    .toString({ format: "hex" })
    .toUpperCase();

  const accentSurface =
    appearance === "light"
      ? mixColors(accentScaleHex[1], backgroundHex, 0.8)
      : mixColors(accentScaleHex[1], backgroundHex, 0.5);

  const accentSurfaceWideGamut =
    appearance === "light"
      ? mixColorsWideGamut(accentScaleWideGamut[1], backgroundHex, 0.8)
      : mixColorsWideGamut(accentScaleWideGamut[1], backgroundHex, 0.5);

  return {
    scale: accentScaleHex,
    scaleAlpha: accentScaleAlpha,
    scaleWideGamut: accentScaleWideGamut,
    scaleAlphaWideGamut: accentScaleAlphaWideGamut,
    contrast: accentContrastHex,
    surface: accentSurface,
    surfaceWideGamut: accentSurfaceWideGamut,
  };
}

export function generateGrayPalette(
  grayColor: Color,
  backgroundColor: Color,
  appearance: "light" | "dark"
): GeneratePaletteResult {
  const grayScale = interpolateColorScale(
    grayColor,
    appearance === "light" ? grayRadixColors.light : grayRadixColors.dark,
    backgroundColor
  );

  const backgroundHex = backgroundColor
    .to("srgb")
    .toString({ format: "hex" })
    .toUpperCase();

  const grayScaleHex = grayScale.map((color: Color) =>
    color.to("srgb").toString({ format: "hex" }).toUpperCase()
  );
  const grayScaleWideGamut = grayScale.map((color: Color) =>
    formatOklchColor(color)
  );
  const grayScaleAlpha = grayScaleHex.map((color: string) =>
    mixColors(color, backgroundHex)
  );
  const grayScaleAlphaWideGamut = grayScaleHex.map((color: string) =>
    mixColorsWideGamut(color, backgroundHex)
  );

  const graySurface =
    appearance === "light" ? "#ffffffcc" : "rgba(0, 0, 0, 0.05)";
  const graySurfaceWideGamut =
    appearance === "light"
      ? "color(display-p3 1 1 1 / 80%)"
      : "color(display-p3 0 0 0 / 5%)";

  return {
    scale: grayScaleHex,
    scaleAlpha: grayScaleAlpha,
    scaleWideGamut: grayScaleWideGamut,
    scaleAlphaWideGamut: grayScaleAlphaWideGamut,
    surface: graySurface,
    surfaceWideGamut: graySurfaceWideGamut,
  };
}

// Main function to generate color palette
export function generateColorPalette({
  appearance,
  background,
  gray,
  accent,
}: GenerateColorPaletteProps) {
  const backgroundColor = new Color(background).to("oklch");
  const grayColor = new Color(gray).to("oklch");
  const accentColor = new Color(accent).to("oklch");

  const accentPalette = generateAccentPalette(
    accentColor,
    backgroundColor,
    appearance
  );
  const grayPalette = generateGrayPalette(
    grayColor,
    backgroundColor,
    appearance
  );

  return {
    accentPalette,
    grayPalette,
    background: backgroundColor
      .to("srgb")
      .toString({ format: "hex" })
      .toUpperCase(),
  };
}
