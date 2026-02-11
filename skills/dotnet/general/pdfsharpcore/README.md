# PdfSharpCore

Guidance for PdfSharpCore PDF generation and modification library for .NET. USE FOR: creating PDF documents programmatically, drawing text/shapes/images on PDF pages, modifying existing PDFs, merging PDF files, generating reports and invoices as PDF, adding headers/footers/page numbers. DO NOT USE FOR: extracting text from PDFs (use PdfPig), PDF form filling with complex logic, high-volume HTML-to-PDF conversion (use a headless browser), PDF/A compliance.

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
npx agentskills add Tyler-R-Kendrick/agent-skills/skills/dotnet/general/pdfsharpcore
```

## License

MIT
