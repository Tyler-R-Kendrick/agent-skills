# Storybook

## Overview
Storybook is the standard tool for developing, documenting, and testing UI components in isolation. Components are rendered in "stories" — declarative examples that showcase every state. Storybook supports React, Vue, Angular, Svelte, Web Components, and more.

## CSF3 — Component Story Format 3
CSF3 is the default story format since Storybook 7. Stories are plain objects with `args`, reducing boilerplate:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click me",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Click me",
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};
```

## CSF Factories (Experimental)
CSF Factories provide full type inference through a factory function chain — no manual type annotations needed:

```tsx
// .storybook/preview.ts
import { definePreview } from "@storybook/react";
import addonA11y from "@storybook/addon-a11y";

export default definePreview({
  addons: [addonA11y()],
  parameters: {
    layout: "centered",
  },
});
```

```tsx
// Button.stories.tsx
import preview from "#.storybook/preview";
import { Button } from "./Button";

const meta = preview.meta({
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
  },
});

export const Primary = meta.story({
  args: { variant: "primary", children: "Click me" },
});

export const Secondary = meta.story({
  args: { variant: "secondary", children: "Click me" },
});
```

### Subpath Imports
CSF Factories use subpath imports for stable references. Add to `package.json`:
```json
{
  "imports": {
    "#*": ["./*", "./*.ts", "./*.tsx"]
  }
}
```

## Play Functions
Play functions add automated interactions to stories — simulating clicks, typing, and assertions:

```tsx
import { expect, fn, userEvent, within } from "@storybook/test";

export const SubmitForm: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Type into the input
    await userEvent.type(canvas.getByLabelText("Email"), "user@example.com");

    // Click the submit button
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));

    // Assert the callback was called
    await expect(args.onSubmit).toHaveBeenCalledWith("user@example.com");
  },
};
```

### Play Function API
| Import | Description |
|--------|-------------|
| `within(element)` | Scoped Testing Library queries |
| `userEvent.click(el)` | Simulate click |
| `userEvent.type(el, text)` | Simulate typing |
| `userEvent.selectOptions(el, value)` | Select dropdown option |
| `userEvent.keyboard(keys)` | Simulate keyboard input |
| `expect(value)` | Jest-compatible assertions |
| `fn()` | Create a spied function (like `jest.fn()`) |
| `waitFor(callback)` | Wait for async conditions |

## Args and ArgTypes
Args are the dynamic inputs to a story. ArgTypes control how Storybook renders controls in the UI:

```tsx
const meta = {
  component: Card,
  argTypes: {
    title: { control: "text" },
    elevation: { control: { type: "range", min: 0, max: 5 } },
    variant: { control: "select", options: ["outlined", "filled"] },
    showHeader: { control: "boolean" },
    padding: { control: "number" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Card>;
```

### Control Types
| Control | Type | Description |
|---------|------|-------------|
| `text` | string | Text input |
| `boolean` | boolean | Checkbox toggle |
| `number` | number | Number input |
| `range` | number | Slider with min/max |
| `select` | enum | Dropdown |
| `radio` | enum | Radio buttons |
| `color` | string | Color picker |
| `date` | Date | Date picker |
| `object` | object | JSON editor |

## Interaction Testing
Play functions double as interaction tests when run via the Storybook test runner:

```bash
# Install test runner
npm install -D @storybook/test-runner

# Run all interaction tests
npx test-storybook

# Run in CI (requires a running Storybook)
npx test-storybook --url http://localhost:6006
```

## Decorators
Decorators wrap stories with context — providers, layouts, themes:

```tsx
const meta = {
  component: ProfileCard,
  decorators: [
    (Story) => (
      <ThemeProvider theme="light">
        <div style={{ padding: "1rem" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProfileCard>;
```

## Parameters
Parameters configure addons and story behavior:

```tsx
export const Mobile: Story = {
  args: { children: "Hello" },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    backgrounds: { default: "dark" },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: true }] } },
  },
};
```

## Key Addons
| Addon | Purpose |
|-------|---------|
| `@storybook/addon-a11y` | Accessibility audits (axe-core) |
| `@storybook/addon-viewport` | Responsive viewport simulation |
| `@storybook/addon-backgrounds` | Background color switching |
| `@storybook/addon-actions` | Log callback invocations |
| `@storybook/addon-docs` | Auto-generated documentation |
| `@storybook/addon-interactions` | Step-through play function debugger |
| `@storybook/addon-designs` | Embed Figma frames alongside stories |

## Storybook Configuration
```ts
// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
};

export default config;
```

## Commands
```bash
# Start dev server
npx storybook dev -p 6006

# Build static site
npx storybook build -o storybook-static

# Run interaction tests
npx test-storybook

# Initialize in an existing project
npx storybook@latest init
```

## Best Practices
- Write a story for every meaningful component state — default, hover, disabled, loading, error, empty.
- Use play functions for interaction tests so tests live alongside the stories they verify.
- Use `args` inheritance (`...Primary.args`) to build story variants without duplication.
- Add `argTypes` with controls so designers and PMs can explore component variations without code.
- Use decorators for providers (theme, i18n, router) rather than wrapping every story manually.
- Add the `@storybook/addon-a11y` addon and leave it enabled by default for continuous accessibility checks.
- Run `test-storybook` in CI to catch interaction regressions on every PR.
- Use `@storybook/addon-designs` to embed Figma frames next to stories for easy comparison.
