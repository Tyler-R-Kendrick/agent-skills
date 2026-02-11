# Topshelf

Guidance for Topshelf Windows service hosting framework for .NET. USE FOR: creating Windows services with fluent API, service install/uninstall from command line, service recovery configuration, running services as console apps during development, .NET Framework Windows services. DO NOT USE FOR: modern .NET 6+ worker services (use BackgroundService with AddWindowsService), Linux daemons (use systemd hosting), cross-platform services, ASP.NET Core web hosting.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/topshelf
```

## License

MIT
