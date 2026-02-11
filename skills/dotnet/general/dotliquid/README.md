# DotLiquid

Guidance for DotLiquid template engine for .NET. USE FOR: safe user-generated templates, email templates, CMS content rendering, sandboxed template execution, report generation from data models. DO NOT USE FOR: Razor-based server-side views (use ASP.NET Razor), logic-heavy templates requiring full C# (use Scriban or Razor), compiled template performance-critical paths.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 14 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/dotliquid
```

## License

MIT
