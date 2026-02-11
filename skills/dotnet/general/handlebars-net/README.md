# Handlebars.NET

Guidance for Handlebars.NET template engine for .NET. USE FOR: logic-less HTML templating, email template rendering, code generation templates, report formatting, Mustache-compatible templates with helpers and partials. DO NOT USE FOR: sandboxed user-generated templates (use DotLiquid), full C# expression templates (use Razor), complex data transformations, server-side view rendering in ASP.NET.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/handlebars-net
```

## License

MIT
