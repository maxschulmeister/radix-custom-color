# radix-custom-color

A app that generates custom color palettes following the Radix UI color scheme.
It is a function copy of [radix-ui.com/colors/custom](https://www.radix-ui.com/colors/custom).
So head over there, if you are looking for the original implementation.

## Why?

– January 2024, I was looking for a way to generate a accessible color palette following the Radix UI color scheme, from a single color. I failed, being overwhelmed by color spaces, contrast algorithms and so on.
– June 2024, I suddenly had the idea to take a color, find the closest Radix UI color, calculate the delta and interpolate it to the rest of the Radix palette in order to generate a custom color palette. It worked! And I noticed the Radix-UI team had just launched [radix-ui.com/colors/custom](https://www.radix-ui.com/colors/custom) in March.
– August 2024, Since my results differed slightly from the original app, I felt the urge to find out what the Radix-UI team did differently, so I reverse engineered their app and did a 1:1 copy. It took me 2 full days, but it was worth it.
Cudos to the Radix-UI team for creating such a great app! 🙌

## How to use

```
npm install
npm run dev
```

## How it works

Basically there are 3 Inputs:
– Accent Color
– Gray Color
– Background Color

The App generates a accent and gray color palette based on these colors.
The background color is used to generate the alpha versions of the colors.
Every palette has srgb and p3 color values.

## Credits

– [Radix-UI](https://www.radix-ui.com/) the original implementation and awesome default color palettes
– [Color.js](https://colorjs.io/) for the color space conversions
– [nightspite](https://github.com/nightspite) thanks for the color picker component
