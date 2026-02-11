---
title: "Use `DisableHtml()` for user-generated content"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: mardig, dotnet, general, converting-markdown-to-html, building-custom-markdown-pipelines, parsing-markdown-ast
---

## Use `DisableHtml()` for user-generated content

Use `DisableHtml()` for user-generated content: to prevent raw HTML injection; Markdig does not sanitize HTML by default.
