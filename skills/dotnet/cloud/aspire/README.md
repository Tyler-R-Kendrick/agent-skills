# .NET Aspire

Use when building cloud-native distributed applications with .NET Aspire. Covers the app host orchestration model, service defaults, built-in components (Redis, PostgreSQL, RabbitMQ), dashboard, health checks, and deployment to Azure Container Apps.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/cloud/aspire
```

## License

MIT
