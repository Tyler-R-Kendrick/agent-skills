---
title: "Use `attempt` sparingly and only when backtracking is..."
impact: MEDIUM
impactDescription: "general best practice"
tags: fparsec, dotnet, functional, f-parser-combinators, text-parsing, expression-parsers
---

## Use `attempt` sparingly and only when backtracking is...

Use `attempt` sparingly and only when backtracking is genuinely needed; excessive backtracking degrades performance and obscures error messages.
