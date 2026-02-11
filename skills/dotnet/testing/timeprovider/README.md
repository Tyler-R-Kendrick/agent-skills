# TimeProvider

Guidance for TimeProvider abstraction for testable time-dependent code. USE FOR: making time-dependent code testable, replacing DateTime.UtcNow and DateTimeOffset.UtcNow with injectable abstractions, controlling time in unit tests with FakeTimeProvider, testing expiration logic, scheduling, token lifetimes, and time-based business rules. DO NOT USE FOR: high-precision timing or benchmarking (use Stopwatch), NTP synchronization, or scenarios running on .NET versions prior to .NET 8.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 10 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/timeprovider
```

## License

MIT
