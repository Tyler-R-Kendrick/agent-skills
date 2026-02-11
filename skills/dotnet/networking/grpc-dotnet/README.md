# gRPC for .NET

Guidance for gRPC in .NET using Grpc.AspNetCore and Grpc.Net.Client. USE FOR: gRPC service definitions, proto file compilation, unary and streaming RPCs, gRPC client factory, deadline/cancellation, interceptors, gRPC-Web for browser clients. DO NOT USE FOR: REST/HTTP APIs (use ASP.NET Core), real-time browser push (use SignalR), custom TCP protocols (use dotnetty), email protocols (use mimekit).

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 10 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/networking/grpc-dotnet
```

## License

MIT
