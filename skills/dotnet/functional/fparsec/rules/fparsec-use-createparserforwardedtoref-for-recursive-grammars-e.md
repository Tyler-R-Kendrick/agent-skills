---
title: "Use `createParserForwardedToRef` for recursive grammars (e"
impact: MEDIUM
impactDescription: "general best practice"
tags: fparsec, dotnet, functional, f-parser-combinators, text-parsing, expression-parsers
---

## Use `createParserForwardedToRef` for recursive grammars (e

Use `createParserForwardedToRef` for recursive grammars (e.g., expressions, JSON) to break circular references between parser definitions.
