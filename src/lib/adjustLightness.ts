import bezierEasing from "bezier-easing";

export function adjustLightness(
  targetLightness: number,
  lightnessValues: number[],
  curveParams: number[]
) {
  const curve = bezierEasing(
    curveParams[0],
    curveParams[1],
    curveParams[2],
    curveParams[3]
  );

  return lightnessValues.map((lightness, index, array) => {
    const totalSteps = array.length - 1;
    const progress = 1 - index / totalSteps;
    const adjustment = (array[0] - targetLightness) * curve(progress);
    return lightness - adjustment;
  });
}
