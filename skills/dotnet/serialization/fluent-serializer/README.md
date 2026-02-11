# Fluent Serializer

Guidance for fluent API serialization configuration patterns in .NET. USE FOR: building configurable serialization pipelines, wrapping System.Text.Json or Newtonsoft.Json with fluent APIs, custom serialization profiles, convention-based JSON configuration, reusable serialization presets across multiple services. DO NOT USE FOR: binary serialization (use protobuf-net or Bond), schema-first serialization, high-throughput hot-path serialization where configuration overhead matters.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/serialization/fluent-serializer
```

## License

MIT
