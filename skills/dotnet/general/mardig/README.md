# Markdig

Guidance for Markdig Markdown processor for .NET. USE FOR: converting Markdown to HTML, building custom Markdown pipelines, parsing Markdown AST, supporting CommonMark and extensions (tables, task lists, emoji, math), generating documentation from Markdown sources. DO NOT USE FOR: rich text editing UI (use a WYSIWYG editor), PDF generation from Markdown (convert to HTML first then use a PDF library), plain text formatting.

## Structure

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent skill definition (frontmatter + instructions) |
| `metadata.json` | Machine-readable metadata and versioning |
| `AGENTS.md` | Agent-optimized quick reference (generated) |
| `README.md` | This file |
| `rules/` | 13 individual best practice rules |

## Usage

```bash
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/mardig
```

## License

MIT
