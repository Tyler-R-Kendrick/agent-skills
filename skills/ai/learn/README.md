# Learn

Use when a user corrects, rejects, edits, or redirects an LLM/agent response and the correction should become a reusable reasoning strategy. Converts feedback into generalized learnings for ~/.agents/STEERING.md with linked RDF/Turtle evidence.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 5 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/ai/learn
```

## License

MIT
