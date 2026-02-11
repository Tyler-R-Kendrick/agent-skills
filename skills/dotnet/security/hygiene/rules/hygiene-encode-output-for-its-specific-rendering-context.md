---
title: "Encode output for its specific rendering context"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: hygiene, dotnet, security, preventing-xss-attacks, sql-injection-prevention, htmlurljavascript-encoding
---

## Encode output for its specific rendering context

Encode output for its specific rendering context: use `HtmlEncoder` for HTML bodies, `UrlEncoder` for URLs, and `JavaScriptEncoder` for inline scripts; never use a single encoding function for all contexts.
