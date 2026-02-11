# Integration Patterns

Use when designing or evaluating enterprise integration architectures based on Hohpe & Woolf's Enterprise Integration Patterns.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 7 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`message-construction/`](message-construction/) | Use when designing message structure, intent, and metadata for enterprise messaging systems based on Enterprise Integrat... |
| [`message-routing/`](message-routing/) | Use when designing how messages are directed, split, aggregated, and orchestrated across enterprise systems based on Ent... |
| [`message-transformation/`](message-transformation/) | Use when designing how messages are reshaped, enriched, filtered, or normalised as they flow between systems based on En... |
| [`messaging-channels/`](messaging-channels/) | Use when designing how messages travel between applications -- channel types, delivery guarantees, and bridging strategi... |
| [`messaging-endpoints/`](messaging-endpoints/) | Use when designing how applications connect to and consume messages from a messaging system based on Enterprise Integrat... |
| [`system-management/`](system-management/) | Use when designing observability, testing, debugging, and operational control for messaging systems based on Enterprise ... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dev/integration-patterns
```

## License

MIT
