# cagent (Docker Agent Runtime)

Use when building or running multi-agent systems with Docker cagent. Covers YAML agent configuration, MCP tool integration, sub-agents, Docker MCP Gateway, and the cagent CLI.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 7 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/ai/cagent
```

## License

Apache-2.0
