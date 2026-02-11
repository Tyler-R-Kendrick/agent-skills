# TypeScript Runtimes

Use when choosing or configuring a TypeScript/JavaScript runtime environment. Covers the runtime landscape including Node.js, Deno, and Bun with feature comparisons, architectural differences, and selection guidance.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 10 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`deno/`](deno/) | Use when building applications with Deno, the TypeScript-first runtime with built-in security, web standard APIs, and mo... |
| [`node/`](node/) | Use when building applications with Node.js, the most widely deployed JavaScript/TypeScript runtime. Covers the event lo... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/typescript/runtime
```

## License

MIT
