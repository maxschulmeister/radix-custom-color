import Color from "colorjs.io";

export const categorizeColor = (color: string) => {
  let colorObject = new Color(color).to("hsl");
  return colorObject.coords[1] < 25
    ? "custom"
    : colorObject.coords[0] >= 0 && colorObject.coords[0] < 20
    ? "red"
    : colorObject.coords[0] >= 20 && colorObject.coords[0] < 40
    ? "orange"
    : colorObject.coords[0] >= 40 && colorObject.coords[0] < 65
    ? "yellow"
    : colorObject.coords[0] >= 65 && colorObject.coords[0] < 100
    ? "lime"
    : colorObject.coords[0] >= 100 && colorObject.coords[0] < 165
    ? "green"
    : colorObject.coords[0] >= 165 && colorObject.coords[0] < 190
    ? "teal"
    : colorObject.coords[0] >= 190 && colorObject.coords[0] < 240
    ? "blue"
    : colorObject.coords[0] >= 240 && colorObject.coords[0] < 270
    ? "violet"
    : colorObject.coords[0] >= 270 && colorObject.coords[0] < 320
    ? "purple"
    : colorObject.coords[0] >= 320 && colorObject.coords[0] < 340
    ? "pink"
    : "red";
};
