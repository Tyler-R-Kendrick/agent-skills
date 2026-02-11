# Olive

Guidance for Olive productivity framework for .NET. USE FOR: common string extensions (null-safe operations, validation), collection utilities, date/time helpers, file name sanitization, fluent API helpers, reducing boilerplate in business applications. DO NOT USE FOR: full web frameworks (use ASP.NET Core), ORM functionality (use EF Core), UI frameworks, large-scale enterprise architecture.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/olive
```

## License

MIT
