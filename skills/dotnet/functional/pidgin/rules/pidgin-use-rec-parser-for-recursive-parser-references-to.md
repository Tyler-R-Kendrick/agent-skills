---
title: "Use `Rec(() => parser)` for recursive parser references to..."
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: pidgin, dotnet, functional, c-parser-combinators, high-performance-text-parsing, expression-parsers
---

## Use `Rec(() => parser)` for recursive parser references to...

Use `Rec(() => parser)` for recursive parser references to break circular dependencies; do not reference a parser field directly in its own definition.
