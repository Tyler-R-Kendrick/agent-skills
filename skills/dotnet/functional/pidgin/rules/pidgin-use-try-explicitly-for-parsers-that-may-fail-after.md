---
title: "Use `Try()` explicitly for parsers that may fail after..."
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: pidgin, dotnet, functional, c-parser-combinators, high-performance-text-parsing, expression-parsers
---

## Use `Try()` explicitly for parsers that may fail after...

Use `Try()` explicitly for parsers that may fail after consuming input and need to backtrack; avoid wrapping everything in `Try` as it hides errors and reduces performance.
