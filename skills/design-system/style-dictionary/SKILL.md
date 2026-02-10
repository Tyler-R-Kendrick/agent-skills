---
name: style-dictionary
description: |
    Use when transforming design tokens into platform-specific outputs using Style Dictionary. Covers configuration, transforms, formats, DTCG support, and multi-platform builds.
    USE FOR: Style Dictionary configuration, token transforms, platform-specific token output (CSS, SCSS, iOS, Android, Compose), custom formats, DTCG-to-platform pipelines
    DO NOT USE FOR: authoring token files (use design-tokens), Figma variable management (use figma), component documentation (use storybook)
license: MIT
metadata:
  displayName: "Style Dictionary"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
---

# Style Dictionary

## Overview
Style Dictionary is the standard build system for transforming design tokens into platform-specific outputs — CSS custom properties, SCSS variables, iOS/Android constants, Kotlin Compose themes, and more. Version 4 adds native W3C DTCG support, ESM configuration, async transforms, and browser compatibility.

## How It Works
```
Token source files (.tokens.json)
        │
        ▼
  ┌──────────┐
  │  Parse    │  Deep-merge all source files
  └────┬─────┘
       ▼
  ┌──────────┐
  │ Transform │  Name, value, and attribute transforms per platform
  └────┬─────┘
       ▼
  ┌──────────┐
  │  Format   │  Serialize into platform file format
  └────┬─────┘
       ▼
  Platform outputs (CSS, SCSS, JSON, Swift, Kotlin, etc.)
```

## Configuration
```js
// style-dictionary.config.mjs
import StyleDictionary from "style-dictionary";

const sd = new StyleDictionary({
  source: ["tokens/**/*.tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
        },
      ],
    },
    ios: {
      transformGroup: "ios-swift",
      buildPath: "build/ios/",
      files: [
        {
          destination: "DesignTokens.swift",
          format: "ios-swift/class.swift",
          className: "DesignTokens",
        },
      ],
    },
    android: {
      transformGroup: "android",
      buildPath: "build/android/",
      files: [
        {
          destination: "tokens.xml",
          format: "android/resources",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
```

## Build Commands
```bash
# Build all platforms
npx style-dictionary build --config style-dictionary.config.mjs

# Build a single platform
npx style-dictionary build --config style-dictionary.config.mjs --platform css
```

## Transforms
Transforms modify tokens for a specific platform. Three types:

| Type | What It Changes | Example |
|------|----------------|---------|
| `attribute` | Adds metadata to `token.attributes` | `attribute/cti` — adds category/type/item |
| `name` | Changes the token name | `name/kebab` — `colorPrimary` → `color-primary` |
| `value` | Changes the token value | `color/css` — `#3b82f6` → `rgb(59, 130, 246)` |

### Transform Groups
Built-in groups bundle common transforms:

| Group | Platforms | Transforms Applied |
|-------|----------|-------------------|
| `css` | Web (CSS) | `name/kebab`, `color/css`, `size/px` |
| `scss` | Web (SCSS) | `name/kebab`, `color/css`, `size/px` |
| `less` | Web (Less) | `name/camel`, `color/hex`, `size/px` |
| `js` | JavaScript | `name/camel`, `color/hex` |
| `ios-swift` | iOS | `name/camel`, `color/UIColorSwift` |
| `android` | Android | `name/snake`, `color/hex8android`, `size/dp` |
| `compose` | Jetpack Compose | `name/camel`, `color/composeColor` |

## Formats
Formats serialize transformed tokens into output files:

| Format | Output |
|--------|--------|
| `css/variables` | `:root { --color-primary: #3b82f6; }` |
| `scss/variables` | `$color-primary: #3b82f6;` |
| `less/variables` | `@color-primary: #3b82f6;` |
| `javascript/es6` | `export const ColorPrimary = "#3b82f6";` |
| `typescript/es6-declarations` | Type declarations for JS tokens |
| `json/flat` | `{ "color-primary": "#3b82f6" }` |
| `ios-swift/class.swift` | Swift struct with static properties |
| `android/resources` | Android XML `<resources>` |

## Custom Transform
```js
import StyleDictionary from "style-dictionary";

StyleDictionary.registerTransform({
  name: "size/pxToRem",
  type: "value",
  filter: (token) => token.$type === "dimension",
  transform: (token) => {
    const val = parseFloat(token.value);
    return `${val / 16}rem`;
  },
});
```

## Custom Format
```js
StyleDictionary.registerFormat({
  name: "css/tailwind",
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens
      .map((t) => `  "${t.name}": "${t.value}"`)
      .join(",\n");
    return `module.exports = {\n${tokens}\n};\n`;
  },
});
```

## Filtering Tokens
Filter which tokens appear in a specific output file:
```js
{
  destination: "colors.css",
  format: "css/variables",
  filter: (token) => token.$type === "color",
}
```

## DTCG Support (v4)
Style Dictionary v4 natively reads W3C DTCG tokens (`$value`, `$type`, `$description`):
```json
{
  "color": {
    "$type": "color",
    "primary": { "$value": "#3b82f6" },
    "secondary": { "$value": "{color.primary}" }
  }
}
```

SD resolves `$type` inheritance from parent groups and resolves `{alias}` references automatically.

## Token References in Output
```js
// Preserve references in CSS output
{
  destination: "variables.css",
  format: "css/variables",
  options: {
    outputReferences: true,  // --color-secondary: var(--color-primary)
  },
}
```

## Multi-Theme Builds
Build separate files per theme by pointing to different source sets:
```js
const themes = ["light", "dark"];

const configs = themes.map((theme) => ({
  source: [`tokens/global/**/*.tokens.json`, `tokens/themes/${theme}/**/*.tokens.json`],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: `build/css/${theme}/`,
      files: [{ destination: "variables.css", format: "css/variables" }],
    },
  },
}));

for (const config of configs) {
  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
}
```

## Best Practices
- Use DTCG-format tokens (`$value`, `$type`) as input — Style Dictionary v4 supports them natively.
- Use `outputReferences: true` in CSS/SCSS to preserve the alias chain as `var()` references — this enables runtime theming.
- Use `filter` on files to split outputs by token type (colors, typography, spacing) for tree-shaking.
- Register custom transforms for project-specific needs (px → rem, color space conversions).
- Run Style Dictionary in CI to ensure token → platform output is always in sync.
- Use the CTI naming convention (`color.brand.primary`) for predictable transform behavior.
- Pin to Style Dictionary v4+ for ESM, async transforms, and DTCG support.
