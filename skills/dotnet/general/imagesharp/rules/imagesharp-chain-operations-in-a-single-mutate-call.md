---
title: "Chain operations in a single `Mutate` call"
impact: MEDIUM
impactDescription: "general best practice"
tags: imagesharp, dotnet, general, image-resizing, cropping, format-conversion
---

## Chain operations in a single `Mutate` call

Chain operations in a single `Mutate` call: rather than calling `Mutate` multiple times, because each call may trigger intermediate buffer allocations.
