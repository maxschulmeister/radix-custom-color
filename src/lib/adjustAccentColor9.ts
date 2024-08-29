import Color from "colorjs.io";

export function adjustAccentColor9(color: Color, scales: Color[][]) {
  let [lightness, chroma, hue] = color.coords;
  let newChroma = lightness > 0.4 && !isNaN(hue) ? 0.93 * chroma + 0 : chroma;

  let adjustedColor = new Color("oklch", [
    lightness > 0.4
      ? lightness - 0.03 / (lightness + 0.1)
      : lightness + 0.03 / (lightness + 0.1),
    newChroma,
    hue,
  ]);

  let closestColor = adjustedColor;
  let minDistance = Infinity;

  scales.forEach((scale) => {
    for (let scaleColor of scale) {
      let distance = adjustedColor.deltaEOK(scaleColor);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = scaleColor;
      }
    }
  });

  adjustedColor.coords[1] = closestColor.coords[1];
  adjustedColor.coords[2] = closestColor.coords[2];

  return adjustedColor;
}
