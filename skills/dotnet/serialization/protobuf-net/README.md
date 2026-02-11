# protobuf-net

Guidance for protobuf-net Protocol Buffers serializer for .NET. USE FOR: high-performance binary serialization, gRPC service contracts, cross-language data interchange, compact wire format for microservices, schema evolution with backward compatibility, replacing JSON in performance-critical inter-service communication. DO NOT USE FOR: human-readable serialization (use System.Text.Json), polymorphic type hierarchies without planning, dynamic/schema-less data, or browser-facing REST APIs expecting JSON.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/serialization/protobuf-net
```

## License

MIT
