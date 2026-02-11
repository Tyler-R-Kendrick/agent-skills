---
title: "Wrap Bond serialization behind an interface"
impact: MEDIUM
impactDescription: "general best practice"
tags: bond, dotnet, serialization, cross-platform-schema-first-serialization, compact-binary-and-fast-binary-wire-formats, schema-evolution-with-backwardforward-compatibility
---

## Wrap Bond serialization behind an interface

Wrap Bond serialization behind an interface: inject `IBondSerializer` so you can swap protocols (Compact to Fast) or migrate to a different serialization library without changing business logic.
