import Color from "colorjs.io";

function mix(
  color1: number[],
  color2: number[],
  maxValue: number,
  precision: number,
  alpha?: number
) {
  let [r1, g1, b1] = color1.map((c) => Math.round(c * maxValue));
  let [r2, g2, b2] = color2.map((c) => Math.round(c * maxValue));

  if (
    r1 === undefined ||
    g1 === undefined ||
    b1 === undefined ||
    r2 === undefined ||
    g2 === undefined ||
    b2 === undefined
  ) {
    throw new Error("Color is undefined");
  }

  let maxComponent = 0;
  if (r1 > r2) maxComponent = maxValue;
  else if (g1 > g2) maxComponent = maxValue;
  else if (b1 > b2) maxComponent = maxValue;

  let rRatio = (r1 - r2) / (maxComponent - r2);
  let gRatio = (g1 - g2) / (maxComponent - g2);
  let bRatio = (b1 - b2) / (maxComponent - b2);

  let isGray = [rRatio, gRatio, bRatio].every((ratio) => ratio === rRatio);

  if (!alpha && isGray) {
    let grayValue = maxComponent / maxValue;
    return [grayValue, grayValue, grayValue, rRatio];
  }

  let clamp = (value: number) =>
    isNaN(value) ? 0 : Math.min(maxValue, Math.max(0, value));

  let mixRatio =
    Math.min(
      precision,
      Math.max(
        0,
        Math.ceil((alpha ?? Math.max(rRatio, gRatio, bRatio)) * precision)
      )
    ) / precision;

  let r = clamp(-((r2 * (1 - mixRatio) - r1) / mixRatio));
  let g = clamp(-((g2 * (1 - mixRatio) - g1) / mixRatio));
  let b = clamp(-((b2 * (1 - mixRatio) - b1) / mixRatio));

  r = Math.ceil(r);
  g = Math.ceil(g);
  b = Math.ceil(b);

  let rMixed = mixComponent(r, mixRatio, r2);
  let gMixed = mixComponent(g, mixRatio, g2);
  let bMixed = mixComponent(b, mixRatio, b2);

  if (maxComponent === 0) {
    if (r1 <= r2 && r1 !== rMixed) r = r1 > rMixed ? r + 1 : r - 1;
    if (g1 <= g2 && g1 !== gMixed) g = g1 > gMixed ? g + 1 : g - 1;
    if (b1 <= b2 && b1 !== bMixed) b = b1 > bMixed ? b + 1 : b - 1;
  }

  if (maxComponent === maxValue) {
    if (r1 >= r2 && r1 !== rMixed) r = r1 > rMixed ? r + 1 : r - 1;
    if (g1 >= g2 && g1 !== gMixed) g = g1 > gMixed ? g + 1 : g - 1;
    if (b1 >= b2 && b1 !== bMixed) b = b1 > bMixed ? b + 1 : b - 1;
  }

  return [r / maxValue, g / maxValue, b / maxValue, mixRatio];
}

function mixComponent(
  component: number,
  mixRatio: number,
  baseComponent: number,
  round: boolean = true
) {
  return round
    ? Math.round(baseComponent * (1 - mixRatio)) +
        Math.round(component * mixRatio)
    : baseComponent * (1 - mixRatio) + component * mixRatio;
}

export function mixColors(
  color1: string,
  color2: string,
  alpha?: number
): string {
  const [r, g, b, a] = mix(
    new Color(color1).to("srgb").coords,
    new Color(color2).to("srgb").coords,
    255,
    255,
    alpha
  );
  return new Color("srgb", [r, g, b], a)
    .toString({ format: "hex" })
    .toUpperCase();
}

export function mixColorsWideGamut(
  color1: string,
  color2: string,
  alpha?: number
): string {
  const [r, g, b, a] = mix(
    new Color(color1).to("p3").coords,
    new Color(color2).to("p3").coords,
    255,
    1000,
    alpha
  );
  return new Color("p3", [r, g, b], a)
    .toString({ precision: 4 })
    .replace("color(p3 ", "color(display-p3 ");
}
