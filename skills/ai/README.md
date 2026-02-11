# AI Agent Protocols & Standards

Use when working with AI agent protocols, standards, and interoperability specifications. Covers MCP, A2A, ACP, Agent Skills, AGENTS.md, ADL, x402, AP2, MCP Apps, and cagent.

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
| [`a2a/`](a2a/) | Use when implementing the Agent-to-Agent (A2A) protocol for inter-agent communication, task delegation, and multi-agent ... |
| [`acp/`](acp/) | Use when implementing the Agent Communication Protocol (ACP) for REST-based agent-to-agent communication, task delegatio... |
| [`adl/`](adl/) | Use when defining AI agents declaratively with Agent Definition Language (ADL). Covers agent identity, LLM configuration... |
| [`agent-skills/`](agent-skills/) | Use when creating, packaging, or distributing Agent Skills. Covers the SKILL.md specification, frontmatter schema, namin... |
| [`agents-md/`](agents-md/) | Use when creating or updating AGENTS.md files to guide AI coding agents. Covers file structure, placement, content guide... |
| [`ap2/`](ap2/) | Use when implementing the Agent Payments Protocol (AP2) for secure, compliant AI-driven commerce. Covers intent mandates... |
| [`cagent/`](cagent/) | Use when building or running multi-agent systems with Docker cagent. Covers YAML agent configuration, MCP tool integrati... |
| [`mcp/`](mcp/) | Use when implementing or integrating with the Model Context Protocol (MCP) for AI tool servers, resources, prompts, and ... |
| [`mcp-apps/`](mcp-apps/) | Use when building MCP Apps that serve interactive UI from MCP servers. Covers the ui:// URI scheme, HTML rendering in sa... |
| [`x402/`](x402/) | Use when implementing the x402 protocol for HTTP-native micropayments. Covers server middleware, client payment flows, f... |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/ai
```

## License

MIT
