import Color from "colorjs.io";

export function generateContrastColor(color: Color) {
  let white = new Color("oklch", [1, 0, 0]);

  if (Math.abs(white.contrastAPCA(color)) < 40) {
    let [lightness, chroma, hue] = color.coords;
    return new Color("oklch", [0.25, Math.max(0.08 * chroma, 0.04), hue]);
  }

  return white;
}
