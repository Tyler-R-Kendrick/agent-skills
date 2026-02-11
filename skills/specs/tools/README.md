# Specification Tools

Use when working with specification tooling that automates the spec-driven development workflow — from generating specs to creating plans and tasks from specifications.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 3 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`speckit/`](speckit/) | Use when setting up or using GitHub Spec Kit for spec-driven development — where specifications define the "what" before... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/specs/tools
```

## License

MIT
