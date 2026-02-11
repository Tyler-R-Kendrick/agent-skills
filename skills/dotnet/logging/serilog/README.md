# Serilog

Guidance for Serilog structured logging library in .NET. USE FOR: Serilog sink configuration, structured event logging, log enrichment, ASP.NET Core request logging, Serilog expressions and filtering, Seq/Elasticsearch/Application Insights integration. DO NOT USE FOR: Microsoft.Extensions.Logging abstractions (use extensions-logging), NLog targets and routing (use nlog), OpenTelemetry log export (use otlp-logging).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/logging/serilog
```

## License

MIT
