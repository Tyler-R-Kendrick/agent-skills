# Architecture

Use when selecting architecture styles, evaluating system decomposition strategies, or analyzing architecture characteristics (quality attributes) for a system.

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
| [`domain-driven-design/`](domain-driven-design/) | Domain-Driven Design (DDD) strategic and tactical patterns based on Eric Evans' "Domain-Driven Design" -- covering bound... |
| [`event-driven/`](event-driven/) | Event-Driven Architecture (EDA), Event Sourcing, and CQRS -- complementary but independent patterns for building reactiv... |
| [`hexagonal/`](hexagonal/) | Hexagonal Architecture (Ports and Adapters), Onion Architecture, and their relationship to Clean Architecture -- enablin... |
| [`microservices/`](microservices/) | Microservice architecture patterns and practices based on Sam Newman's "Building Microservices" -- covering service deco... |
| [`monoliths/`](monoliths/) | Monolithic architecture patterns including modular monolith design, monolith-first strategy, and migration paths to micr... |
| [`well-architected/`](well-architected/) | Cloud well-architected frameworks from AWS, Azure, and GCP -- covering pillars, design principles, review processes, and... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dev/architecture
```

## License

MIT
