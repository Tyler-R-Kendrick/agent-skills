---
title: "Prefer `StringSegment` over `string"
impact: HIGH
impactDescription: "significant quality or reliability improvement"
tags: extensions-primitives, dotnet, configuration, reacting-to-configuration-or-file-changes-with-ichangetoken, building-custom-change-notification-providers, efficient-string-segmentation-with-stringsegment-and-stringtokenizer
---

## Prefer `StringSegment` over `string

Prefer `StringSegment` over `string.Substring` in hot paths like header parsing or URL routing where avoiding heap allocations improves throughput.
