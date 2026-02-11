# AspectCore

Guidance for AspectCore AOP framework for .NET Core. USE FOR: cross-cutting concerns via interceptors, method-level AOP, dynamic proxies, logging/caching/authorization interception, decorating service interfaces. DO NOT USE FOR: compile-time weaving (use PostSharp), full IL rewriting, non-DI scenarios, .NET Framework-only projects.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/aspectcore
```

## License

MIT
