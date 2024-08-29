import { generateAccentPalette } from "@/lib/generateColorPalette";
import Color from "colorjs.io";

describe("generateAccentPalette", () => {
  it("should generate the correct accent palette for light appearance", () => {
    const accentColor = new Color("#00FFCC").to("oklch");
    const backgroundColor = new Color("#FFFFFF").to("oklch");
    const appearance = "light";

    const expectedAccentPalette = {
      accentScale: [
        "#F7FFFC",
        "#EEFDF8",
        "#D0FEED",
        "#B0FBE2",
        "#90F5D5",
        "#6CEAC5",
        "#2CDBB1",
        "#00C598",
        "#00F8C5",
        "#00EDBB",
        "#007C5D",
        "#004834",
      ],
      accentScaleAlpha: [
        "#00FFA008",
        "#00E19611",
        "#00FA9E2F",
        "#00F3A24F",
        "#00E99F6F",
        "#00DB9B93",
        "#00D4A1D3",
        "#00C598",
        "#00F8C5",
        "#00EDBB",
        "#007C5D",
        "#004834",
      ],
      accentScaleWideGamut: [
        "oklch(99.3% 0.0092 171.3)",
        "oklch(98.2% 0.0175 171.3)",
        "oklch(96% 0.0521 171.3)",
        "oklch(93.3% 0.0818 171.3)",
        "oklch(89.9% 0.106 171.3)",
        "oklch(85.6% 0.1252 171.3)",
        "oklch(79.8% 0.1478 171.3)",
        "oklch(72.2% 0.1856 171.3)",
        "oklch(87% 0.1739 171.3)",
        "oklch(83.9% 0.1737 171.3)",
        "oklch(51.2% 0.1654 171.3)",
        "oklch(35% 0.088 171.3)",
      ],
      accentScaleAlphaWideGamut: [
        "color(display-p3 0.0235 1 0.5804 / 0.028)",
        "color(display-p3 0.0039 0.8588 0.502 / 0.055)",
        "color(display-p3 0.0078 0.949 0.5569 / 0.15)",
        "color(display-p3 0.0039 0.9059 0.5608 / 0.248)",
        "color(display-p3 0.0039 0.851 0.5412 / 0.342)",
        "color(display-p3 0.0039 0.7882 0.5059 / 0.444)",
        "color(display-p3 0 0.7373 0.4863 / 0.581)",
        "color(display-p3 0 0.6353 0.4 / 0.651)",
        "color(display-p3 0 0.9255 0.6157 / 0.557)",
        "color(display-p3 0 0.851 0.5569 / 0.577)",
        "color(display-p3 0 0.3412 0.2078 / 0.793)",
        "color(display-p3 0 0.1882 0.1098 / 0.891)",
      ],
    };

    const result = generateAccentPalette(
      accentColor,
      backgroundColor,
      appearance
    );

    console.log("First color of accentScale:", result.accentScale[0]);

    expect(result.accentScale).toEqual(expectedAccentPalette.accentScale);
    expect(result.accentScaleAlpha).toEqual(
      expectedAccentPalette.accentScaleAlpha
    );
    expect(result.accentScaleWideGamut).toEqual(
      expectedAccentPalette.accentScaleWideGamut
    );
    expect(result.accentScaleAlphaWideGamut).toEqual(
      expectedAccentPalette.accentScaleAlphaWideGamut
    );
  });
});
