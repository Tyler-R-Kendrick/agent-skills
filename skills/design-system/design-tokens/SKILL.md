---
name: design-tokens
description: |
    Use when authoring, structuring, or consuming design tokens in the W3C Design Tokens Community Group (DTCG) format. Covers token types, groups, aliases, composite tokens, and file conventions.
    USE FOR: W3C DTCG token files, token types (color, dimension, typography), token aliases and references, token groups, composite tokens, .tokens.json files
    DO NOT USE FOR: transforming tokens into platform code (use style-dictionary), Figma variable management (use figma), component styling (use the relevant framework skill)
license: MIT
metadata:
  displayName: "Design Tokens (W3C DTCG)"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "W3C Design Tokens Community Group"
    url: "https://www.w3.org/community/design-tokens/"
  - title: "Design Tokens Specification"
    url: "https://www.designtokens.org/"
  - title: "Design Tokens Community Group — GitHub"
    url: "https://github.com/design-tokens/community-group"
---

# Design Tokens — W3C DTCG Format

## Overview
The W3C Design Tokens Community Group (DTCG) specification defines a vendor-neutral JSON format for exchanging design tokens across tools and platforms. The first stable version (2025.10) provides a production-ready standard adopted by Style Dictionary, Tokens Studio, Figma, and others.

## File Conventions
- **MIME type:** `application/design-tokens+json` (or `application/json`)
- **Extensions:** `.tokens` or `.tokens.json`
- **Encoding:** UTF-8 JSON

## Token Structure
Every token is a JSON object with a `$value` property. The key becomes the token name:
```json
{
  "color-primary": {
    "$value": "#3b82f6",
    "$type": "color",
    "$description": "Primary brand color"
  }
}
```

### Token Properties
| Property | Required | Description |
|----------|----------|-------------|
| `$value` | Yes | The token's value |
| `$type` | No | Token type (inherited from parent group if omitted) |
| `$description` | No | Human-readable purpose |
| `$deprecated` | No | `true` or a string explaining why |
| `$extensions` | No | Vendor metadata (reverse domain notation) |

## Token Types

### Primitive Types
```json
{
  "brand-blue": {
    "$value": "#3b82f6",
    "$type": "color"
  },
  "space-md": {
    "$value": { "value": 16, "unit": "px" },
    "$type": "dimension"
  },
  "font-sans": {
    "$value": ["Inter", "system-ui", "sans-serif"],
    "$type": "fontFamily"
  },
  "weight-bold": {
    "$value": 700,
    "$type": "fontWeight"
  },
  "duration-fast": {
    "$value": { "value": 150, "unit": "ms" },
    "$type": "duration"
  },
  "ease-out": {
    "$value": [0, 0, 0.2, 1],
    "$type": "cubicBezier"
  },
  "line-height-normal": {
    "$value": 1.5,
    "$type": "number"
  }
}
```

### Composite Types
```json
{
  "shadow-md": {
    "$value": {
      "color": "#00000026",
      "offsetX": { "value": 0, "unit": "px" },
      "offsetY": { "value": 4, "unit": "px" },
      "blur": { "value": 8, "unit": "px" },
      "spread": { "value": 0, "unit": "px" }
    },
    "$type": "shadow"
  },
  "border-default": {
    "$value": {
      "color": "#d1d5db",
      "width": { "value": 1, "unit": "px" },
      "style": "solid"
    },
    "$type": "border"
  },
  "heading-lg": {
    "$value": {
      "fontFamily": "{font-sans}",
      "fontSize": { "value": 24, "unit": "px" },
      "fontWeight": 700,
      "lineHeight": 1.25
    },
    "$type": "typography"
  },
  "transition-default": {
    "$value": {
      "duration": { "value": 200, "unit": "ms" },
      "delay": { "value": 0, "unit": "ms" },
      "timingFunction": [0.4, 0, 0.2, 1]
    },
    "$type": "transition"
  },
  "gradient-brand": {
    "$value": [
      { "color": "#3b82f6", "position": 0 },
      { "color": "#8b5cf6", "position": 1 }
    ],
    "$type": "gradient"
  }
}
```

## Groups
Groups organize tokens hierarchically. A group is any object without a `$value`. Groups can set `$type` for all children:
```json
{
  "color": {
    "$type": "color",
    "$description": "All color tokens",
    "brand": {
      "primary": { "$value": "#3b82f6" },
      "secondary": { "$value": "#8b5cf6" }
    },
    "neutral": {
      "100": { "$value": "#f3f4f6" },
      "900": { "$value": "#111827" }
    }
  }
}
```

Children inherit `$type` from their nearest ancestor group, so individual tokens in the `color` group above don't need to redeclare `"$type": "color"`.

## Aliases / References
Tokens can reference other tokens using curly brace syntax — the core mechanism for semantic tokens:
```json
{
  "blue-500": {
    "$value": "#3b82f6",
    "$type": "color"
  },
  "color-primary": {
    "$value": "{blue-500}",
    "$type": "color"
  },
  "button-bg": {
    "$value": "{color-primary}",
    "$type": "color"
  }
}
```

References chain: `button-bg` → `color-primary` → `blue-500` → `#3b82f6`. Circular references are invalid.

### JSON Pointer References
For accessing nested properties within composite tokens:
```json
{
  "heading-lg-size": {
    "$value": { "$ref": "#/heading-lg/$value/fontSize" },
    "$type": "dimension"
  }
}
```

## Group Inheritance with `$extends`
Groups can inherit from other groups:
```json
{
  "theme-light": {
    "surface": { "$value": "#ffffff", "$type": "color" },
    "on-surface": { "$value": "#111827", "$type": "color" }
  },
  "theme-dark": {
    "$extends": "#/theme-light",
    "surface": { "$value": "#111827" },
    "on-surface": { "$value": "#f9fafb" }
  }
}
```

## Three-Tier Architecture
```json
// global/colors.tokens.json — raw palette
{
  "blue": {
    "$type": "color",
    "500": { "$value": "#3b82f6" },
    "600": { "$value": "#2563eb" }
  }
}

// semantic/theme-light.tokens.json — intent-based
{
  "color": {
    "$type": "color",
    "primary": { "$value": "{blue.500}" },
    "primary-hover": { "$value": "{blue.600}" }
  }
}

// component/button.tokens.json — component-scoped
{
  "button": {
    "bg": { "$value": "{color.primary}", "$type": "color" },
    "bg-hover": { "$value": "{color.primary-hover}", "$type": "color" }
  }
}
```

## Naming Rules
- Names are **case-sensitive**
- Cannot start with `$`
- Cannot contain `{`, `}`, or `.`
- The `.` character is used as a path separator in references

## Best Practices
- Use the W3C DTCG format (`.tokens.json` with `$value` / `$type`) for vendor neutrality across tools.
- Organize tokens into global → semantic → component tiers so themes only override the semantic layer.
- Use aliases extensively — raw values should only appear in the global tier.
- Set `$type` on groups rather than individual tokens to reduce repetition.
- Add `$description` to non-obvious tokens so designers and developers share the same understanding.
- Use `$deprecated` with a migration message before removing tokens to give consumers time to update.
- Validate token files against the DTCG spec before committing — Style Dictionary v4 supports DTCG natively.
