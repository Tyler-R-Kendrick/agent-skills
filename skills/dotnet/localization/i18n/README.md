# Internationalization (i18n)

Guidance for internationalization (i18n) architecture in .NET applications. USE FOR: designing i18n-ready applications, externalizing user-facing strings, building multi-language ASP.NET Core apps, Razor view localization, data annotation localization. DO NOT USE FOR: low-level culture formatting (use globalization-localization), ICU plural/gender patterns (use messageformat-net), basic resource file operations (use resources-localization).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 15 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/localization/i18n
```

## License

MIT
