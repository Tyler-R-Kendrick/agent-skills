# File Providers

Guidance for Microsoft.Extensions.FileProviders abstraction layer. USE FOR: abstracting file access over physical files, embedded resources, and composite sources, watching for file changes, serving static content, testable file access, configuration file providers. DO NOT USE FOR: high-throughput binary I/O (use System.IO directly), file upload handling (use ASP.NET form files), database-backed storage, cloud blob storage (use Azure SDK).

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/file-provider
```

## License

MIT
