# OTLP Logging and Observability

Guidance for OpenTelemetry Protocol (OTLP) logging and observability in .NET. USE FOR: OTLP log export, OpenTelemetry traces and metrics, distributed tracing with Activity API, configuring OTel collectors, correlating logs with traces, custom metrics and instruments. DO NOT USE FOR: Serilog-specific sinks and enrichers (use serilog), NLog-specific targets and routing (use nlog), Microsoft.Extensions.Logging abstractions (use extensions-logging).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/observability/otlp-logging
```

## License

MIT
