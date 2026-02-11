---
title: "Use `nullable<T>` for optional complex fields"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: bond, dotnet, serialization, cross-platform-schema-first-serialization, compact-binary-and-fast-binary-wire-formats, schema-evolution-with-backwardforward-compatibility
---

## Use `nullable<T>` for optional complex fields

Use `nullable<T>` for optional complex fields: this allows the field to be absent on the wire and avoids allocating empty objects during deserialization.
