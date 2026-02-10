---
description: Guidance for Markdig Markdown processor.
metadata:
  displayName: Markdig
---

# Markdig

## Overview
Markdig is a fast, extensible Markdown processor for .NET compatible with CommonMark.

## Example
```csharp
using Markdig;

// Basic conversion
var markdown = "# Hello **World**!";
var html = Markdown.ToHtml(markdown);

// With extensions
var pipeline = new MarkdownPipelineBuilder()
    .UseAdvancedExtensions()
    .UsePipeTables()
    .UseEmojiAndSmiley()
    .Build();

var result = Markdown.ToHtml(markdown, pipeline);

// Custom extensions
var customPipeline = new MarkdownPipelineBuilder()
    .Use<MyCustomExtension>()
    .Build();
```

## Best Practices
- Use pipeline builder for extensions
- Sanitize HTML output
- Cache pipeline instances
- Enable only needed extensions
