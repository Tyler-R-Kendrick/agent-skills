# Design System

Use when building or maintaining a design system — the coordinated set of design tokens, component libraries, documentation, and tooling that ensures visual and behavioral consistency across products.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 8 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`design-tokens/`](design-tokens/) | Use when authoring, structuring, or consuming design tokens in the W3C Design Tokens Community Group (DTCG) format. Cove... |
| [`figma/`](figma/) | Use when working with Figma as the design source for a design system — including Variables, Dev Mode, Code Connect, the ... |
| [`mitosis/`](mitosis/) | Use when writing cross-framework UI components with Mitosis (Builder.io). Write components once in a JSX subset, compile... |
| [`storybook/`](storybook/) | Use when documenting, developing, or testing UI components with Storybook. Covers CSF3, CSF Factories, play functions, A... |
| [`style-dictionary/`](style-dictionary/) | Use when transforming design tokens into platform-specific outputs using Style Dictionary. Covers configuration, transfo... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/design-system
```

## License

MIT
