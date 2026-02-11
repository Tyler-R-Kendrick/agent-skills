# Bond

Guidance for Microsoft Bond schematized data serialization framework. USE FOR: cross-platform schema-first serialization, Compact Binary and Fast Binary wire formats, schema evolution with backward/forward compatibility, high-performance RPC data contracts, strongly typed data interchange between .NET, C++, Python, and Java services. DO NOT USE FOR: JSON REST APIs (use System.Text.Json), human-readable config files, simple key-value storage, or when schema-less flexibility is required.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/serialization/bond
```

## License

MIT
