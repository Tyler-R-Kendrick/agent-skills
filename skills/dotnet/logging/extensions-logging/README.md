# Microsoft.Extensions.Logging

Guidance for Microsoft.Extensions.Logging and LoggerMessage source generators. USE FOR: ILogger abstraction, LoggerMessage source-generated logging, structured logging with event IDs, log filtering and configuration, high-performance logging patterns. DO NOT USE FOR: Serilog-specific sinks and enrichers (use serilog), NLog-specific targets and routing (use nlog), OpenTelemetry log export (use otlp-logging).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/logging/extensions-logging
```

## License

MIT
