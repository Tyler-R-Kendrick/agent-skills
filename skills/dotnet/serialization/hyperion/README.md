# Hyperion

Guidance for Hyperion high-performance polymorphic serializer for .NET. USE FOR: Akka.NET actor message serialization, polymorphic type handling, object graph serialization with circular references, high-throughput binary serialization, version-tolerant deserialization of actor system messages. DO NOT USE FOR: human-readable serialization (use System.Text.Json), cross-language interop (use protobuf-net or Bond), REST API payloads, or long-term data storage requiring schema evolution.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/serialization/hyperion
```

## License

MIT
