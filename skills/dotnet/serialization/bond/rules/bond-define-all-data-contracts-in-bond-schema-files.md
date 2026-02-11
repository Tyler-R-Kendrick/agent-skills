---
title: "Define all data contracts in `.bond` schema files"
impact: MEDIUM
impactDescription: "general best practice"
tags: bond, dotnet, serialization, cross-platform-schema-first-serialization, compact-binary-and-fast-binary-wire-formats, schema-evolution-with-backwardforward-compatibility
---

## Define all data contracts in `.bond` schema files

Define all data contracts in `.bond` schema files: use the Bond code generator (`gbc`) to produce C# classes rather than hand-coding `[Bond.Schema]` attributes, ensuring schema consistency across languages.
