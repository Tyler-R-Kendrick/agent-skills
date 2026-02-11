# NCrontab

Guidance for NCrontab cron expression parser and scheduler for .NET. USE FOR: parsing cron expressions, calculating next/previous occurrences, validating cron syntax, scheduling background tasks with cron patterns, generating occurrence lists for display. DO NOT USE FOR: full job scheduling frameworks (use Quartz.NET or Hangfire), distributed task scheduling, Windows Task Scheduler integration, real-time event processing.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/ncrontab
```

## License

MIT
