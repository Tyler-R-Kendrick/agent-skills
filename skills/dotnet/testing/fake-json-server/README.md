# Fake JSON Server

Guidance for FakeServer and fake JSON API servers for .NET testing. USE FOR: mocking REST APIs during development, creating stub HTTP endpoints for integration tests, simulating third-party API responses, building prototype backends for frontend development, testing HTTP client code without external dependencies. DO NOT USE FOR: production API hosting, load testing (use proper test infrastructure), contract testing (use Pact), or testing real database interactions (use Testcontainers).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 14 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/fake-json-server
```

## License

MIT
