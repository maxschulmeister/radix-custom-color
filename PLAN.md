# Plan: a color framework that replaces Radix Colors

Status: agreed in the design session. Not started.

## Goal

One starting point to decide color for any project. A config goes in, a full set of colors comes out. A library serves agents. A web app serves humans.

## Decisions

| # | Topic | Decision |
|---|---|---|
| 1 | Scope | Engine, benchmark, web app and exports in the first version |
| 2 | Repository | This repository, new branch, clean slate. Rename when the product is ready |
| 3 | Stack | pnpm workspace. `packages/engine`: pure TypeScript, Color.js only. `apps/web`: Vite, React, TanStack Router, client only. Vitest. Tailwind v4 and shadcn |
| 4 | Category | A named range on the fitted lightness ladder, with a main point and optional contrast limits. Presets: the five Radix categories. Users can define their own |
| 5 | Conflicts | The input color stays fixed by default, with a toggle for each palette to let the engine adjust it. All other steps adapt. Each deviation is reported as a warning with a one-step fix. A strict mode turns failed limits into errors |
| 6 | Palette color | Three properties (hue, chroma, lightness of the solid step). Three rules: Fix, Relate, Spread. Neutral, semantic and chart colors are presets of these rules, not engine features |
| 7 | Perception | Coordinates are for calculation. Perception models are for decisions. Color space, difference formula and contrast model are exchangeable parts, selected by measurement |
| 8 | Contrast | WCAG 2 and APCA are always calculated. Default limits use WCAG 2. APCA limits are an option |
| 9 | Base | The reference data is a package behind an interface. The first version ships the Radix base only. Manual override of single steps is in the first version |

## Core model

- **Base:** reference scales, fitted into four parts: a shared lightness ladder, a free solid step, a chroma curve for each hue, a hue drift for each hue.
- **Shape:** a list of categories with a count for each, for example `{ background: 2, component: 3, border: 3, solid: 2, text: 2 }`. A count of 1 gives the main point of the category. A higher count spreads the steps across its range.
- **Palette:** a name, a shape, and a rule for each of the three properties.
  - **Fix:** a given value.
  - **Relate:** follows another palette, with an offset or a factor.
  - **Spread:** free inside a range. The engine places it as far as possible from the other palettes, measured as perceived difference, with an option for color vision deficiency.
- **Context:** a background for each mode (light, dark), and a gamut (sRGB, P3).
- **Order of calculation:** Fix, then Relate, then all Spread palettes together. The result is repeatable.
- **Result:** the colors, the alpha variants, and the diagnostics.

```ts
definePalette({
  contexts: { light: "#fff", dark: "#111" },
  shape: radix12,
  palettes: {
    brand:    { hue: fix(264), chroma: fix(0.19) },
    neutral:  { hue: relate("brand"), chroma: fix(0.01) },
    negative: { hue: spread({ range: [0, 50] }), chroma: relate("brand") },
    series:   { hue: spread({ count: 10 }), shape: { solid: 1, text: 1 } },
  },
})
```

## Scope of the first version

| Area | In | After |
|---|---|---|
| Engine | Shapes with preset and custom categories. Fix, Relate, Spread. Contrast limits, diagnostics, suggested fixes. Toggle to keep or adjust the input. Manual override of single steps | Bring your own base. More bases |
| Modes | Light and dark. sRGB and P3. Alpha variants of each step | |
| Exports | CSS variables, Tailwind v4 theme, shadcn theme, config as JSON | Design tokens format, Figma variables |
| Agents | Library function, config schema, minimal command-line tool | Publication on npm, HTTP endpoint |
| Web app | Config editor, live preview in interface examples, warnings with one-click fixes, config in the URL | Accounts, saved palettes, preview images for links |

## Phases

Each phase uses test-driven development. Each phase ends with its checks green.

### Phase 0: setup

- Make a new branch from a clean slate. Set up the pnpm workspace, the two packages and Vitest.
- Check: `pnpm test` and `pnpm typecheck` run with zero tests and no errors.

### Phase 1: benchmark and baseline

- Write the leave-one-out test: remove one official Radix scale from the reference data, generate it from its step 9, measure the perceived difference to the official scale. Do this for all 23 color scales and the 6 gray scales, in light and dark.
- Add the Radix generator as the baseline. Use the original source from `radix-ui/website` (license to check first), because the current port differs from it in dark mode.
- Optional competitors: Harmonizer, Leonardo, Tailwind Ink.
- Check: the benchmark prints one score for each generator and each mode.

### Phase 2: the fit (decision point)

- Fit the four parts from the Radix scales as functions of hue.
- Test which color space makes the scales most regular. Use the best one as the default.
- Fit the Tailwind palette also, to prove that the base interface is general. Do not ship it.
- Check: the fit scores better than the Radix generator in the benchmark, in light and dark. Set the threshold for "done" from this first result.
- **If the check fails: stop and decide again before the work continues.**

### Phase 3: shapes and contexts

- Categories as ranges on the ladder. Sampling for any count. The preset shape `radix-12`.
- Light and dark against a given background. sRGB and P3 with gamut mapping. Alpha variants.
- Check: `radix-12` with step 9 of a Radix scale gives that scale back within the threshold.

### Phase 4: palette rules

- Fix, Relate, Spread on hue, chroma and solid lightness.
- Perceived difference with an option for color vision deficiency. A report when the minimum distance is too small.
- Presets: neutral (pure, tinted, harmonic), semantics (classic, without red and green), categorical sets.
- Check: tests for each rule and each preset. A changed parent changes its related palettes.

### Phase 5: limits and diagnostics

- Contrast limits on categories, with WCAG 2 and APCA behind one interface.
- Corrections in a fixed priority: contrast limit, category order, nearness to the ladder.
- Diagnostics with a suggested fix for each. Keep-or-adjust toggle. Strict mode. Manual overrides that stay when other inputs change.
- Check: a test proves that each declared pair passes or shows in the diagnostics, in both modes and both gamuts.

### Phase 6: config and exports

- JSON config with a schema, validated at the entry point.
- Exports: CSS variables, Tailwind v4, shadcn. A minimal command-line tool.
- Check: snapshot tests for each export. A config that is exported and loaded again gives the same result.

### Phase 7: web app

- Editor for the config, with the ladder as a control for categories.
- Live preview in real interface examples, in light and dark.
- Warnings with one-click fixes. The config in the URL.
- Check: the app builds its own theme from the engine output. Manual test of the main flows.

### Phase 8: real use

- Make the colors for one real project with the web app.
- Let one agent make a palette with the library, without help.

## Definition of done

1. The new engine is nearer to the official Radix scales than the Radix generator in the leave-one-out benchmark, in light and dark.
2. `radix-12` with step 9 of a Radix scale gives that scale back within the threshold.
3. Each declared contrast pair passes or shows in the diagnostics. A test proves it.
4. The owner uses it on one real project, and one agent uses the library without help.

## Risks

| Risk | Effect | Answer |
|---|---|---|
| The fit does not beat the Radix generator | The central idea fails | Phase 2 is a decision point before the web app |
| 23 hues are few data points | Poor results between far neighbor hues | The benchmark shows the weak hue ranges |
| Light solid colors (sky, mint, lime, yellow, amber) behave differently | One model does not fit all hues | They can get their own rule. Measure first |
| No model matches human vision fully | Results that pass the numbers but look wrong | Real previews in context. Manual override |
| The APCA license restricts some commercial use | A risk for commercial users of the library | APCA stays an optional part |
| More than about 8 distinct colors are hard to get from hue only | Chart sets with pairs that look the same | Spread also varies lightness and chroma, and reports the minimum distance |

## Open items

- The name of the product.
- The license of the original Radix generator source, for use as the benchmark baseline.
- The threshold for "done", set after the first benchmark run.
- The analysis of the gray scales. Only the 23 color scales were measured until now.

## Facts from the design session

- The current port matches the original Radix generator in light mode (0 of 276 steps differ) and differs in dark mode (182 of 276 steps). The cause is not known.
- The original Radix generator does not reproduce the official scales (5 to 12 of 12 steps differ for each scale). The official scales are hand-tuned.
- In the Radix light scales, the lightness spread across hues is 0.001 to 0.022 for ten of the 12 steps, and 0.115 for steps 9 and 10. Tailwind 3.4 has 0.007 to 0.058. Tailwind v4 was not measured.
- The Radix hue drift along a scale is up to 34° (orange). The Radix generator removes it.
- Nearest existing tools: Harmonizer (Evil Martians), Adobe Leonardo, Material Color Utilities. None was found that joins role pairs, a fitted reference base, palette rules and exports.
