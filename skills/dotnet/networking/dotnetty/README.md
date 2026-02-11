# DotNetty

Guidance for DotNetty event-driven asynchronous network application framework. USE FOR: high-performance TCP/UDP servers and clients, custom binary protocol implementations, Netty-style channel pipelines, event loop groups, codec handlers, TLS/SSL socket connections. DO NOT USE FOR: HTTP APIs (use ASP.NET Core), gRPC services (use grpc-dotnet), email sending (use mimekit), high-level stream processing (use system-io-pipelines).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 15 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/networking/dotnetty
```

## License

MIT
