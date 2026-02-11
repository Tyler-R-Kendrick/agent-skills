# Stateless

Guidance for Stateless state machine library for .NET. USE FOR: modeling state transitions with guards and actions, workflow engines, order processing pipelines, device lifecycle management, protocol implementations, approval workflows. DO NOT USE FOR: distributed state machines (use Durable Functions or Temporal), event sourcing (use Marten), full BPMN workflow engines (use Elsa), simple boolean flags.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/stateless
```

## License

MIT
