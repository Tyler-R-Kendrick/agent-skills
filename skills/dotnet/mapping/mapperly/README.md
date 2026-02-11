# Mapperly

Guidance for Mapperly compile-time source-generated object mapper. USE FOR: high-performance object mapping via source generation, compile-time mapping validation, zero-reflection mapping, AOT-compatible mapping, enum mapping, collection mapping. DO NOT USE FOR: runtime convention-based mapping with ProjectTo (use automapper), mapping configurations that change at runtime, mapping that requires DI-injected services.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/mapping/mapperly
```

## License

MIT
