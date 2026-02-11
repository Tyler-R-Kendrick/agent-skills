# PdfPig

Guidance for PdfPig PDF reading and content extraction library for .NET. USE FOR: extracting text from PDFs, reading PDF metadata, extracting images from PDF pages, word-level and letter-level text extraction, searching PDF content, analyzing PDF document structure. DO NOT USE FOR: creating or generating PDFs (use PdfSharpCore or QuestPDF), editing existing PDFs, PDF form filling, rendering PDFs to images.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/pdfpig
```

## License

MIT
