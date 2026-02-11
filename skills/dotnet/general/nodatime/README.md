# NodaTime

Guidance for NodaTime date and time library for .NET. USE FOR: precise date/time handling, time zone conversions, period and duration calculations, calendar-aware date arithmetic, replacing ambiguous DateTime usage, scheduling across time zones. DO NOT USE FOR: simple timestamp logging (use DateTimeOffset), timer-based scheduling (use PeriodicTimer), date formatting only (use standard .NET formatting), legacy .NET Framework DateTime interop without conversion.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/nodatime
```

## License

MIT
