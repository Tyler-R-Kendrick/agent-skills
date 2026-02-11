---
title: "Place F# files in dependency order within `"
impact: MEDIUM
impactDescription: "general best practice"
tags: fsharp, dotnet, functional, functional-first-net-programming, discriminated-unions-and-pattern-matching, computation-expressions
---

## Place F# files in dependency order within `

Place F# files in dependency order within `.fsproj` since F# compiles top-to-bottom; use `--warnon:3218` to catch forward reference issues.
