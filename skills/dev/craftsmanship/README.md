# Software Craftsmanship

Use when applying software craftsmanship principles — code quality, professional practices, and continuous improvement drawn from canonical works.

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
| [`clean-architecture/`](clean-architecture/) | Use when designing system boundaries, dependency direction, and layered architecture — based on Robert C. Martin's "Clea... |
| [`clean-code/`](clean-code/) | Use when writing or reviewing code for readability, maintainability, and expressiveness — based on Robert C. Martin's "C... |
| [`refactoring/`](refactoring/) | Use when identifying code smells and applying systematic refactoring techniques — based on Martin Fowler's "Refactoring.... |
| [`solid/`](solid/) | Use when applying or evaluating SOLID object-oriented design principles — Single Responsibility, Open/Closed, Liskov Sub... |
| [`twelve-factor/`](twelve-factor/) | Use when designing, deploying, or evaluating cloud-native applications — based on the Twelve-Factor App methodology from... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dev/craftsmanship
```

## License

MIT
