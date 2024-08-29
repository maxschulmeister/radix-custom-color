import { adjustLightness } from "@/lib/adjustLightness";
import {
  defaultLightnessAdjustmentCurve,
  grayScales,
  steps,
} from "@/lib/constants";
import Color from "colorjs.io";

export function interpolateColorScale(
  targetColor: Color,
  colorScales: Record<string, Color[]>,
  backgroundColor: Color
) {
  let colorDistances: Array<{ scale: string; distance: number; color: Color }> =
    [];

  // Calculate distances between target color and each color in the scales
  Object.entries(colorScales).forEach(([scaleName, scaleColors]) => {
    for (let color of scaleColors) {
      let distance = targetColor.deltaEOK(color);
      colorDistances.push({ scale: scaleName, distance, color });
    }
  });

  // Sort distances and get unique scales
  colorDistances.sort((a, b) => a.distance - b.distance);
  let uniqueScales = colorDistances.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.scale === item.scale)
  );

  // Handle gray scales separately
  if (
    !uniqueScales.every((item) => grayScales.includes(item.scale)) &&
    grayScales.includes(uniqueScales[0].scale)
  ) {
    while (grayScales.includes(uniqueScales[1].scale)) {
      uniqueScales.splice(1, 1);
    }
  }

  let nearestScale = uniqueScales[0];
  let secondNearestScale = uniqueScales[1];

  // Calculate interpolation factor
  let d1 = nearestScale.distance;
  let d2 = secondNearestScale.distance;
  let d3 = nearestScale.color.deltaEOK(secondNearestScale.color);
  let cos1 = (d1 ** 2 + d3 ** 2 - d2 ** 2) / (2 * d1 * d3);
  let cos2 = (d2 ** 2 + d3 ** 2 - d1 ** 2) / (2 * d2 * d3);
  let interpolationFactor =
    0.5 *
    Math.max(
      0,
      cos1 / Math.sin(Math.acos(cos1)) / (cos2 / Math.sin(Math.acos(cos2)))
    );

  // Interpolate between the two nearest scales
  let scale1 = colorScales[nearestScale.scale];
  let scale2 = colorScales[secondNearestScale.scale];
  let interpolatedScale = steps.map((step) =>
    new Color(Color.mix(scale1[step], scale2[step], interpolationFactor)).to(
      "oklch"
    )
  );

  // Adjust saturation
  let nearestInterpolatedColor = interpolatedScale
    .slice()
    .sort((a, b) => targetColor.deltaEOK(a) - targetColor.deltaEOK(b))[0];
  let saturationFactor =
    targetColor.coords[1] / nearestInterpolatedColor.coords[1];

  interpolatedScale.forEach((color) => {
    color.coords[1] = Math.min(
      1.5 * targetColor.coords[1],
      color.coords[1] * saturationFactor
    );
    color.coords[2] = targetColor.coords[2];
  });

  // Adjust lightness
  const lightnessAdjustmentCurve = [1, 0, 1, 0];
  if (interpolatedScale[0].coords[0] > 0.5) {
    let lightnessValues = interpolatedScale.map((color) => color.coords[0]);
    let adjustedLightness = adjustLightness(
      Math.max(0, Math.min(1, backgroundColor.coords[0])),
      [1, ...lightnessValues],
      lightnessAdjustmentCurve
    );
    adjustedLightness.shift();
    adjustedLightness.forEach((lightness, index) => {
      interpolatedScale[index].coords[0] = lightness;
    });
  } else {
    let lightnessAdjustmentCurve = [...defaultLightnessAdjustmentCurve];
    let baseLightness = interpolatedScale[0].coords[0];
    let lightnessRatio =
      Math.max(0, Math.min(1, backgroundColor.coords[0])) / baseLightness;

    if (lightnessRatio > 1) {
      for (let i = 0; i < lightnessAdjustmentCurve.length; i++) {
        let adjustment = 3 * (lightnessRatio - 1);
        lightnessAdjustmentCurve[i] =
          lightnessRatio > 1.5
            ? 0
            : Math.max(0, lightnessAdjustmentCurve[i] * (1 - adjustment));
      }
    }

    let lightnessValues = interpolatedScale.map((color) => color.coords[0]);
    adjustLightness(
      backgroundColor.coords[0],
      lightnessValues,
      lightnessAdjustmentCurve
    ).forEach((lightness, index) => {
      interpolatedScale[index].coords[0] = lightness;
    });
  }

  return interpolatedScale;
}
