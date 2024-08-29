import Color from "colorjs.io";

export function formatOklchColor(color: Color) {
  // Convert the lightness value to a percentage and round to 1 decimal place
  let lightnessPercentage = +(100 * color.coords[0]).toFixed(1);

  // Convert the color to OKLCH format with 4 decimal places precision
  let oklchString = color.to("oklch").toString({ precision: 4 });

  // Replace the lightness value in the string with the percentage
  return oklchString.replace(/(\S+)(.+)/, `oklch(${lightnessPercentage}%$2`);
}
