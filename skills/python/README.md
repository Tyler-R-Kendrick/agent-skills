# Python

Guidance for Python software development across the ecosystem. Covers project configuration, package management, CLI development, and popular libraries.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |

## Sub-skills

| Skill | Description |
|-------|-------------|
| [`cli/`](cli/) | Guidance for building command-line interfaces and terminal applications in Python. |
| [`package-management/`](package-management/) | Guidance for Python package management, dependency resolution, virtual environments, and lockfiles. |
| [`packages/`](packages/) | Guidance for Python package selection and dependency management. Use when choosing Python libraries, managing pip/poetry... |
| [`project-system/`](project-system/) | Guidance for Python project configuration and packaging using pyproject.toml, build backends, and modern PEP standards. |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/python
```

## License

MIT
