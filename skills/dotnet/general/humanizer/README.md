# Humanizer

Guidance for Humanizer library for .NET string, date, number, and enum formatting. USE FOR: human-readable date/time formatting, pluralization, number-to-words conversion, enum display names, truncation, byte size formatting, casing transformations. DO NOT USE FOR: localization infrastructure (use IStringLocalizer), parsing human input back to types, business logic, data storage formatting.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 10 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/humanizer
```

## License

MIT
