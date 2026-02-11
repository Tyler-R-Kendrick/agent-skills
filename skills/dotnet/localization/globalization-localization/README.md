# Globalization and Localization

Guidance for globalization and localization in .NET. USE FOR: culture-aware formatting, request localization middleware, date/number/currency formatting across cultures, locale-sensitive string comparison. DO NOT USE FOR: simple resource file lookup (use resources-localization), ICU message formatting (use messageformat-net), general i18n architecture (use i18n).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/localization/globalization-localization
```

## License

MIT
