---
name: mardig
description: >
  Guidance for Markdig Markdown processor for .NET.
  USE FOR: converting Markdown to HTML, building custom Markdown pipelines, parsing Markdown AST, supporting CommonMark and extensions (tables, task lists, emoji, math), generating documentation from Markdown sources.
  DO NOT USE FOR: rich text editing UI (use a WYSIWYG editor), PDF generation from Markdown (convert to HTML first then use a PDF library), plain text formatting.
license: MIT
metadata:
  displayName: Markdig
  author: "Tyler-R-Kendrick"
  version: "1.0.0"
compatibility:
  - claude
  - copilot
  - cursor
---

# Markdig

## Overview

Markdig is a fast, powerful, and extensible Markdown processor for .NET. It is fully CommonMark compliant and supports numerous extensions including pipe tables, task lists, emoji, math notation, diagrams, and footnotes. Markdig parses Markdown into an abstract syntax tree (AST) that can be traversed, modified, or rendered to HTML or other output formats.

Markdig uses a pipeline architecture where extensions are added to a `MarkdownPipelineBuilder` before building a reusable pipeline instance. This design allows precise control over which Markdown features are enabled.

Install via NuGet:
```
dotnet add package Markdig
```

## Basic Markdown to HTML

Convert a Markdown string to HTML using the static `Markdown.ToHtml` method with default settings (CommonMark only).

```csharp
using Markdig;

// Basic CommonMark conversion
var markdown = @"
# Welcome

This is a **bold** and *italic* paragraph.

- Item one
- Item two
- Item three

[Visit GitHub](https://github.com)
";

var html = Markdown.ToHtml(markdown);
Console.WriteLine(html);
// <h1>Welcome</h1>
// <p>This is a <strong>bold</strong> and <em>italic</em> paragraph.</p>
// <ul><li>Item one</li>...
```

## Configuring the Pipeline with Extensions

Use `MarkdownPipelineBuilder` to enable specific extensions. Build the pipeline once and reuse it for all conversions.

```csharp
using Markdig;

// Build a pipeline with specific extensions
var pipeline = new MarkdownPipelineBuilder()
    .UsePipeTables()
    .UseTaskLists()
    .UseAutoLinks()
    .UseEmojiAndSmiley()
    .UseFootnotes()
    .UseDefinitionLists()
    .Build();

var markdown = @"
## Features

| Feature | Status |
|---------|--------|
| Tables  | :white_check_mark: |
| Tasks   | :white_check_mark: |

### TODO
- [x] Implement parser
- [ ] Add tests
- [ ] Write docs

Check out https://github.com for more.

Term
:   Definition of the term

This has a footnote[^1].

[^1]: Footnote content here.
";

var html = Markdown.ToHtml(markdown, pipeline);
```

## Advanced Extensions Pipeline

Enable all advanced extensions at once or pick specific ones for security-sensitive contexts.

```csharp
using Markdig;

// Enable all extensions (convenient but broad)
var fullPipeline = new MarkdownPipelineBuilder()
    .UseAdvancedExtensions()
    .Build();

// Curated set for user-generated content (safer)
var userContentPipeline = new MarkdownPipelineBuilder()
    .UsePipeTables()
    .UseAutoLinks()
    .UseTaskLists()
    .UseEmphasisExtras()
    .DisableHtml() // strip raw HTML from user input
    .Build();

// Pipeline with custom HTML attributes
var styledPipeline = new MarkdownPipelineBuilder()
    .UseGenericAttributes() // allows {.class #id} syntax
    .UseAutoIdentifiers()   // auto-generate heading IDs
    .Build();

var markdown = "## My Heading {.custom-class}\n\nParagraph text.";
var html = Markdown.ToHtml(markdown, styledPipeline);
// <h2 id="my-heading" class="custom-class">My Heading</h2>
```

## Parsing the Markdown AST

Parse Markdown into a document AST for analysis, transformation, or custom rendering.

```csharp
using Markdig;
using Markdig.Syntax;
using Markdig.Syntax.Inlines;

var pipeline = new MarkdownPipelineBuilder().Build();
var document = Markdown.Parse("# Title\n\nHello **world** with a [link](https://example.com).", pipeline);

// Walk the AST
foreach (var block in document)
{
    if (block is HeadingBlock heading)
    {
        Console.WriteLine($"Heading Level {heading.Level}: {heading.Inline?.FirstChild}");
    }
    else if (block is ParagraphBlock paragraph)
    {
        if (paragraph.Inline is null) continue;
        foreach (var inline in paragraph.Inline)
        {
            switch (inline)
            {
                case LiteralInline literal:
                    Console.WriteLine($"  Text: {literal.Content}");
                    break;
                case EmphasisInline emphasis:
                    Console.WriteLine($"  Emphasis (strong={emphasis.DelimiterCount >= 2})");
                    break;
                case LinkInline link:
                    Console.WriteLine($"  Link: {link.Url}");
                    break;
            }
        }
    }
}
```

## Extracting All Links from Markdown

A practical example of using the AST to collect all hyperlinks from a document.

```csharp
using System.Collections.Generic;
using Markdig;
using Markdig.Syntax;
using Markdig.Syntax.Inlines;

public static class MarkdownLinkExtractor
{
    public static IReadOnlyList<(string Url, string? Text)> ExtractLinks(string markdown)
    {
        var pipeline = new MarkdownPipelineBuilder().UseAutoLinks().Build();
        var document = Markdown.Parse(markdown, pipeline);
        var links = new List<(string, string?)>();

        foreach (var descendant in document.Descendants())
        {
            if (descendant is LinkInline link && link.Url is not null)
            {
                var text = link.FirstChild is LiteralInline literal
                    ? literal.Content.ToString()
                    : null;
                links.Add((link.Url, text));
            }
        }

        return links;
    }
}

// Usage
var links = MarkdownLinkExtractor.ExtractLinks(
    "Check [GitHub](https://github.com) and https://example.com for details.");
foreach (var (url, text) in links)
{
    Console.WriteLine($"URL: {url}, Text: {text ?? "(auto-linked)"}");
}
```

## Rendering Markdown to Plain Text

Convert Markdown to plain text by stripping all formatting, useful for search indexing or previews.

```csharp
using System.IO;
using Markdig;
using Markdig.Renderers;

public static class MarkdownPlainTextRenderer
{
    public static string ToPlainText(string markdown)
    {
        var pipeline = new MarkdownPipelineBuilder().Build();
        var document = Markdown.Parse(markdown, pipeline);

        using var writer = new StringWriter();
        var renderer = new HtmlRenderer(writer)
        {
            EnableHtmlForBlock = false,
            EnableHtmlForInline = false,
            EnableHtmlEscape = false
        };
        renderer.Render(document);
        writer.Flush();
        return writer.ToString().Trim();
    }
}

var plainText = MarkdownPlainTextRenderer.ToPlainText(
    "# Hello **World**\n\n- Item 1\n- Item 2");
// Output: "Hello World\nItem 1\nItem 2"
```

## Extension Comparison

| Extension | Method | Feature |
|-----------|--------|---------|
| Pipe Tables | `UsePipeTables()` | GitHub-style tables |
| Task Lists | `UseTaskLists()` | `- [x]` checkboxes |
| Auto Links | `UseAutoLinks()` | Plain URL detection |
| Emoji | `UseEmojiAndSmiley()` | `:emoji:` codes |
| Footnotes | `UseFootnotes()` | `[^1]` references |
| Math | `UseMathematics()` | `$inline$` and `$$block$$` |
| Diagrams | `UseDiagrams()` | Mermaid/nomnoml blocks |
| Disable HTML | `DisableHtml()` | Strip raw HTML |
| Auto IDs | `UseAutoIdentifiers()` | Heading anchor IDs |
| Generic Attributes | `UseGenericAttributes()` | `{.class #id}` syntax |

## Best Practices

1. **Build the `MarkdownPipeline` once and reuse it** across all conversions -- the builder pattern is designed for single-build, many-render usage.
2. **Use `DisableHtml()` for user-generated content** to prevent raw HTML injection; Markdig does not sanitize HTML by default.
3. **Enable only the extensions you need** rather than `UseAdvancedExtensions()` to reduce parsing overhead and limit the attack surface for user input.
4. **Use `UseAutoIdentifiers()` for documentation sites** so heading elements get `id` attributes that enable anchor linking and table-of-contents generation.
5. **Parse to AST with `Markdown.Parse()` when you need structured access** to document content (e.g., extracting links, headings, or code blocks) rather than regex on raw Markdown.
6. **Sanitize HTML output** with a library like HtmlSanitizer after Markdig rendering when processing untrusted Markdown that may contain script tags or event handlers.
7. **Cache rendered HTML** for static content that does not change between requests to avoid re-parsing and re-rendering on every page load.
8. **Use `HtmlRenderer` with `EnableHtmlForBlock = false`** to generate plain text output suitable for search indexing, email previews, or accessibility text.
9. **Prefer `UsePipeTables()` over custom table parsing** because Markdig's built-in table extension handles edge cases like alignment, escaping, and multi-line cells correctly.
10. **Test Markdown rendering with edge cases** including deeply nested lists, code blocks containing Markdown syntax, empty documents, and very long lines to verify consistent output.
