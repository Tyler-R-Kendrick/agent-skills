# Development Fundamentals

Use when working with fundamental software development knowledge — patterns, algorithms, architecture, and craftsmanship principles drawn from canonical published works.

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
| [`algorithms/`](algorithms/) | Use when selecting algorithms, analyzing complexity, or reasoning about data structure choices. Covers Big-O notation, s... |
| [`architecture/`](architecture/) | Use when selecting architecture styles, evaluating system decomposition strategies, or analyzing architecture characteri... |
| [`backend/`](backend/) | Use when making backend architecture decisions — choosing API styles, database types, caching strategies, authentication... |
| [`craftsmanship/`](craftsmanship/) | Use when applying software craftsmanship principles — code quality, professional practices, and continuous improvement d... |
| [`design-patterns/`](design-patterns/) | Gang of Four (GoF) design patterns — 23 proven object-oriented solutions organized into Creational, Structural, and Beha... |
| [`frontend/`](frontend/) | Frontend architecture approaches — from Multi-Page Apps through Single Page Apps, Server-Side Rendering, Islands Archite... |
| [`integration-patterns/`](integration-patterns/) | Use when designing or evaluating enterprise integration architectures based on Hohpe & Woolf's Enterprise Integration Pa... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dev
```

## License

MIT
