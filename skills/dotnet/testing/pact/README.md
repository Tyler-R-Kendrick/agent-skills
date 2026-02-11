# Pact

Guidance for Pact contract testing framework in .NET. USE FOR: consumer-driven contract testing, verifying API compatibility between microservices, preventing breaking API changes, generating and verifying Pact files, provider state management, CI/CD integration with Pact Broker. DO NOT USE FOR: end-to-end testing (use Playwright), unit testing (use xUnit with Moq), load testing, or testing internal implementation details.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/pact
```

## License

MIT
