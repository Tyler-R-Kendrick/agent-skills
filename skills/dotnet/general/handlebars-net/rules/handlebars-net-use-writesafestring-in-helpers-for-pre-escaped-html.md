---
title: "Use `WriteSafeString` in helpers for pre-escaped HTML"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: handlebars-net, dotnet, general, logic-less-html-templating, email-template-rendering, code-generation-templates
---

## Use `WriteSafeString` in helpers for pre-escaped HTML

Use `WriteSafeString` in helpers for pre-escaped HTML: to avoid double-encoding; use `Write` for values that should be HTML-escaped.
