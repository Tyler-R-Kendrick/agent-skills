# AutoFixture

Guidance for AutoFixture test data generation library. USE FOR: auto-generating test data for unit tests, reducing boilerplate in the Arrange phase, creating anonymous objects and collections, customizing test data generation rules, integrating with Moq (AutoMoq) and xUnit for fully automated test setup. DO NOT USE FOR: integration test data seeding, production data generation, load testing data, or replacing dedicated faker libraries when realistic domain data is required.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/autofixture
```

## License

MIT
