# Community Toolkit

Guidance for .NET Community Toolkit libraries including MVVM Toolkit, Diagnostics, and HighPerformance. USE FOR: MVVM source-generated view models, observable properties, relay commands, messenger pattern, guard clauses, high-performance array pooling, string pooling. DO NOT USE FOR: UI framework specifics (use WPF/MAUI/WinUI skills), full reactive programming (use Rx), dependency injection container logic.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/community-toolkit
```

## License

MIT
