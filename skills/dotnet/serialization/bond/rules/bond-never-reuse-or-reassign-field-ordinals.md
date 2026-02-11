---
title: "Never reuse or reassign field ordinals"
impact: CRITICAL
impactDescription: "essential for correctness or security"
tags: bond, dotnet, serialization, cross-platform-schema-first-serialization, compact-binary-and-fast-binary-wire-formats, schema-evolution-with-backwardforward-compatibility
---

## Never reuse or reassign field ordinals

Never reuse or reassign field ordinals: removing a field should retire its ordinal permanently; reusing it with a different type breaks backward compatibility.
