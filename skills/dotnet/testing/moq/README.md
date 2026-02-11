# Moq

Guidance for Moq mocking framework for .NET unit testing. USE FOR: creating mock objects for interfaces, stubbing method return values, verifying method invocations, argument matching and capture, testing code in isolation from dependencies, simulating exceptions and async behavior in unit tests. DO NOT USE FOR: integration testing with real dependencies (use Testcontainers), mocking static methods or sealed classes (use shims or wrappers), or end-to-end testing.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 16 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/moq
```

## License

MIT
