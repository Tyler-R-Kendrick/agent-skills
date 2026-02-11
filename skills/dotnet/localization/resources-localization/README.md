# Resources and Localization

Guidance for .NET resource files (.resx) and IStringLocalizer-based localization. USE FOR: .resx resource file management, IStringLocalizer and IStringLocalizerFactory usage, strongly-typed resource access, satellite assembly localization. DO NOT USE FOR: culture-aware number/date formatting (use globalization-localization), ICU plural/gender patterns (use messageformat-net), full i18n architecture (use i18n).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/localization/resources-localization
```

## License

MIT
