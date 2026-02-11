# NLog

Guidance for NLog logging framework in .NET. USE FOR: NLog target configuration, layout renderers, structured logging with NLog, async logging, conditional routing, custom targets, NLog integration with ASP.NET Core. DO NOT USE FOR: Microsoft.Extensions.Logging abstractions (use extensions-logging), Serilog sinks and enrichers (use serilog), OpenTelemetry log export (use otlp-logging).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/logging/nlog
```

## License

MIT
