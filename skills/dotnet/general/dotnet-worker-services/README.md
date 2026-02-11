# .NET Worker Services

Guidance for building .NET worker services and background tasks using BackgroundService and IHostedService. USE FOR: long-running background processing, message queue consumers, scheduled jobs, health monitoring services, data synchronization tasks, Windows services, Linux systemd daemons. DO NOT USE FOR: HTTP request handling (use ASP.NET Core), one-shot CLI tools (use console apps), UI applications, short-lived Azure Functions.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/dotnet-worker-services
```

## License

MIT
