---
title: "Use transcoding for protocol conversion"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: bond, dotnet, serialization, cross-platform-schema-first-serialization, compact-binary-and-fast-binary-wire-formats, schema-evolution-with-backwardforward-compatibility
---

## Use transcoding for protocol conversion

Use transcoding for protocol conversion: when bridging systems that use different Bond protocols, use `Transcode` instead of deserialize-then-reserialize to avoid unnecessary object allocation.
