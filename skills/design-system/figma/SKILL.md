---
name: figma
description: |
    Use when working with Figma as the design source for a design system — including Variables, Dev Mode, Code Connect, the REST API, and MCP-based design-to-code workflows.
    USE FOR: Figma Variables, Figma Dev Mode, Code Connect, Figma REST API, Tokens Studio plugin, Figma MCP server, design-to-code handoff
    DO NOT USE FOR: token file format details (use design-tokens), token build pipelines (use style-dictionary), component documentation (use storybook)
license: MIT
metadata:
  displayName: "Figma"
  author: "Tyler-R-Kendrick"
compatibility: claude, copilot, cursor
references:
  - title: "Figma Developer Documentation"
    url: "https://developers.figma.com/"
  - title: "Figma — Official Website"
    url: "https://www.figma.com/developers"
---

# Figma — Design-to-Code

## Overview
Figma is the primary design tool for modern design systems. Its Variables system, Dev Mode, Code Connect, and REST API create a structured pipeline from visual design decisions to production code. The Figma MCP server brings Figma context directly into AI coding tools.

## Figma Variables
Variables are Figma's native design token system — reusable values that can be scoped to modes (themes) and collections:

### Variable Types
| Type | Maps To | Example |
|------|---------|---------|
| Color | `color` token | `#3b82f6` |
| Number | `dimension` / `number` token | `16`, `1.5` |
| String | `fontFamily` / custom | `"Inter"` |
| Boolean | Feature flags | `true` / `false` |

### Collections and Modes
```
Collection: "Color"
├── Mode: Light
│   ├── surface: #ffffff
│   └── on-surface: #111827
└── Mode: Dark
    ├── surface: #111827
    └── on-surface: #f9fafb

Collection: "Spacing"
└── Mode: Default
    ├── space-xs: 4
    ├── space-sm: 8
    ├── space-md: 16
    └── space-lg: 24
```

### Variable Aliases
Variables can reference other variables, mirroring the DTCG alias pattern:
```
Global: blue-500 = #3b82f6
Semantic: color-primary = alias → blue-500
Component: button-bg = alias → color-primary
```

## Dev Mode
Dev Mode is the developer-facing view in Figma that surfaces implementation-ready specs:

- **Variable inspection** — see the full alias chain down to raw values
- **CSS / iOS / Android code snippets** — auto-generated from component properties
- **Ready for dev status** — designers mark components as implementation-ready
- **Compare changes** — diff between design versions
- **Component properties** — variant, boolean, instance swap, text props

## Code Connect
Code Connect links Figma components to real code in your repository, replacing generic snippets with actual component usage:

```tsx
// Button.figma.tsx
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, "https://figma.com/file/abc123/...", {
  props: {
    label: figma.string("Label"),
    variant: figma.enum("Variant", {
      Primary: "primary",
      Secondary: "secondary",
    }),
    disabled: figma.boolean("Disabled"),
    icon: figma.instance("Icon"),
  },
  example: ({ label, variant, disabled, icon }) => (
    <Button variant={variant} disabled={disabled} icon={icon}>
      {label}
    </Button>
  ),
});
```

### Supported Frameworks
| Framework | File Extension |
|-----------|---------------|
| React / React Native | `.figma.tsx` |
| SwiftUI | `.figma.swift` |
| Jetpack Compose | `.figma.kt` |
| HTML / CSS | `.figma.html` |

### CLI Commands
```bash
# Publish Code Connect mappings
npx figma connect publish

# Validate without publishing
npx figma connect parse
```

## Figma REST API
The REST API provides programmatic access to files, components, variables, and styles:

### Key Endpoints
| Endpoint | Description |
|----------|-------------|
| `GET /v1/files/:key` | File structure, pages, components |
| `GET /v1/files/:key/variables/local` | All local variables |
| `GET /v1/files/:key/component_sets` | Component sets with variants |
| `GET /v1/files/:key/styles` | Published styles |
| `GET /v1/images/:key` | Export rendered images |

### Extracting Variables
```bash
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY/variables/local"
```

Response includes variable collections, modes, values per mode, and alias references — everything needed to generate DTCG token files.

## Tokens Studio Plugin
Tokens Studio is a Figma plugin that manages design tokens in W3C DTCG format:

- **Bi-directional sync** — edit tokens in Figma or JSON, keep both in sync
- **Git integration** — push/pull token files directly from Figma
- **Multi-file support** — split tokens across files by category
- **Theme switching** — toggle between token sets (light/dark, brand variants)
- **Style Dictionary integration** — exports compatible with SD v4

## Figma MCP Server
The Figma MCP server brings design context into AI coding tools (VS Code, Cursor, Claude):

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "<token>"
      }
    }
  }
}
```

### MCP Capabilities
| Tool | Description |
|------|-------------|
| `get_screenshot` | Capture a rendered frame or component |
| `get_design_context` | Extract layout, styles, spacing, colors |
| `get_metadata` | Component properties, variants, constraints |
| `get_variable_defs` | Variable collections, modes, values |
| `get_code_connect_map` | Existing Code Connect mappings |
| `get_code_connect_suggestions` | AI-recommended component mappings |

## Design-to-Code Workflow
```
1. Design in Figma
   ├── Define Variables (collections, modes, aliases)
   └── Build components with variable bindings

2. Export tokens
   ├── Tokens Studio → .tokens.json (DTCG format)
   └── REST API → JSON → transform script → .tokens.json

3. Transform tokens
   └── Style Dictionary → CSS, SCSS, iOS, Android, Compose

4. Implement components
   ├── Code Connect → framework snippets in Dev Mode
   └── MCP Server → AI-assisted implementation from screenshots

5. Document in Storybook
   └── Stories, args, play functions, visual tests
```

## Best Practices
- Use Figma Variables (not just styles) — they support modes, aliases, and scoping which map directly to DTCG tokens.
- Set up Code Connect for your most-used components so Dev Mode shows real code instead of generic CSS.
- Use Tokens Studio for bi-directional sync between Figma Variables and `.tokens.json` files in your repo.
- Use the Figma MCP server in your editor to get design context without switching windows.
- Export variables via the REST API in CI to detect token drift between Figma and your codebase.
- Mark components as "Ready for dev" in Dev Mode to create a clear handoff workflow.
