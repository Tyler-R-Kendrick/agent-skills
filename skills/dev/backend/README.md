# Backend Architecture

Use when making backend architecture decisions — choosing API styles, database types, caching strategies, authentication mechanisms, and server-side design patterns for scalable, maintainable systems.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 6 individual best practice rules |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`api-design/`](api-design/) | Use when designing APIs — REST endpoints, GraphQL schemas, gRPC services, or WebSocket protocols — including resource na... |
| [`authentication/`](authentication/) | Use when designing authentication and authorization systems — OAuth 2.0 flows, JWT handling, session management, RBAC/AB... |
| [`caching/`](caching/) | Use when designing caching strategies — choosing between cache-aside, read-through, write-through, write-behind, and wri... |
| [`data-modeling/`](data-modeling/) | Use when designing database schemas, choosing data modeling strategies, or making decisions about data storage architect... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dev/backend
```

## License

MIT
