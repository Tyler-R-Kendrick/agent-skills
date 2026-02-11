# Migrant

Guidance for Migrant fast binary serialization library for .NET. USE FOR: fast binary serialization of complex object graphs, version-tolerant deserialization, simulation state snapshots, game save/load systems, deep object cloning via serialization, internal data persistence with circular reference support. DO NOT USE FOR: cross-language interop (use protobuf-net), REST API responses (use System.Text.Json), human-readable data formats, or long-term archival storage with strict schema guarantees.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/serialization/migrant
```

## License

MIT
