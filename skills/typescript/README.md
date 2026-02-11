# TypeScript

Use when working with TypeScript projects, tooling, and ecosystem. Covers the type system, project configuration, package management, CLI development, and library packages.

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
| [`cli/`](cli/) | Use when building command-line interface tools with TypeScript. Covers argument parsing, interactive prompts, terminal U... |
| [`package-management/`](package-management/) | Use when choosing or configuring JavaScript/TypeScript package managers, managing dependencies, setting up workspaces, o... |
| [`packages/`](packages/) | Guidance for TypeScript/Node.js packages and libraries. Use when selecting, configuring, or working with npm packages in... |
| [`project-system/`](project-system/) | Use when configuring TypeScript projects, tsconfig.json, build tools, bundlers, and compilation pipelines. Covers compil... |
| [`runtime/`](runtime/) | Use when choosing or configuring a TypeScript/JavaScript runtime environment. Covers the runtime landscape including Nod... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/typescript
```

## License

MIT
