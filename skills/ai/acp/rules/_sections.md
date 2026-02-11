# ACP (Agent Communication Protocol) Rules

Best practices and rules for ACP (Agent Communication Protocol).

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `GET /agents` for runtime discovery so clients can... | MEDIUM | [`acp-use-get-agents-for-runtime-discovery-so-clients-can.md`](acp-use-get-agents-for-runtime-discovery-so-clients-can.md) |
| 2 | Use sessions for multi-turn workflows | MEDIUM | [`acp-use-sessions-for-multi-turn-workflows.md`](acp-use-sessions-for-multi-turn-workflows.md) |
| 3 | Use streaming mode for long-running agents to give callers... | MEDIUM | [`acp-use-streaming-mode-for-long-running-agents-to-give-callers.md`](acp-use-streaming-mode-for-long-running-agents-to-give-callers.md) |
| 4 | Attach `TrajectoryMetadata` to parts when exposing... | MEDIUM | [`acp-attach-trajectorymetadata-to-parts-when-exposing.md`](acp-attach-trajectorymetadata-to-parts-when-exposing.md) |
| 5 | Use Redis or PostgreSQL backends in production for high... | CRITICAL | [`acp-use-redis-or-postgresql-backends-in-production-for-high.md`](acp-use-redis-or-postgresql-backends-in-production-for-high.md) |
| 6 | Since ACP has merged into A2A, evaluate A2A for greenfield... | MEDIUM | [`acp-since-acp-has-merged-into-a2a-evaluate-a2a-for-greenfield.md`](acp-since-acp-has-merged-into-a2a-evaluate-a2a-for-greenfield.md) |
