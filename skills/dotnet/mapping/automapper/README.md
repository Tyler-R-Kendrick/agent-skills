# AutoMapper

Guidance for AutoMapper convention-based object mapping library. USE FOR: convention-based object-to-object mapping, Profile-based mapping configuration, flattening/unflattening, ProjectTo with EF Core IQueryable, reverse mapping, value resolvers, type converters. DO NOT USE FOR: compile-time source-generated mapping (use mapperly), manual mapping in performance-critical paths, mapping that involves complex business logic.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/mapping/automapper
```

## License

MIT
