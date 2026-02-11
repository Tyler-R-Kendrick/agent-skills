# Testcontainers

Guidance for Testcontainers integration testing library for .NET. USE FOR: spinning up real databases in Docker for integration tests, testing against PostgreSQL/SQL Server/Redis/RabbitMQ containers, verifying EF Core migrations against a real database, testing message broker consumers, replacing in-memory test doubles with real infrastructure in CI/CD pipelines. DO NOT USE FOR: unit testing (use Moq/AutoFixture), production container orchestration (use Kubernetes), load testing, or scenarios where Docker is unavailable.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/testcontainers
```

## License

MIT
