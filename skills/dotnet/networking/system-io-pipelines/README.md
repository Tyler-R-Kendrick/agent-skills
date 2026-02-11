# System.IO.Pipelines

Guidance for System.IO.Pipelines high-performance I/O in .NET. USE FOR: high-throughput stream parsing, zero-copy buffer management, PipeReader/PipeWriter patterns, network protocol parsing, ReadOnlySequence processing, replacing Stream-based I/O bottlenecks. DO NOT USE FOR: simple file reads (use Stream or File APIs), HTTP request handling (use ASP.NET Core), gRPC communication (use grpc-dotnet), email (use mimekit).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/networking/system-io-pipelines
```

## License

MIT
