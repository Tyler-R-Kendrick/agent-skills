# System.IO.Abstractions

Guidance for System.IO.Abstractions file system abstraction library. USE FOR: wrapping file and directory operations for testability, mocking file system access in unit tests, replacing static File/Directory/Path calls with injectable interfaces, using MockFileSystem for deterministic test scenarios, testing code that reads/writes files. DO NOT USE FOR: actual file I/O performance optimization, replacing stream-based APIs, or scenarios where you need raw file system performance without abstraction overhead.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/testing/system-io-abstractions
```

## License

MIT
