---
title: "Assign explicit field ordinals starting from 0"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: bond, dotnet, serialization, cross-platform-schema-first-serialization, compact-binary-and-fast-binary-wire-formats, schema-evolution-with-backwardforward-compatibility
---

## Assign explicit field ordinals starting from 0

Assign explicit field ordinals starting from 0: every field must have a unique, stable ordinal number that never changes once published; use gaps (0, 1, 5, 10) to reserve space for future fields.
