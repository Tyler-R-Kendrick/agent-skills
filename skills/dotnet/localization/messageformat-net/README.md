# MessageFormat.NET

Guidance for MessageFormat.NET (Jeffijoe.MessageFormat) ICU message formatting library. USE FOR: ICU MessageFormat pluralization, gender/select patterns, complex parameterized localization messages, locale-aware plural rules. DO NOT USE FOR: basic resource file localization (use resources-localization), culture formatting of dates/numbers (use globalization-localization), general i18n architecture (use i18n).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 14 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/localization/messageformat-net
```

## License

MIT
