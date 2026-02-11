# ADR (Architecture Decision Records)

Use when writing Architecture Decision Records to capture significant technical decisions with their context, rationale, and consequences. Covers the Nygard format, MADR format, ADR numbering, linking, lifecycle management, and adr-tools CLI.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 12 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/specs/documentation/adr
```

## License

MIT
