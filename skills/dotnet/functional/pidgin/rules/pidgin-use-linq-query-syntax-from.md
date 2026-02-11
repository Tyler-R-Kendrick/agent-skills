---
title: "Use LINQ query syntax (`from"
impact: MEDIUM
impactDescription: "general best practice"
tags: pidgin, dotnet, functional, c-parser-combinators, high-performance-text-parsing, expression-parsers
---

## Use LINQ query syntax (`from

Use LINQ query syntax (`from ... in ... select`) for complex sequential parsers where multiple intermediate values are needed; use method chaining for simple transformations.
