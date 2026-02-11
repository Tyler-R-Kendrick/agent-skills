# cagent (Docker Agent Runtime) Rules

Best practices and rules for cagent (Docker Agent Runtime).

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Start with a single `root` agent and add sub-agents only... | MEDIUM | [`cagent-start-with-a-single-root-agent-and-add-sub-agents-only.md`](cagent-start-with-a-single-root-agent-and-add-sub-agents-only.md) |
| 2 | Use Docker MCP Gateway (`ref | MEDIUM | [`cagent-use-docker-mcp-gateway-ref.md`](cagent-use-docker-mcp-gateway-ref.md) |
| 3 | Use `tools | MEDIUM | [`cagent-use-tools.md`](cagent-use-tools.md) |
| 4 | Define named model references in the `models` section to... | HIGH | [`cagent-define-named-model-references-in-the-models-section-to.md`](cagent-define-named-model-references-in-the-models-section-to.md) |
| 5 | Use the `think` toolset for agents that need to reason... | MEDIUM | [`cagent-use-the-think-toolset-for-agents-that-need-to-reason.md`](cagent-use-the-think-toolset-for-agents-that-need-to-reason.md) |
| 6 | Use the `memory` toolset with a persistent path for agents... | MEDIUM | [`cagent-use-the-memory-toolset-with-a-persistent-path-for-agents.md`](cagent-use-the-memory-toolset-with-a-persistent-path-for-agents.md) |
| 7 | Keep agent instructions focused | MEDIUM | [`cagent-keep-agent-instructions-focused.md`](cagent-keep-agent-instructions-focused.md) |
