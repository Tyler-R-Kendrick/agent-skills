---
title: "Set meaningful default values for new fields"
impact: MEDIUM
impactDescription: "general best practice"
tags: bond, dotnet, serialization, cross-platform-schema-first-serialization, compact-binary-and-fast-binary-wire-formats, schema-evolution-with-backwardforward-compatibility
---

## Set meaningful default values for new fields

Set meaningful default values for new fields: when evolving a schema, new fields with defaults allow old consumers to deserialize new data without errors.
